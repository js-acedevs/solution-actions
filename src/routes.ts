import { Application, Router } from 'express';

// controllers
import { PingController } from './controllers/Ping.controller';
import { LoginController } from './controllers/Login.controller';
import { RegisterController } from './controllers/Register.controller';

const endpoints: [string, Router][] = [
    ['/ping', PingController],
    ['/login', LoginController],
    ['/register', RegisterController]
];

export const routes = (app: Application): void => {
    endpoints.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
