express=require('express');
const app=express();
const connectToMongo=require('./db');
connectToMongo();   //connect to database       
app.get('/',(req,res)=>{
    res.send("Hello world");
}
);
const port=5000;
app.listen(port,()=>console.log(`Server is running on port ${port}`
));
