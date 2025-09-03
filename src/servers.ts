import { IncomingMessage, ServerResponse } from "http";
import * as fs from 'fs';
import {Request} from './etc/types'
import {serve} from './etc/misc'

export function ServePageResource(url: string, req: Request)
{
    var contentType = 'text/';
    var customContentType = false;

    if(url.endsWith('.css')) contentType += 'css';
    else if(url.endsWith('.html')) contentType += 'html';
    else if(url.endsWith('.js')) contentType += 'javascript';
    else { // api/whatever/image.png::image/png
        contentType = url.split('::')[1];
        customContentType = true;
    }

    var filepath;

    if(customContentType)
    {
        if(contentType === undefined) throw Error('Content type for \''+ url +'\' not supported, aborted transaction')

        filepath = url.split('::')[0].replace('/api/', 'pages/');
    }
    else
        filepath = url.replace('/api/', 'pages/');

    console.log("Serving resource " + filepath)
    if(!fs.existsSync(filepath))
    {
        serve(req, '', 404, { literalText: 'Failed to find ' + filepath, customType: 'text/plain' });
        return;
    }

    serve(req, '', 200, { customType: contentType, literalPath: filepath });
}


export function ServeHome(req: Request)
{
    serve(req, 'home')
}

export function FOFErr(req: Request)
{
    serve(req, '', 404, { literalPath: "pages/404.html" })
}