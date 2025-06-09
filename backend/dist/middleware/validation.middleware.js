"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = validateData;
const zod_1 = require("zod");
function isZodError(e) {
    return typeof e === "object" && e?.name === "ZodError" && Array.isArray(e.issues);
}
function validateData(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (e) {
            if (e instanceof zod_1.ZodError) {
                const errorMessages = e.issues.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res.status(400).json({ error: "Invalid Data", details: errorMessages });
            }
            else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    };
}
