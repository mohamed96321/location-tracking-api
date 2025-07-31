import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

export function setupSocketIO(app: INestApplication) {
  const adapter = new IoAdapter(app);
  const config: Partial<ServerOptions> = {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  };
  adapter.createIOServer = function (port, options) {
    return require('socket.io')(port, { ...options, ...config });
  };
  app.useWebSocketAdapter(adapter);
}
