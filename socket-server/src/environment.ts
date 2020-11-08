import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export default registerAs('environment', () => ({
    //
    // PORT: The port number this service is listening.
    //
    port: parseInt(process.env['PORT'], 10) || 3000,
    //
    // LOG_LEVEL: Like "error,warn" or "log,error,warn,debug,verbose".
    //
    logLevel: (process.env['LOG_LEVEL']?.split(',') || [
        'log',
        'error',
        'warn',
        'debug',
    ]) as LogLevel[],
    //
    // Sample
    //
    database: {
        host: process.env['DATABASE_HOST'] || 'redis.127.0.0.1.nip.io',
        port: parseInt(process.env['DATABASE_PORT'], 10) || 6379,
    },
}));
