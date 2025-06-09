"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error(`${req.hostname}: ${req.method}:${req.statusCode}: ${error.status}: ${error.message}`);
    res.status(error.status || 500).json({
        message: error.message || 'internal server Error '
    });
};
exports.errorHandler = errorHandler;
