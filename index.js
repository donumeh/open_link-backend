const express = require('express');
const app = express();

// middlerware imports
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Mongo DB
const mongoose = require('mongoose');
// CORS
const cors = require('cors');
require('dotenv/config');

const jwt = require('./helpers/jwt');

const errorHandler = require('./helpers/error-handler')

app.use(cors());
app.options('*', cors());


// middleware
app.use(bodyParser.json()); // req parser middleware
app.use(morgan('tiny'));
app.use(jwt()); // logger middleware
app.use(errorHandler)




// Routers
const productsRouter = require('./routes/product');
const usersRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const brandRouter = require('./routes/brand')



const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/brand`, brandRouter);


const Product = require("./models/product");


mongoose.connect(process.env.CONNECTION_STRING,
	{
		dbName: "open_link",
	}
)
	.then(() => {
		console.log("Database Connection is ready")
	})
	.catch((err) => {
		console.log(err)
	})



app.listen(3005, () => {
	console.log('server is running on localhost:3005');
})
