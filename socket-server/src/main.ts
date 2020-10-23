import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import environment from './environment';

async function bootstrap() {
    const config = environment();
    const port = config.port;
    const logger = new Logger('bootstrap()');

    const app = await NestFactory.create(AppModule, {
        logger: config.logLevel,
    });
    logger.log(
        `Starting with LOG_LEVELS: ${config.logLevel} (possible values are: log,error,warn,debug,verbose)`,
    );

    app.enableCors({ origin: 'http://localhost:4200', credentials: true });
    //app.setGlobalPrefix('application-service/v1');

    app.use((req: Request, res: Response, next: Function) => {
        logger.debug(`Incoming Request: ${req.url}`);
        next();
    });

    const options = new DocumentBuilder()
        .setTitle('Application Service')
        .setVersion('1.0')
        .addServer(`http://localhost:${port}`)
        .build();
    logger.verbose(`Swagger Document Builder Options: ${options}`);

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(port);
    app.getUrl().then(url => {
        logger.log(`Service is listening on: ${url}`);
        logger.log(`Swagger is running on: ${url}/swagger`);
        logger.log(`Open API data is provided on: ${url}/swagger-json`);
    });
}
bootstrap();
