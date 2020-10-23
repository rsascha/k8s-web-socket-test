import { Logger } from '@nestjs/common';
import {
    SubscribeMessage,
    WebSocketGateway,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@WebSocketGateway()
export class EventsGateway {
    constructor(private readonly logger: Logger) {}

    @SubscribeMessage('events')
    handleMessage(client: any, payload: any): Observable<WsResponse<string>> {
        this.logger.log(`handleMessage()`);
        const events = timer(1000, 1000);
        return events.pipe(
            tap(data => {
                this.logger.debug(data);
            }),
            map(data => ({
                event: 'events',
                data: `Hello from Server: ${data}`,
            })),
        );
    }
}
