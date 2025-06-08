import {NextFunction, Response, Request} from "express";


export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction)  {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const hostname = req.hostname;
    const ip = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';
    const protocol = req.protocol;
    const httpVersion = req.httpVersion;
    console.log('=== REQUEST INFO ===');
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Method: ${method}`);
    console.log(`URL: ${url}`);
    console.log(`Protocol: ${protocol.toUpperCase()}/${httpVersion}`);
    console.log(`Hostname: ${hostname}`);
    console.log(`IP Address: ${ip}`);
    console.log(`User-Agent: ${userAgent}`);
    console.log(`Query Params:`, JSON.stringify(req.query));
    console.log(`Body:`, req.body);
    console.log('==================');
    next();
}
