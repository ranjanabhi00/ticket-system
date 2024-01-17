const express=require('express');
const { agentModel } = require('../models/agent.model');

const agentRouter=express.Router();

agentRouter.post('/api/support-agents',async (req,res)=>{
     console.log(req);
     const {Name,Email,Phone,Description}=req.body;
    try{
     const emailExist=await agentModel.findOne({email:Email})

    if(emailExist){
       res.status(403).json({
        error:'Agent with email already exists'
       })
       return;
    }
    const agent={
        name:Name,
        email:Email,
        description:Description,
        phone:Phone,
      }

     const agentSaved = agentModel(agent)
     console.log(agentSaved);
     await agentSaved.save()

     res.status(200).json({
        data:agentSaved
     })
   }
   catch(err){
    console.log(err);
   }

})

module.exports=agentRouter