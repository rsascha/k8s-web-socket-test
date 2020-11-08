import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import environment from 'src/environment';

export class RedisIoAdapter extends IoAdapter {
    config = environment();

    createIOServer(port: number, options?: any): any {
        const server = super.createIOServer(port, options);
        const redisAdapter = redisIoAdapter({
            host: this.config.database.host,
            port: this.config.database.port,
        });

        server.adapter(redisAdapter);
        return server;
    }
}
