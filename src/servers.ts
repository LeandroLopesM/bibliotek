import { IncomingMessage, ServerResponse } from "http";
import * as fs from 'fs';
import {Request} from './etc/types'
import {serve} from './etc/misc'

export function ServeHome(req: Request)
{
    serve(req, 'home')
}

export function FOFErr(req: Request)
{
    serve(req, '', 404, "pages/404.html")
    req.end();
}