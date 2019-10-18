# myWizard chatbot UI.


Current this application has the backend and frontend servers setup to run together via **concurrently npm package**. The client side has a proxy installed to handle CORS mechanism. All traffic from client side to backend will be trasmitted with out interuption from browser security. 

##   NOTE:
        *the React files are inside the root directory labeled as **rn-mywizard**
        *the root package.json is the script that configures the entire application to run concurrently.
        *inside the client directory is a proxy middleware to bypass CORS Mechanism
    
##   TO RUN APPLICATION:
        //will run both frontend and backend simultaneously 
        execute "yarn run dev"
        //will run node.js server seperately
        execute "yarn run backend"
        //will run react.js server seperately
         execute "yarn run frontend"

        //stop server 
        contr + c
        //restart server
        type: rs then press enter

##     ************************************************** [KEITH INSTRUCTIONS] ************************************************** 
###     1. run cli session env vars: 

####    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\keith.n.boggs.DIR\OneDrive - Accenture\hey_myWizard\private_key.json"
####    set GOOGLE_APPLICATION_CREDENTIALS="C:\Users\keith.n.boggs.DIR\OneDrive - Accenture\hey_myWizard\private_key.json"

###     2. run the backend and frontend servers 
####    yarn run dev

