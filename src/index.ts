import {config} from '../bibliotek_config'
import { Request } from './etc/types';
import {serverFail} from './etc/misc'
import * as http from 'http'
import { url } from 'inspector';

function containsRoute(a: Map<string, any>, b: string): boolean
{
    for(const key in a)
    {
        if (key === b) return true;
    }

    return false;
}

let server = http.createServer((req, res) => {
    // console.log("New connection asking for ", req.url!);
    if(req.method === 'GET')
    {
        console.log("Requesting " + req.url!);
        try {
            if(req.url!.startsWith('/api')) config.resourceHandler(req.url!, res);

            else if(!containsRoute(config.routes, req.url!))
            { 
                config.handlers['404'](res);
                console.error('404 for ', req.url!);
            }
            else if(config.routes[req.url!] === undefined)
                throw Error('Route does not implement server for ' + req.url!);
            else
                config.routes[req.url!](res)
        } catch(err: any)
        {
            serverFail(res, err);
        }

        res.end();
    }
});

console.log("Server Started\nconfig:", config);
server.listen(config.port);