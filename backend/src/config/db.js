const mongoose=require('mongoose')
const url='mongodb+srv://r:123@cluster0.zwvwxqq.mongodb.net/ticket-system';

const dbConnect=async ()=>{
   await  mongoose.connect(url)
}


module.exports=dbConnect;