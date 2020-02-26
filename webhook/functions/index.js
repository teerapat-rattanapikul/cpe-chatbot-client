const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { WebhookClient } = require('dialogflow-fulfillment');

admin.initializeApp();

const db = admin.firestore();

exports.dialogflowFirebaseFulfillment = functions.region('asia-east2')
    .https.onRequest((request, response) => {
        const agent = new WebhookClient({ request, response });

        const queryResult = request.body.queryResult;

        async function getSongRequest(agent) {
            try {
                const song = await db.doc(`/song/${queryResult.parameters.song}`).get();
                agent.add(song.data().verse);
            } catch (error) {
                console.log(error)
                agent.add('ฉันไม่รู้จักเพลงนั้น');
            }
        }

        let intentMap = new Map();
        intentMap.set('CpeBot.songRequest', getSongRequest);

        agent.handleRequest(intentMap);
    });