import { END, eventChannel } from 'redux-saga';
import RTCMultiConnection from 'rtcmulticonnection';
import 'webrtc-adapter';

function createWebSocketChanel({
    socketUrl,
    servers,
    password,
    serialNumber,
    socketMessageEvent,
}) {
    return eventChannel((emitter) => {
        const connection = new RTCMultiConnection();

        connection.socketURL = socketUrl;

        connection.socketMessageEvent = socketMessageEvent;

        connection.enableLogs = process.env.NODE_ENV !== 'production';

        connection.session = {
            audio: false,
            video: true,
            data: false,
            screen: false,
            oneway: true,
            broadcast: false,
        };

        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: false,
        };

        connection.iceServers = [];

        servers.forEach((server) => {
            connection.iceServers.push(server);
        });

        connection.password = password;

        const closeConnection = () => {
            connection.closeSocket();
            connection.onstream = null;
            connection.onstreamended = null;
            connection.onMediaError = null;
            connection.error = null;
        };

        const onStream = ({ stream }) => {
            emitter({ stream, connection });
        };

        const onStreamEnded = () => {
            closeConnection();
            emitter({ streamEnded: true });
            emitter(END);
        };

        const onError = () => {
            closeConnection();
            emitter({ error: 'StreamError' });
            emitter(END);
        };

        connection.onstream = onStream;
        connection.onstreamended = onStreamEnded;
        connection.onMediaError = onError;
        connection.error = onError;

        let isNoAttempts = false;

        setTimeout(() => {
            isNoAttempts = true;
        }, 12000);

        const joinRoomIfExists = () => {
            connection.checkPresence(serialNumber, (isRoomExist, roomId) => {
                if (isRoomExist === true) {
                    connection.join(roomId);
                    return;
                }

                if (isNoAttempts) {
                    closeConnection();
                    emitter({ error: 'noRoom' });
                    emitter(END);
                    return;
                }

                setTimeout(joinRoomIfExists, 3000);
            });
        };

        joinRoomIfExists();

        return () => {};
    });
}

export default createWebSocketChanel;
