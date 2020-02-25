const dialogflow = require('dialogflow').v2;

const projectId = process.env.dialogflow_project_id; //https://dialogflow.com/docs/agents#settings
const languageCode = 'th';

const config = {
    credentials: {
        private_key: process.env.dialogflow_private_key,
        client_email: process.env.dialogflow_client_email,
    },
};


const sessionClient = new dialogflow.SessionsClient(config);


const processMessage = async (message, sessionId) => {

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return result;
}

module.exports = processMessage;