const express = require("express");
const mainRouter=require("./routes/index")
const bodyparser=require("body-parser")
const userRouter=require("./routes/user")
const cors=require("cors")
const app=express();

app.use(bodyparser.json())
app.use(cors());
app.use("api/v1",mainRouter());
