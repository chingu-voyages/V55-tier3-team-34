"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000" : "";
const CLIENT_URL = process.env.CLIENT_URL;
const config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL || "",
    githubCallbackUrl: `${BASE_URL}/${process.env.GITHUB_CALLBACK_URL}`,
    githubClientId: process.env.GITHUB_CLIENT_ID || "",
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    sessionSecret: process.env.SESSION_SECRET || "",
    successRedirect: `${CLIENT_URL}${process.env.SUCCESS_REDIRECT}` || "",
    failureRedirect: `${CLIENT_URL}${process.env.FAILURE_REDIRECT}` || "",
    clientUrl: CLIENT_URL || "",
    maxAge: 1000 * 60 * 60 * 24 * 7
};
exports.default = config;
