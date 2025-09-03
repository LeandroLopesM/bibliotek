import {config} from '../bibliotek_config'
import {serverFail} from './etc/misc'
import * as http from 'http'

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
        try {
            if(!containsRoute(config.routes, req.url!))
            { 
                config.handlers['404'](res);
                console.warn('404 for ', req.url!);
            }
            else if(config.routes[req.url!] === undefined)
                throw Error('Route does not implement server for ' + req.url!);
            else
                config.routes[req.url!](res)
        } catch(err: any)
        {
            serverFail(res, err);
        }
    }
});

console.log("Server Started\nconfig:", config);
server.listen(config.port);