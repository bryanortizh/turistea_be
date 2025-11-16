import { Server as SocketIOServer } from "socket.io";

let io: SocketIOServer | null = null;

export const setSocketIO = (socketIO: SocketIOServer): void => {
  io = socketIO;
};

export const getSocketIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.IO no está inicializado");
  }
  return io;
};

export const emitFormReserveStatusChange = (data: {
  formReserveId: number;
  newStatus: string;
  previousStatus: string;
  updatedAt: Date;
}): void => {
  console.log("🔔 [SOCKET] Iniciando emisión de evento...");
  console.log("🔔 [SOCKET] Datos:", JSON.stringify(data, null, 2));
  console.log("🔔 [SOCKET] Estado de io:", io ? "Inicializado ✅" : "No inicializado ❌");
  
  if (!io) {
    console.error("❌ [SOCKET] Socket.IO no está inicializado!");
    return;
  }
  
  try {
    io.emit("form_reserve_status_changed", data);
    console.log("✅ [SOCKET] Evento 'form_reserve_status_changed' emitido correctamente");
    console.log("👥 [SOCKET] Clientes conectados:", io.engine.clientsCount);
  } catch (error) {
    console.error("❌ [SOCKET] Error al emitir evento:", error);
  }
};
