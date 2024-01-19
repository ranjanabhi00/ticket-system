import React, { useState } from 'react'
import styles from '../css/agent.module.css'

const initAgentState={
    name:'',
    email:'',
    phone:'',
    description:''
}

const Agent = () => {
    const [agentDetails,setAgentDetails]=useState(initAgentState);

    const api='https://ticket-assign-system.onrender.com/api/support-agents'

   const handleChange=(e)=>{
      const {name,value}=e.target;
      setAgentDetails({...agentDetails,[name]:value})
   }

   const validateEmail=(email)=>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email)
   }
   
   const validatePhone=(phone)=>{
    const phonePattern=/^\d{10}$/;
    return phonePattern.test(phone)
   }

   const handleClick=async()=>{
    if(agentDetails.name.length<1){
        alert('User name can not be empty')
        return;
    }
    if(!validateEmail(agentDetails.email)){
        alert('Enter a valid email')
        return
    }
    if(!validatePhone(agentDetails.phone)){
        alert('Phone is not proper value')
        return;
    }
    try{
     let res=await fetch(api,{
        method:'POST',
        body:JSON.stringify(agentDetails),
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
          },
     })
     if(res.status==200){
        alert('Agent Created Successfully')
        return;
     }
     else{
        alert(await res.json().message)
     }
    }
    catch(err){
        alert('Something went wrong')
    }

   }
  return (
    <div className={styles.form}>
      <input type='text' placeholder='name' name='name' value={agentDetails.name} onChange={handleChange}/>  
      <input type='text' placeholder='email' name='email' value={agentDetails.email} onChange={handleChange}/>  
      <input type='text' placeholder='phone' name='phone' value={agentDetails.phone} onChange={handleChange}/>  
      <textarea  rows="10" cols="70" name='description' placeholder='description' value={agentDetails.description} onChange={handleChange}/>
      <button onClick={handleClick}>Create Agent</button>
    </div>
  )
}

export default Agent