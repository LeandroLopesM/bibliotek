import { IncomingMessage, ServerResponse } from "http";

export type BibliotekConfig = {
    port: string,
    // routes: Map<string, (Request) => Request>
    routes: any,
    // handlers: Map<string, (Request) => Request>
    handlers: any,
    
    resourceHandler: any

    internalErr: string
}

export type Request = ServerResponse<IncomingMessage>;