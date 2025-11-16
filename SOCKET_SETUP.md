# Configuración de Socket.IO para Form Reserve

## 1. Instalar dependencias

```bash
npm install socket.io
npm install @types/socket.io --save-dev
```

## 2. Archivos modificados:

### Backend:
- ✅ `src/api/server.ts` - Configurado Socket.IO server
- ✅ `src/index.ts` - Inicialización de Socket.IO
- ✅ `src/utils/socket.ts` - Helper para emitir eventos
- ✅ `src/api/form_reserve/controller/form_reserve.controller.ts` - Emite eventos al cambiar estado

### Frontend:
- ✅ `socket-client-example.html` - Ejemplo de cliente web

## 3. Eventos Socket.IO disponibles:

### Servidor → Cliente:
- **`form_reserve_status_changed`**: Se emite cuando cambia el estado de una reserva

Payload:
```typescript
{
  formReserveId: number;
  newStatus: string;
  previousStatus: string;
  updatedAt: Date;
}
```

## 4. Uso en el Frontend:

### Opción A: HTML/JavaScript Vanilla
Abre el archivo `socket-client-example.html` en tu navegador

### Opción B: React/Vue/Angular
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('form_reserve_status_changed', (data) => {
  console.log('Estado cambiado:', data);
  // Actualizar UI, mostrar notificación, etc.
});
```

### Opción C: Next.js (useEffect)
```javascript
import { useEffect } from 'react';
import io from 'socket.io-client';

useEffect(() => {
  const socket = io('http://localhost:5000');
  
  socket.on('form_reserve_status_changed', (data) => {
    console.log('Estado cambiado:', data);
    // Actualizar estado, refetch data, etc.
  });
  
  return () => {
    socket.disconnect();
  };
}, []);
```

## 5. Controladores que emiten eventos:

### `pendingPayFormReserveController`
- **Ruta:** `PUT /api/form_reserves/:id/pending-pay/status`
- **Estado requerido:** `pending_pay`
- **Emite socket:** ✅ Sí

Para agregar el socket a otros controladores, simplemente añade después de la actualización:

```typescript
// Emitir evento Socket.IO
emitFormReserveStatusChange({
  formReserveId: formId,
  newStatus: newStatus,
  previousStatus: previousStatus,
  updatedAt: new Date()
});
```

## 6. Configuración CORS

El servidor está configurado para aceptar conexiones desde cualquier origen:
```typescript
cors: {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}
```

Para producción, cambia `origin: "*"` por tu dominio específico.

## 7. Testing

1. Inicia el servidor: `npm run dev`
2. Abre `socket-client-example.html` en el navegador
3. Verifica que aparezca "✅ Conectado al servidor"
4. Realiza un cambio de estado en una reserva
5. Deberías ver la notificación en tiempo real

## 8. Estados de Form Reserve:

- `pending` - Pendiente
- `pending_pay` - Pendiente de pago
- `reserve` - Reservado
- `rejected` - Rechazado
- `done` - Completado
- `inprocesstravel` - En viaje
- `pendingpayinprocess` - Pendiente de pago en proceso

