import express , {NextFunction, Request, Response} from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import setupPassport from "./lib/oauth/strategies/oauth.strategy";
import config from "./config/config";
import authRoutes from "./routes/auth.routes";
import {profileRouter} from "./routes/profile.route";
import projectRouter from "./routes/projects.route";
import {errorHandler} from "./middleware/errorhandler.middleware";


const app = express();

app.set('trust proxy', 1)


//middleware
app.use(cors({
    origin: config.clientUrl,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
}));
app.use(express.json());
app.use(session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        priority: "high",
        httpOnly: true,
        maxAge: config.maxAge,
        secure: config.nodeEnv === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}))

app.use(passport.initialize())
app.use(passport.session())
setupPassport(passport);



app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Cookies reçus :', req.cookies, req.user);
    console.log('Session :', req.session, req.user);
    next();
});
app.use(errorHandler);

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRouter);
app.use('/api/projects', projectRouter)

export default app;

