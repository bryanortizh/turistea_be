# Variables de entorno requeridas para Vercel

Estas son las variables de entorno que necesitas configurar en tu proyecto de Vercel:

## Variables de entorno obligatorias:

### Base de datos
- `PROY_BD` - Nombre de la base de datos
- `PROY_BD_HOST` - Host de la base de datos MySQL
- `PROY_BD_USER` - Usuario de la base de datos
- `PROY_BD_PASS` - Contraseña de la base de datos
- `PROY_BD_PORT` - Puerto de la base de datos (por defecto 3306)

### Aplicación
- `NODE_ENV` - Debe ser "production"
- `PROY_APP_PORT` - Puerto de la aplicación (opcional, Vercel lo maneja automáticamente)
- `SECRET_HIDDEN_KEY` - Clave secreta para JWT

### Email
- `SEND_TRANSPORTER` - Configuración del transportador de email
- `SENDER` - Email del remitente
- `SENDER_PASS` - Contraseña del email
- `SENDER_ALIAS` - Alias del remitente
- `SENDGRID_KEY` - API key de SendGrid (si usas SendGrid)

### URLs
- `PROY_BEURL` - URL del backend en producción
- `PROY_FEURL` - URL del frontend en producción

### Notificaciones
- `ONE_SIGNAL_APP_ID` - ID de la aplicación OneSignal
- `ONE_SIGNAL_API_KEY` - API key de OneSignal

## Cómo configurar en Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Ve a Settings > Environment Variables
3. Agrega cada variable con su valor correspondiente
4. Selecciona en qué entornos aplicar (Production, Preview, Development)
5. Guarda los cambios

## IMPORTANTE sobre la base de datos:

Para una aplicación serverless como Vercel, recomiendo usar:
- **PlanetScale** (MySQL compatible, manejo automático de conexiones)
- **Supabase** (PostgreSQL, pero puedes migrar)
- **Railway** (MySQL tradicional con buen soporte serverless)

O configurar tu MySQL actual para manejar conexiones serverless con:
- Pool de conexiones limitado
- Timeout de conexión bajo
- Reconexión automática