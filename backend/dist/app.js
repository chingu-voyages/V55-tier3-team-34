"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const oauth_strategy_1 = __importDefault(require("./lib/oauth/strategies/oauth.strategy"));
const config_1 = __importDefault(require("./config/config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const profile_route_1 = require("./routes/profile.route");
const projects_route_1 = __importDefault(require("./routes/projects.route"));
const errorhandler_middleware_1 = require("./middleware/errorhandler.middleware");
const tag_route_1 = require("./routes/tag.route");
const request_logging_middleware_1 = require("./middleware/request-logging.middleware");
const app = (0, express_1.default)();
app.set('trust proxy', 1);
//middleware
app.use((0, cors_1.default)({
    origin: config_1.default.clientUrl,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: config_1.default.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        priority: "high",
        httpOnly: true,
        maxAge: config_1.default.maxAge,
        secure: config_1.default.nodeEnv === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, oauth_strategy_1.default)(passport_1.default);
app.use(request_logging_middleware_1.requestLoggingMiddleware);
app.use(errorhandler_middleware_1.errorHandler);
//Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/profiles', profile_route_1.profileRouter);
app.use('/api/projects', projects_route_1.default);
app.use('/api/tags', tag_route_1.tagRouter);
exports.default = app;
