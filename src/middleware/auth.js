"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken = function (req, res, next) {
    try {
        var customReq = req;
        var authorization = customReq.headers.authorization;
        var token = (authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1]) || '';
        var decodeJwt = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        customReq.decodeJwt = decodeJwt;
        next();
    }
    catch (err) {
        res.status(401).json('Invalid Token');
        return;
    }
};
exports.default = verifyToken;
