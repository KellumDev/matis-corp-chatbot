//SETUP PROXY MIDDLEWARE TO BYPASS CORS MECHANISM 

import proxy from 'http-proxy-middleware';
 
export default bigToeProxy = (app) => {
    app.use(proxy('/api',{target: 'http://localhost:5000'})); 
}; 