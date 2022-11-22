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
        const { user, pwd, email } = req.body;
        console.log(user, pwd, email);
        const emailCheck = yield Client.findOne({ email });
        if (emailCheck)
            return res.json({ msg: 'Account already exists', staus: false });
        const hashedPassword = yield bcrypt.hash(pwd, 10);
        const client = yield Client.create({ clientname: user, email, password: hashedPassword });
        delete client.password;
        return res.json({ status: true, client });
    }
    catch (err) {
        console.log(err, 'is the error that occured in the clientRegister function in the clientControllers');
        return res.json({ status: false, msg: 'Something went wrong' });
    }
});
