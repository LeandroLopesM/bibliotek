import {Request} from './types';
import {config} from '../../bibliotek_config'
import * as fs from 'fs';

export function serverFail(req: Request, error: any): Request
{
    console.error('Server failed with message: ' + error.message);
    req.writeHead(500, {
        "Content-Length":`${config.internalErr.length + error.message.length}`,
        "Content-Type": 'text/html; charset=utf-8'
    });

    req.write(config.internalErr.replace('%ERROR%', `<b>${error.message}</b>`));
    req.end();
    return req;
}

export function serve(req: Request, file: string, code: number = 200, literalPath?: string): Request
{
    literalPath = literalPath || `pages/${file}/index.html`;

    if(!fs.existsSync(literalPath))
    {
        throw Error("Internal fetch for missing route " + literalPath);
    }
    var fileStr: string = fs.readFileSync(literalPath).toString();

    req.writeHead(code, {
        "Content-Length":`${fileStr.length}`,
        "Content-Type": 'text/html; charset=utf-8'
    });
    req.write(fileStr);

    console.log(file);
    return req;
}