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

        const closeConnection = () => {
            connection.closeSocket();
            connection.onstream = null;
            connection.onstreamended = null;
            connection.onMediaError = null;
            connection.error = null;
        };

        const onStream = ({ stream }) => {
            emitter({ stream });
            emitter(END);
        };

        const onStreamEnded = () => {
            alert('Трансляция прекращена');
        };

        const onError = () => {
            closeConnection();
            emitter({ error: true });
            emitter(END);
        };

        connection.onstream = onStream;
        connection.onstreamended = onStreamEnded;
        connection.onMediaError = onError;
        connection.error = onError;

        connection.join(serialNumber);

        return () => {
            //
        };
    });
}

export default createWebSocketChanel;
