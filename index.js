const express = require('express');
const app = express();
  
app.get('/', (req, res) => {
    res.send({"Hello" : "Worlds"})
}); 

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log("[BACKEND RUNNING ON "+ PORT +"]");