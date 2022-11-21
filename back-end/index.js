"use strict";
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes.ts');
const adminRoutes = require('./routes/adminRoute.ts');
const app = express();
require('dotenv').config();
app.use(cors({ origin: true }));
app.use(express.json());
app.use('/client', clientRoutes);
app.use('/admin', adminRoutes);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('**********************************************************************');
    console.log('**********************db connection successfull!**********************');
    console.log('**********************************************************************');
}).catch(() => {
    console.log('**********************************************************************');
    console.log('db connection failed due to ');
});
app.listen(process.env.PORT, () => {
    console.log('**********************************************************************');
    console.log(`The back-end is listening on port ${process.env.PORT}`);
    console.log('**********************************************************************');
});
