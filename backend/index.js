const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const transactionRoute = require('./routes/transactionRoutes');
const tagsRoute = require('./routes/tagsRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { notFound } = require('./middlewares/notFound');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/api/transaction', transactionRoute);
app.use('/api/tags', tagsRoute);

//not found route
// app.use('*', notFound);

//error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

