import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events.gateway';
import environment from './environment';

@Module({
    imports: [ConfigModule.forRoot({ load: [environment], isGlobal: true })],
    controllers: [AppController],
    providers: [AppService, Logger, EventsGateway],
})
export class AppModule {}
