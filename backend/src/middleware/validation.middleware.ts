
import {NextFunction , Request , RequestHandler , Response} from "express";
import {ZodSchema , ZodError } from "zod";


function isZodError(e: any): e is ZodError {
    return typeof e === "object" && e?.name === "ZodError" && Array.isArray(e.issues);
}

export function validateData(schema: ZodSchema): RequestHandler {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (e: any) {
            if (e instanceof ZodError) {
                const errorMessages = e.issues.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res.status(400).json({ error: "Invalid Data", details: errorMessages });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    };
}
