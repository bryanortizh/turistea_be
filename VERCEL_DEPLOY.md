# Deploy de Turistea Backend en Vercel

## 📋 Resumen de cambios realizados

Este proyecto ha sido configurado para desplegarse en Vercel como una aplicación serverless. Los cambios incluyen:

### ✅ Archivos agregados/modificados:

1. **`vercel.json`** - Configuración principal de Vercel
2. **`.vercelignore`** - Archivos ignorados durante el deploy
3. **`api/index.ts`** - Función serverless que maneja todas las rutas
4. **`src/api/server.ts`** - Agregado getter `app` para acceder a la aplicación Express
5. **`src/database/index.ts`** - Optimizado para conexiones serverless
6. **`package.json`** - Agregado script `vercel-build`
7. **`VERCEL_ENV_SETUP.md`** - Documentación de variables de entorno

### 🚀 Pasos para el deploy:

#### 1. Preparar base de datos
- Asegúrate de que tu base de datos MySQL esté accesible desde internet
- Recomendación: usar PlanetScale, Railway o configurar tu MySQL para serverless

#### 2. Configurar variables de entorno en Vercel
Revisa el archivo `VERCEL_ENV_SETUP.md` para la lista completa de variables requeridas.

#### 3. Deploy en Vercel

**Opción A: Desde GitHub (recomendado)**
```bash
# 1. Subir código a GitHub
git add .
git commit -m "Configure for Vercel deployment"
git push

# 2. Conectar repositorio en vercel.com
# 3. Configurar variables de entorno
# 4. Deploy automático
```

**Opción B: Deploy directo con Vercel CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy
vercel
```

#### 4. Configurar variables de entorno
En el dashboard de Vercel:
1. Ve a Settings > Environment Variables
2. Agrega todas las variables listadas en `VERCEL_ENV_SETUP.md`
3. Asegúrate de seleccionar "Production" environment

### ⚠️ Consideraciones importantes:

#### Base de datos
- **SSL**: La configuración incluye SSL para conexiones seguras
- **Pool de conexiones**: Optimizado para serverless (máx 2 conexiones)
- **Timeouts**: Configurados para evitar conexiones colgadas
- **Retry**: Manejo automático de reconexión

#### Scheduler/Cron Jobs
- Los cron jobs (`src/schedulerTask.ts`) están comentados en la función serverless
- Para tareas programadas en Vercel, considera usar:
  - Vercel Cron Jobs (en beta)
  - Servicios externos como GitHub Actions
  - Webhooks programados

#### Assets/Archivos
- Los assets locales (`src/assets/`) no persisten en serverless
- Considera usar servicios de almacenamiento como:
  - Vercel Blob Storage
  - AWS S3
  - Cloudinary

### 🔧 Configuración de MySQL para Serverless

Si usas tu propio MySQL, configura:

```sql
-- Aumentar límites de conexión
SET GLOBAL max_connections = 200;
SET GLOBAL wait_timeout = 28800;
SET GLOBAL interactive_timeout = 28800;

-- Configurar SSL (si es necesario)
-- Consulta la documentación de tu proveedor MySQL
```

### 📈 Monitoreo y logs

- Logs disponibles en Vercel Dashboard > Functions tab
- Monitorea el uso de la base de datos
- Configura alertas para errores 500

### 🐛 Troubleshooting común

1. **Error de conexión a BD**: Verificar variables de entorno y acceso desde internet
2. **Timeout en funciones**: Máximo 10s en plan gratuito, 30s en plan Pro
3. **Assets no cargan**: Migrar a almacenamiento externo
4. **CORS errors**: Verificar configuración de dominios en servidor

### 📞 Siguientes pasos

1. Deploy inicial y pruebas
2. Configurar dominio personalizado (opcional)
3. Migrar assets a storage externo
4. Configurar monitoreo y alertas
5. Documentar endpoints de la API

¿Listo para el deploy? ¡Sigue los pasos anteriores y tu API estará en línea! 🚀