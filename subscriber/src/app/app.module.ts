import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = {
    url: 'http://socket-server.127.0.0.1.nip.io',
    options: {},
};

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SocketIoModule.forRoot(config)],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
