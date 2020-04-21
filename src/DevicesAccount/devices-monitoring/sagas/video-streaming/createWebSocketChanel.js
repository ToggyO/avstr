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

        const onStreamEnded = () => {
            emitter({ isEnded: true });
            emitter(END);
        };

        const reConnect = () => {
            connection.join(connection.sessionid);
        };

        connection.onstream = onStream;
        connection.onstreamended = onStreamEnded;
        connection.onMediaError = reConnect;
        connection.error = reConnect;

        connection.join(serialNumber);

        return () => {
            connection.onstream = null;
            connection.onstreamended = null;
            connection.onMediaError = null;
            connection.error = null;
        };
    });
}

export default createWebSocketChanel;
