const express = require("express");
const mainRouter=require("./routes/index")
const bodyparser=require("body-parser")
const cors=require("cors")
const app=express();
app.use(express.json())

app.use(bodyparser.json())
app.use(cors());
app.use("api/v1",mainRouter());

app.listen(3000,()=>{
    console.log("The server is running on the port 3000")
})