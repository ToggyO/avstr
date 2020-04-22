import { END, eventChannel } from 'redux-saga';
import RTCMultiConnection from 'rtcmulticonnection';

function createWebSocketChanel({
    socketUrl,
    servers,
    password,
    serialNumber,
}) {
    return eventChannel((emitter) => {
        const connection = new RTCMultiConnection();

        connection.socketURL = socketUrl;
        connection.socketMessageEvent = 'video-broadcast-demo';

        connection.session = {
            audio: true,
            video: true,
            oneway: true,
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

        const onStream = ({ stream }) => {
            emitter({
                stream,
                isEnded: false,
            });
            emitter(END);
        };

        const reConnect = () => {
            connection.closeSocket();
            emitter({ isReconnectNeeded: true });
            emitter(END);
        };

        const closeConnection = () => {
            connection.closeSocket();
            connection.onstream = null;
            connection.onstreamended = null;
            connection.onMediaError = null;
            connection.error = null;
        };

        const onStreamEnded = (e) => {
            alert('stream ended', e);
            closeConnection();
        };

        connection.onstream = onStream;
        connection.onstreamended = onStreamEnded;
        connection.onMediaError = reConnect;
        connection.error = reConnect;

        connection.join(serialNumber);

        return () => {
            //
        };
    });
}

export default createWebSocketChanel;
