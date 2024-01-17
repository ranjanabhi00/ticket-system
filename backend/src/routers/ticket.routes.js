const express=require('express');
const { ticketModel } = require('../models/ticket.model');
const { agentModel } = require('../models/agent.model');

const ticketRouter=express.Router();

ticketRouter.post('/api/support-tickets',async (req,res)=>{

    const agent=await agentModel.find({email:'abc@gmail.com'})

    const ticket=ticketModel({...req.body,assignedTo:agent._id});
     await ticket.save()
     res.json({data:ticket})
     
})

ticketRouter.get('/api/support-tickets',async (req,res)=>{

    const ticket=await ticketModel.find().populate('assignedTo')
     
     res.json({data:ticket})
     
})


module.exports=ticketRouter