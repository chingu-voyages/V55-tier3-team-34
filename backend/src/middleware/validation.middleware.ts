import {ZodError , ZodObject , ZodRawShape , ZodTypeAny} from "zod";
import {NextFunction , Request , Response} from "express";


export function validateData(schema: ZodObject<ZodTypeAny>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (e) {
            if (e instanceof ZodError) {
                const errorMessages = e.errors.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res.status(400).json({ error: "Invalid Data", details: errorMessages });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    };
}
