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
const client = require('../model/clientModel');
const authJwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.clientAuthenticationMiddlewareFunction = (req, res, next) => {
    try {
        console.log('got inside the auth middleware!');
        const clientToken = req.cookies.clientToken;
        console.log(req.cookies);
        if (!clientToken)
            res.json({ status: false });
        else {
            console.log('The middleware detected the presence of the cookie in the request');
            authJwt.verify(clientToken, process.env.USER_TOKEN_SECRET, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.log(err, 'is the error that occured in the authJwt.verify');
                    res.json({ status: false });
                    next();
                }
                else {
                    console.log('no errors until now');
                    console.log(decodedToken, 'is the decoded token');
                    const clientDetails = yield client.findById(decodedToken.client._id);
                    console.log(clientDetails, 'is the client details');
                    if ((clientDetails === null || clientDetails === void 0 ? void 0 : clientDetails.isBanned) === false)
                        res.json({ status: true, client: clientDetails });
                    else
                        res.json({ status: false });
                    console.log('the middleware function completed!');
                    next();
                }
            }));
        }
    }
    catch (err) {
        res.json({ status: false });
        next();
        console.log(err, 'is the error that occured in the clientAuthenticationMiddlewareFunction ');
    }
};
