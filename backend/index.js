const express=require('express');
const bodyParser=require('body-parser')
const dbConnect = require('./src/config/db');
const agentRouter = require('./src/routers/agent.routes');
const ticketRouter = require('./src/routers/ticket.routes');


const port=3000;


const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use(agentRouter)
app.use(ticketRouter)

app.listen(port,async ()=>{
   await  dbConnect()
    console.log('server started');
})