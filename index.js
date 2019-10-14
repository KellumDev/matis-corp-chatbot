
/*
run enviorment variables before running server 
 
1. $env:GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
 

2. $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"

3.With command prompt:
set GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"
*/
const express = require('express');
const app = express();


const dialogflow = require('dialogflow');
const config = require('./config/keys');
 
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const sessionClient = new dialogflow.SessionsClient();

//$env:GOOGLE_APPLICATION_CREDENTIALS ="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFLowSessionID);

app.post('/api/df_text', async (req, res) => {
   
        // The text query request.

        let request = {

            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFLowSessionLanguageCode,
                },
            },
        };
        console.log("**[RESPONSE FROM CLIENT]**\n", request);
        let responses = await sessionClient
            .detectIntent(request);

        res.send(responses[0].queryResult);
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log("[BACKEND RUNNING ON "+ PORT +"]");