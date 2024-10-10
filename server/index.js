const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routes/index')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use('/', router)
app.use(notFound)
app.use(errorHandler);

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })