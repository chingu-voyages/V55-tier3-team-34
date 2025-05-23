import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    databaseUrl: string | any,
    githubCallbackUrl: string,
    githubClientId: string,
    githubClientSecret: string,
    sessionSecret: string,
    successRedirect: string,
    failureRedirect: string,
    clientUrl: string
}

const BASE_URL = process.env.NODE_ENV == "development" ? "http://127.0.0.1:3000": ""
const CLIENT_URL = process.env.NODE_ENV == "development" ? process.env.CLIENT_URL : ""
const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE_URL || "",
    githubCallbackUrl: `${BASE_URL}/${process.env.GITHUB_CALLBACK_URL}`,
    githubClientId: process.env.GITHUB_CLIENT_ID || "",
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    sessionSecret: process.env.SESSION_SECRET || "",
    successRedirect: `${CLIENT_URL}/${process.env.SUCCESS_REDIRECT}` || "",
    failureRedirect:  `${CLIENT_URL}/${process.env.FAILURE_REDIRECT}` || "",
    clientUrl: CLIENT_URL || "",
};

export default config;
