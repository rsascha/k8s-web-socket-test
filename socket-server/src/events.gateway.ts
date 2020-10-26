import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { from, Observable, of, Subject, timer } from 'rxjs';
import { every, filter, map, mergeMap, takeWhile, tap } from 'rxjs/operators';

interface ResponseDataType {
    message: string;
    serverTime: string;
}
interface RequestDataType {
    message: string;
    ping: boolean;
}

@WebSocketGateway()
export class EventsGateway {
    constructor(private readonly logger: Logger) {}

    /**
     * Implementation with bugs:
     * - client can subscribe multiple times
     * - every subscription starts a new event stream
     * - client cannot unsubscribe
     */
    @SubscribeMessage('events')
    handleMessage(
        @MessageBody() request: RequestDataType,
        @ConnectedSocket() client: Socket,
    ): Observable<WsResponse<ResponseDataType>> {
        this.logger.debug(
            `Server receives a request with message: "${request.message}" and ping: ${request.ping}`,
        );
        const events$ = timer(1000, 1000);
        return events$.pipe(
            tap(data => {
                this.logger.debug(data);
            }),
            map(data => {
                return {
                    event: 'events',
                    data: {
                        message: `Hello from Server: ${data}`,
                        serverTime: `${new Date()}`,
                    },
                };
            }),
        );
    }
}
