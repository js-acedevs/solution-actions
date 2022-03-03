import { Application, Router } from 'express';

// controllers
import { PingController } from './controllers/Ping.controller';

const endpoints: [string, Router][] = [['/ping', PingController]];

export const routes = (app: Application): void => {
    endpoints.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
