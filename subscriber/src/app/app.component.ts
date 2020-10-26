import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {
    bindCallback,
    bindNodeCallback,
    Observable,
    pipe,
    Subject,
} from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

interface ResponseDataType {
    message: string;
    serverTime: string;
}
interface RequestDataType {
    message: string;
    ping: boolean;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'subscriber';
    events$: Observable<ResponseDataType>;

    constructor(private socket: Socket) {}

    ngOnInit() {}

    ngOnDestroy() {}

    doSubscribe() {
        if (!this.events$) {
            this.events$ = new Observable<ResponseDataType>((subscribe) => {
                this.socket.on('events', (data) => {
                    subscribe.next(data);
                });
            });
        }
        this.socket.emit('events', {
            message: 'Please send a ping',
            ping: true,
        } as RequestDataType);
    }

    doUnsubscribe() {
        this.socket.emit('events', {
            message: 'Please stop ping',
            ping: false,
        } as RequestDataType);
    }

    date() {
        return new Date();
    }
}
