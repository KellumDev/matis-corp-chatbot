
/*
run enviorment variables before running server 
 
1. $env:GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
 

2. $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"

3.With command prompt:
set GOOGLE_APPLICATION_CREDENTIALS="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"
*/
const express = require('express');
const app = express();


//const dialogflow = require('dialogflow');
 
const chatbot = require('./chatbot/chatbot');
const bodyParser = require('body-parser');
const dfApi = require('./routes/RoutesDialogFlow');
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,POST");
        return res.status(200).json({});
    }
    next();
});


app.use('/', dfApi); 

//const sessionClient = new dialogflow.SessionsClient();

//$env:GOOGLE_APPLICATION_CREDENTIALS ="C:\Users\austin.kellum\Documents\matis-corp-chatbot\Developmens\config\keys-file.json"

//const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFLowSessionID);
 
const PORT = process.env.PORT || 5150;
app.listen(PORT);

console.log("[BACKEND RUNNING ON " + PORT + "]");