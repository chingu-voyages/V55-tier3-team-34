/* import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import {errorHandler} from "./middleware/errorhandler.middleware";
import setupPassport from "./lib/oauth/strategies/oauth.strategy";
import config from "./config/config";
import authRoutes from "./routes/auth.routes";
import {profileRouter} from "./routes/profile.route";



const app = express();

setupPassport(passport);
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        sameSite: true
    }
}))
//middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(cors())
app.use(errorHandler);

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRouter)

export default app;

 */

import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import { errorHandler } from "./middleware/errorhandler.middleware";
import setupPassport from "./lib/oauth/strategies/oauth.strategy";
import config from "./config/config";
import authRoutes from "./routes/auth.routes";
import { profileRouter } from "./routes/profile.route";

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());


app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    sameSite: 'lax', 
    httpOnly: true
  }
}));

setupPassport(passport);

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRouter);


app.use(errorHandler);

export default app;
