import { LogLevel } from '@nestjs/common';

export default () => ({
    //
    // PORT: The port number this service is listening.
    //
    port: parseInt(process.env.PORT, 10) || 3000,
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
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    },
});
