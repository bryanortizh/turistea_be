import { VercelRequest, VercelResponse } from '@vercel/node';
import Server from '../src/api/server';
import config from '../src/config/environments/index';
import { DataBase } from '../src/database';

// En serverless no ejecutamos tareas programadas automáticamente
// import '../src/schedulerTask';

// Inicializar el servidor
const server = Server.init(Number(config.PORT || 3000));

// Inicializar la base de datos
DataBase.instance;

// Exportar la función para Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  return server.app(req, res);
}