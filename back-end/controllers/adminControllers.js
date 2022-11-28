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
const admin_jwt = require('jsonwebtoken');
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
