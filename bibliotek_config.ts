import { BibliotekConfig } from "./src/etc/types";
import * as srv from './src/servers';

export const config: BibliotekConfig = {
    port: '5500',
    routes: {
        ['/']: srv.ServeHome,
        ['/home']: srv.ServeHome,
    },
    handlers: {
        ['404']: srv.FOFErr
    },
    internalErr: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>500 Internal Server Error</title><style>body {display: flex;justify-content: center;align-items: center;height: 100vh;margin: 0;font-family: Arial, sans-serif;background-color: #f8d7da;color: #721c24;text-align: center;}h1 {font-size: 5em;margin: 0;}p {font-size: 1.5em;}</style></head><body><div><h1>500</h1><p>Internal Server Error: %ERROR%</p></div></body></html>'
}