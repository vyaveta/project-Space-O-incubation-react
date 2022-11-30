"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Admin = require('../model/adminModel');
const Clients = require('../model/clientModel');
const Rockets = require('../model/rocketModel');
// const {Request, Response} = require('express')
const admin_jwt = require('jsonwebtoken');
const Applications = require('../model/applicationModel');
require('dotenv').config();
module.exports.adminRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminName, adminAuthCode, adminAccessCode } = req.body;
        const doesAccountExists = yield Admin.findOne({ adminName });
        if (doesAccountExists)
            return res.json({ status: false, msg: 'Account already exists' });
        const admin = yield Admin.create({ adminName, adminAuthCode, adminAccessCode });
        const adminToken = admin_jwt.sign({ admin }, process.env.ADMIN_TOKEN_TOP_SECRET, { expiresIn: '365d' });
        res.cookie('adminToken', adminToken, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 1200209
        });
        return res.json({ status: true, msg: 'Successfully created admin account' });
    }
    catch (er) {
        console.log(er, 'is the error that occured in the admin controllers');
        return res.json({ status: false, msg: 'Something went wrong' });
    }
});
module.exports.adminAuthentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminName, adminAuthCode } = req.body;
        const admin = yield Admin.findOne({ adminName });
        if (!admin)
            return res.json({ status: false, msg: 'No account with that adminName' });
        if (admin.incorrectAuthCount > 3)
            return res.json({ status: false, msg: 'This account is in Quarantine list' });
        if (admin.adminAuthCode !== adminAuthCode) {
            admin.incorrectAuthCount++;
            yield admin.save();
            return res.json({ status: false, msg: `you have entered incorrect authCode ${admin.incorrectAuthCount} times. Only 4 chanse is available!` });
        }
        admin.incorrectAuthCount = 0;
        admin.save();
        const adminToken = yield admin_jwt.sign({ admin }, process.env.ADMIN_TOKEN_TOP_SECRET, { expiresIn: '365d' });
        res.cookie('adminToken', adminToken, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 1200209
        });
        return res.json({ status: true, msg: 'Logging in to your admin Account!' });
    }
    catch (err) {
        console.log(err, 'is the error that occured in the adminAuthentication function in the adminControllers');
        return res.json({ status: false, msg: 'Something went wrong!' });
    }
});
module.exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield Clients.find({});
        return res.json({ status: true, clients });
    }
    catch (err) {
        console.log(err, 'is the error that occured in the getAllUsers function in the adminControllers');
        return res.json({ status: false, msg: 'Something went wrong' });
    }
});
module.exports.blockClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const client = yield Clients.findById({ _id });
        if (client) {
            client.isBanned = !client.isBanned;
            client.save();
            let msg;
            if (client.isBanned === true)
                msg = `Blocked ${client.clientname}`;
            else
                msg = `unblocked ${client.clientname}`;
            return res.json({ status: true, msg });
        }
        return res.json({ status: false, msg: 'No users find' });
    }
    catch (err) {
        console.log(err, 'is the error that occured in the blockClient function in the adminControllers');
        return res.json({ status: false, msg: 'Something went wrong!' });
    }
});
module.exports.getApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield Applications.find({});
        return res.json({ status: true, applications });
    }
    catch (err) {
        console.log(err, 'is the error that occure in the getApplications function in the admin controllers');
        return res.josn({ status: false, msg: 'something went wrong!' });
    }
});
module.exports.changeApplicationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, status } = req.body;
        const application = yield Applications.findById({ _id });
        console.log(application, 'is the application');
        if (!application)
            return res.json({ status: false, msg: 'No application found' });
        if (status === 'approve')
            application.isApproved = true;
        else
            application.isDeclined = true;
        application.save();
        return res.json({ status: true, msg: 'Done' });
    }
    catch (err) {
        console.log(err, 'is the error that occured in the changeApplicationStatus function in the adminControllers');
        return res.json({ status: false, msg: 'Something went wrong' });
    }
});
module.exports.getRocketDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rocketDetails = yield Rockets.find({});
        if (!rocketDetails)
            return res.json({ status: false, msg: 'Oops the rocket got stolen!' });
        return res.json({ status: true, msg: 'We got it', rocketDetails: rocketDetails[0] });
    }
    catch (e) {
        console.log(e, 'is the error that occured in the getRocketDetails function in the admin controllers');
        return res.json({ status: false, msg: 'Something went wrong' });
    }
});
