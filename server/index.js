const express = require("express");
const app = express();
const db = require('./db/db');
const employeeRoute = require('./routes/employeeRoute')
const departmentRoute = require("./routes/departmentRoute")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv= require('dotenv').config()


app.use(cors()); 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://pgguide.netlify.app', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(express.json());
app.use(cookieParser());

app.use("/employee",employeeRoute)
app.use('/department',departmentRoute)

app.listen(process.env.PORT||5000, () => {
    console.log(`Server launched successfully on ${process.env.PORT||5000}`);
});
