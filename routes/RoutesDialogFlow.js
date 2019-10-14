/*
run enviorment variables before running server 
 
1. $env:GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
 

2. $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"

3.With command prompt:
set GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"
*/


module.exports = () => {


    const dialogflow = require('dialogflow');
    const config = require('../config/keys');
    const express = require('express');

    const bodyParser = require('body-parser');

    const app = express();
    app.use(bodyParser.json());

    const sessionClient = new dialogflow.SessionsClient();

    //$env:GOOGLE_APPLICATION_CREDENTIALS ="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"

    const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFLowSessionID);

    app.post('/', (req, res) => {

        res.send("data added!");
    });
    // app.post('/api_test', (req, res) => {
    //     let data = req.body;
    //     console.log(data.name);
    //     res.send("data added!");
    // });


    app.post('/api_test', async (req, res) => {

        // The text query request.

        let request = {

            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };
        console.log("**[RESPONSE FROM CLIENT]**\n", request);
        let responses = await sessionClient
            .detectIntent(request);

        res.send(responses[0].queryResult);

        //   Send request and log result 
        // sessionClient
        //     .detectIntent(request)
        //     .then(response => {
        //         console.log('Detected intent');
        //         const result = responses[0].queryResult;
        //         console.log(`  Query: ${result.queryText}`);
        //         console.log(`  Response: ${result.fulfillmentText}`);
        //         if (result.intent) {
        //             console.log(`  Intent: ${result.intent.displayName}`);
        //         } else {
        //             console.log(`  No intent matched.`);
        //         }
        //     })
        //     .catch(err => {
        //         console.error('[***SESSION CLIENT REQUEST TEXT ERROR***]\n', err)
        //     })
    });

    app.get('/df_api/event', (req, res) => {
        res.send({ "BABYMANTIS": "The DialogFlow EVENT Endpoint" })
    });
}