
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFLowSessionID);


const bodyParser = require('body-parser');
//app.use(bodyParser.json());

const textQueryHandler = async () => {
 
     
    const request = {
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

    let responses = await sessionClient.detectIntent(request);
    responses = await self.handleAction(responses);
    //let result = responses[0].queryResult;
    res.send(result);
    console.log("************[RESPONSE FROM CLIENT]************\n", result);
    return result;
}


//     textQuery: async function (text, parameters = {}) {

    //     const request = {
    //         session: sessionPath,
    //         queryInput: {
    //             text: {
    //                 // The query to send to the dialogflow agent
    //                 text: req.body.text,
    //                 // The language used by the client (en-US)
    //                 languageCode: config.dialogFLowSessionLanguageCode,
    //             },
    //         },
    //     };

    //     let responses = await sessionClient.detectIntent(request);
    //     responses = await self.handleAction(responses);
    //     //let result = responses[0].queryResult;
    //     res.send(result);
    //     console.log("************[RESPONSE FROM CLIENT]************\n", result);
    //     return result;
    // } 

// module.exports = textQueryHandler; 