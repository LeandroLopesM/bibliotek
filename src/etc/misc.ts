import {Request} from './types';
import {config} from '../../bibliotek_config'
import * as fs from 'fs';

export function serverFail(req: Request, error: any)
{
    console.error('Server failed with message: ' + error.message);
    
    if(!req.headersSent)
    {
        req.writeHead(500, {
            "Content-Length":`${config.internalErr.length + error.message.length}`,
            "Content-Type": 'text/html; charset=utf-8'
        });
    }

    req.write(config.internalErr.replace('%ERROR%', `<b>${error.message}</b>`));
    req.end();
    
    const stack = error.stack.split("\n").slice(1, 4).join("\n");
    console.warn(stack); // to view the result
}

export function serve(req: Request, file: string, code: number = 200, opts: {literalPath?: string, literalText?: string, customType?: string} = {})
{
    opts.customType = opts.customType || 'text/html'; 
    opts.customType += '; charset=utf-8';

    if(typeof opts.literalText !== 'undefined')
    {
        if(!req.headersSent)
            req.writeHead(code, {
                "Content-Length":`${opts.literalText!.length}`,
                "Content-Type": opts.customType!
            });
        req.write(opts.literalText);

        return;
    }

    opts.literalPath = opts.literalPath || `pages/${file}/index.html`;

    if(!fs.existsSync(opts.literalPath!))
    {
        throw Error("Internal fetch for missing route " + opts.literalPath!);
    }
    var fileStr: string = fs.readFileSync(opts.literalPath!).toString();
    
    if(!req.headersSent)
        req.writeHead(code, {
            "Content-Length":`${fileStr.length}`,
            "Content-Type": opts.customType!
        });
    req.write(fileStr);

    console.log(file);
}