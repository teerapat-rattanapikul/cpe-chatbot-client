const { WebhookClient } = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
const serviceAccount = require('./cpe-chatbot-d4ebc-firebase-adminsdk-vz8fi-130fb09f43.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cpe-chatbot-d4ebc.firebaseio.com"
})

const db = admin.firestore();


const webhookDialogflow = async (request, response) => {
    const agent = new WebhookClient({ request, response });

    const queryResult = request.body.queryResult;

    async function getSongRequest(agent) {

        try {
            const song = await db.doc(`/song/${queryResult.parameters.song}`).get();
            agent.add(song.data().verse);
        } catch (error) {
            console.error(error);
            agent.add('ฉันไม่รู้จักเพลงนั้น');
        }
    
    }

    let intentMap = new Map();
    intentMap.set('CpeBot.songRequest', getSongRequest);
    
    agent.handleRequest(intentMap);
}

module.exports = webhookDialogflow;