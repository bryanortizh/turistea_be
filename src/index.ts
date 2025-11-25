import Server from './api/server'
import config from './config/environments/index'
import { DataBase } from './database'
import { setSocketIO } from './utils/socket'
import { startSchedulers } from './schedulerTask'

const server = Server.init(Number(config.PORT))

setSocketIO(server.io);

// Iniciar schedulers ahora que Socket.IO ya está disponible
startSchedulers()

server.start(() => {
  console.log('Server on fire ' + config.PORT)
  console.log('Socket.IO initialized')
  DataBase.instance
})
