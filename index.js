import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import dotenv from "dotenv"

import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

// data imports 
import User from "./models/User.js"
import Product from "./models/Product.js"
import ProductStat from "./models/ProductStats.js"
import Transaction from "./models/Transaction.js"
import OverallStat from "./models/OverallStat.js"
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat} from "./data/index.js" // all the variable name taken from the data folder index.js

// Configuration usage
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());  // the helmet is used to protect the expressJs platform from outer threats
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));  // block others from using your resource into their  Personal account
app.use(morgan("common"));   // Access all information from https request and response ans simplifies the process
app.use(bodyParser.json());  // Process the data send from HTTP request body
app.use(bodyParser.urlencoded({extended: false})); // Return only Content-Type header match the option of HTTP sended request

app.use(cors());

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales",salesRoutes);

// const mongoose = require('mongoose');
// const PORT = process.env.PORT || 9000
// const db = 'mongodb+srv://mishran2003:42911932x4@admin-page.8fujzpj.mongodb.net/?retryWrites=true&w=majority'
// mongoose
//     .connect(db, { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//     .then(PORT,() => console.log(`Server Port: ${PORT}`))
//     .catch(error => console.log(`${error} did not connect`));


// Mongoose Connection
const PORT = process.env.PORT || 9000;  // first check the PORT connection is proprer or not if yes then call process.env.PORT or else call it on 9000 as a backup if process.env.PORT didn't connect
mongoose  // using the mongoose keyword we can start using the mongoose and then we have to use connect function which have a parameter process.env.MONGO_URL and pass a string parameter which will select the connect point function which will be true
    .connect(process.env.MONGO_URL, { 
        useNewUrlParser: true,  // allow user to fall back to data to check any bug occured in database 
        useUnifiedTopology: true 
    }) .then(() => { // after that we have to use then function to run the connection on terminal or take output by listening it on their developed port
        app.listen(PORT, ()=>console.log(`Server Port: ${PORT}`))

        // It will add the data one time only so that we don't have any duplicate of data in database
        // User.insertMany(dataUser)
        // Product.insertMany(dataProduct)
        // ProductStat.insertMany(dataProductStat)
        // Transaction.insertMany(dataTransaction)
        // OverallStat.insertMany(dataOverallStat)
    }) .catch((error)=>console.log(`${error} did not connect`)) // after that we have to check the error wheater the database has catched an error or not if it has error it show error then .catch() function is used otherwise .then() will run


