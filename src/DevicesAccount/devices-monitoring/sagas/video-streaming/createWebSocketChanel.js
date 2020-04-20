import { END, eventChannel } from 'redux-saga';
import RTCMultiConnection from 'rtcmulticonnection';

function createWebSocketChanel({
    socketUrl,
    iceServers,
    password,
    roomId,
}) {
    return eventChannel((emitter) => {
        const connection = new RTCMultiConnection();

        connection.socketURL = socketUrl;
        connection.socketMessageEvent = 'video-broadcast';

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
        iceServers.forEach((server) => {
            connection.iceServers.push(server);
        });

        connection.password = password;

        const onStream = ({ stream }) => {
            emitter({
                stream,
                isEnded: false,
            });
            // emitter(END);
        };

        const onStreamEnded = () => {
            emitter({ isEnded: true });
            emitter(END);
        };

        const onMediaError = () => {
            alert('error');
            connection.join(connection.sessionid);
        };

        connection.onstream = onStream;
        connection.onstreamended = onStreamEnded;
        connection.onMediaError = onMediaError;

        connection.join(roomId);

        return () => {

        };
    });
}

export default createWebSocketChanel;
