
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const app = express();
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFLowSessionID);

router.post('/', urlencodedParser, (req, res) => {
    const input = req.body.text; 
    res.send("Welcome bruh, take a look around and you will see!");
    console.log(input);
}); 


router.post('/api_dftext', urlencodedParser,async (req, res) => {
   // const responseHandler = response => response;
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

    try {

        console.log("**[RESPONSE FROM CLIENT]**\n", request);
        let responses = await sessionClient.detectIntent(request); 
        res.send(responses[0].queryResult);
        return responses; 
    } catch (error) {

        console.log('****[API DF TEXT ERROR]****\n',error);
    }

}); //end text

router.post('/api_dfevent', urlencodedParser,async (req, res) => {
   

    let events = 'welcome'; 

     let request = {
 
         session: sessionPath,
         queryInput: {
             event: {
                 // The query to send to the dialogflow agent
                 name: events,
                 
                 // The language used by the client (en-US)
                 languageCode: config.dialogFLowSessionLanguageCode,
             },
         },
     };

     try {

        console.log("**[RESPONSE FROM CLIENT]**\n", request);
        let responses = await sessionClient.detectIntent(request); 
        res.send(responses[0].queryResult);
        return responses; 
     } catch (error) {

        console.log('****[API DF EVENT ERROR]****\n',error);
     }
    
     
 });//end event 

module.exports = router; 