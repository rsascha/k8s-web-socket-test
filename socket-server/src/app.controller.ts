import { Controller, Get } from '@nestjs/common';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        return data;
    }
}
