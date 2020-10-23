import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'subscriber';
    message$: Observable<string>;

    constructor(private socket: Socket) {}

    ngOnInit() {
        this.message$ = new Observable((subscribe) => {
            console.debug('connected: ', this.socket.ioSocket['connected']);
            this.socket.emit('events', { name: 'Nest' });
            this.socket.on('events', (data) => {
                console.debug(data);
                subscribe.next(data);
            });
        });
    }
}
