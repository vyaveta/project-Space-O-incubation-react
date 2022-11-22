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
const bcrypt = require('bcrypt');
const Client = require('../model/clientModel');
module.exports.clientRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.pwd) {
            const { user, pwd, email } = req.body;
            console.log(user, pwd, email);
            const emailCheck = yield Client.findOne({ email });
            if (emailCheck)
                return res.json({ msg: 'Account already exists', staus: false });
            const hashedPassword = yield bcrypt.hash(pwd, 10);
            const client = yield Client.create({ clientname: user, email, password: hashedPassword });
            delete client.password;
            return res.json({ status: true, client, msg: 'Accont Created!' });
        }
        else {
            const { user, isGoogleAccount, email } = req.body;
            console.log(req.body, 'is the req body');
            const emailCheck = yield Client.findOne({ email });
            if (!emailCheck) {
                const client = yield Client.create({ clientname: user, email, googleAccount: isGoogleAccount });
                res.json({ status: true, client, msg: 'Logging in with your google account!' });
            }
            else {
                const client = { clientname: user, email, googleAccount: isGoogleAccount };
                res.json({ status: true, client, msg: 'Logging in with your google account!' });
            }
        }
    }
    catch (err) {
        console.log(err, 'is the error that occured in the clientRegister function in the clientControllers');
        return res.json({ status: false, msg: 'Something went wrong' });
    }
});
module.exports.clientAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.isGoogleAccount) {
            const { email, isGoogleAccount, user } = req.body;
            const client = yield Client.findOne({ email });
            if (!client) {
                const client = yield Client.create({ clientname: user, email, googleAccount: isGoogleAccount });
                res.json({ status: true, client, msg: 'Logging in with your google account!' });
            }
            else
                return res.json({ status: true, msg: 'Logging in with your google account!', client });
        }
        else {
            const { email, password } = req.body;
            const client = yield Client.findOne({ email });
            if (!client)
                return res.json({ status: false, msg: 'No account with entered email, Try sign in with google.' });
            const isPasswordValid = yield bcrypt.compare(password, client.password);
            if (!isPasswordValid)
                return res.json({ status: false, msg: 'Password Authenticatin failed!' });
            delete client.password;
            return res.json({ status: true, msg: 'Login Success!', client });
        }
    }
    catch (ex) {
        console.log(ex, 'is the error that occured in the clientAuthentication function in the clientControllers.ts');
        return res.json({ status: false, msg: 'Something went wrong in the backend!' });
    }
});
