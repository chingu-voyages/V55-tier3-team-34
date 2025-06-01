
import {NextFunction , Request , Response} from "express";
import {ZodSchema , ZodError } from "zod";


function isZodError(e: any): e is ZodError {
    return typeof e === "object" && e?.name === "ZodError" && Array.isArray(e.issues);
}

export function validateData(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }  catch (e: any) {
            if (isZodError(e)) {
                const errorMessages = e.issues.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                return res.status(400).json({ error: "Invalid Data", details: errorMessages });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    };
}
