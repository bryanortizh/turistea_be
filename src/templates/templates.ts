import {
  ITemplate,
  ITemplateAdmin,
  ITemplateClient,
  ITemplatePassword,
} from "../interfaces";

export const template_create_driver = (vars: ITemplatePassword) => {
  return `
    <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido Conductor - Turistea</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);">
    
    <!-- Header -->
    <div style="background: linear-gradient(160deg, #053654, #4c9bae); color: white; padding: 30px 20px; text-align: center;">
      <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px;">Turistea</div>
      <div style="font-size: 18px; opacity: 0.9;">Bienvenido Conductor</div>
    </div>
    
    <!-- Body -->
    <div style="padding: 40px 30px;">
      <h2 style="color: #053654; font-weight: 700; margin-bottom: 15px; font-size: 24px; margin-top: 0;">¡Hola ${vars.names}!</h2>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Te damos la bienvenida a la plataforma Turistea como Conductor turístico. Tu cuenta ha sido creada exitosamente y estamos emocionados de tenerte en nuestro equipo.</p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">A continuación, encontrarás tus credenciales de acceso:</p>
      
      <!-- Password Container -->
      <div style="background-color: #dee9eb; border-radius: 10px; padding: 25px; margin: 25px 0; border-left: 5px solid #4c9bae;">
        <div style="margin-bottom: 10px;">
          <strong>Usuario:</strong> ${vars.email}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Contraseña temporal:</strong>
        </div>
        <div style="font-family: monospace; font-size: 20px; background-color: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px dashed #4c9bae; margin-top: 10px; font-weight: bold; letter-spacing: 2px;">
          ${vars.password}
        </div>
      </div>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;"><strong>Por seguridad, te recomendamos cambiar tu contraseña después de iniciar sesión por primera vez.</strong></p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Una vez que ingreses, podrás:</p>
      
      <ul style="line-height: 1.6; color: #333; margin-bottom: 15px;">
        <li>Gestionar tus tours y excursiones</li>
        <li>Ver tu calendario de reservas</li>
        <li>Actualizar tu perfil profesional</li>
        <li>Consultar tus ingresos y comisiones</li>
        <li>Comunicarte con los turistas</li>
      </ul>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Si tienes alguna pregunta sobre el uso de la plataforma, no dudes en contactar a nuestro equipo de soporte.</p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Saludos cordiales,<br><strong>El equipo de Turistea</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #dee9eb; padding: 25px 20px; text-align: center; color: #053654; font-size: 14px; line-height: 1.5;">
      <p style="margin: 0 0 10px 0;">© 2025 Turistea. Todos los derechos reservados.</p>
      <p style="margin: 0 0 10px 0;">Este es un mensaje automático, por favor no respondas a este correo.</p>
      <p style="margin: 0;">Soporte para guías: guias@turistea.com</p>
    </div>
  </div>
</body>
</html>
  `;
};

export const template_create_guide = (vars: ITemplatePassword) => {
  return `
    <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido Guía - Turistea</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);">
    
    <!-- Header -->
    <div style="background: linear-gradient(160deg, #053654, #4c9bae); color: white; padding: 30px 20px; text-align: center;">
      <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px;">Turistea</div>
      <div style="font-size: 18px; opacity: 0.9;">Bienvenido Guía Turístico</div>
    </div>
    
    <!-- Body -->
    <div style="padding: 40px 30px;">
      <h2 style="color: #053654; font-weight: 700; margin-bottom: 15px; font-size: 24px; margin-top: 0;">¡Hola ${vars.names}!</h2>

      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Te damos la bienvenida a la plataforma Turistea como Guía Turístico. Tu cuenta ha sido creada exitosamente y estamos emocionados de tenerte en nuestro equipo.</p>

      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">A continuación, encontrarás tus credenciales de acceso:</p>
      
      <!-- Password Container -->
      <div style="background-color: #dee9eb; border-radius: 10px; padding: 25px; margin: 25px 0; border-left: 5px solid #4c9bae;">
        <div style="margin-bottom: 10px;">
          <strong>Usuario:</strong> ${vars.email}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Contraseña temporal:</strong>
        </div>
        <div style="font-family: monospace; font-size: 20px; background-color: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px dashed #4c9bae; margin-top: 10px; font-weight: bold; letter-spacing: 2px;">
          ${vars.password}
        </div>
      </div>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;"><strong>Por seguridad, te recomendamos cambiar tu contraseña después de iniciar sesión por primera vez.</strong></p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Una vez que ingreses, podrás:</p>
      
      <ul style="line-height: 1.6; color: #333; margin-bottom: 15px;">
        <li>Gestionar tus tours disponibles</li>
        <li>Ver tu calendario de reservas</li>
        <li>Actualizar tu perfil y especialidades</li>
        <li>Consultar tus ingresos y calificaciones</li>
        <li>Subir fotos y descripciones de tus tours</li>
      </ul>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Si tienes alguna pregunta sobre el uso de la plataforma, no dudes en contactar a nuestro equipo de soporte.</p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Saludos cordiales,<br><strong>El equipo de Turistea</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #dee9eb; padding: 25px 20px; text-align: center; color: #053654; font-size: 14px; line-height: 1.5;">
      <p style="margin: 0 0 10px 0;">© 2025 Turistea. Todos los derechos reservados.</p>
      <p style="margin: 0 0 10px 0;">Este es un mensaje automático, por favor no respondas a este correo.</p>
      <p style="margin: 0;">Soporte para guías: guias@turistea.com</p>
    </div>
  </div>
</body>
</html>
  `;
};

export const template_create_client = (vars: ITemplateClient) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verificación de Cuenta - Turistea</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);">
    
    <!-- Header -->
    <div style="background: linear-gradient(160deg, #053654, #4c9bae); color: white; padding: 30px 20px; text-align: center;">
      <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px;">Turistea</div>
      <div style="font-size: 18px; opacity: 0.9;">Verificación de Cuenta</div>
    </div>
    
    <!-- Body -->
    <div style="padding: 40px 30px;">
      <h2 style="color: #053654; font-weight: 700; margin-bottom: 15px; font-size: 24px; margin-top: 0;">¡Hola ${vars.names}!</h2>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Gracias por registrarte en Turistea. Para completar tu registro y verificar tu identidad, por favor utiliza el siguiente código de verificación:</p>
      
      <!-- Verification Code Container -->
      <div style="background-color: #dee9eb; border-radius: 10px; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 15px; margin: 30px 0; color: #053654; border: 2px dashed #4c9bae;">
        ${vars.code}
      </div>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;"><strong>Este código es válido por 10 minutos.</strong> Si no has solicitado este código, por favor ignora este mensaje.</p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactar a nuestro equipo de soporte.</p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Saludos cordiales,<br><strong>El equipo de Turistea</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #dee9eb; padding: 25px 20px; text-align: center; color: #053654; font-size: 14px; line-height: 1.5;">
      <p style="margin: 0 0 10px 0;">© 2025 Turistea. Todos los derechos reservados.</p>
      <p style="margin: 0 0 10px 0;">Este es un mensaje automático, por favor no respondas a este correo.</p>
      <p style="margin: 0;">Si tienes alguna consulta, contáctanos a: soporte@turistea.com</p>
    </div>
  </div>
</body>
</html>
  `;
};

export const template_create_admin = (vars: ITemplateAdmin) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido Administrador - Turistea</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);">
    
    <!-- Header -->
    <div style="background: linear-gradient(160deg, #053654, #4c9bae); color: white; padding: 30px 20px; text-align: center;">
      <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px;">Turistea</div>
      <div style="font-size: 18px; opacity: 0.9;">Bienvenido Administrador</div>
    </div>
    
    <!-- Body -->
    <div style="padding: 40px 30px;">
      <h2 style="color: #053654; font-weight: 700; margin-bottom: 15px; font-size: 24px; margin-top: 0;">¡Hola ${
        vars.names
      }!</h2>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Te damos la bienvenida al panel de administración de Turistea. Tu cuenta de administrador ha sido creada exitosamente.</p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">A continuación, encontrarás tus credenciales de acceso:</p>
      
      <!-- Password Container -->
      <div style="background-color: #dee9eb; border-radius: 10px; padding: 25px; margin: 25px 0; border-left: 5px solid #4c9bae;">
        <div style="margin-bottom: 10px;">
          <strong>Usuario:</strong> ${
            vars.email
          }
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Contraseña temporal:</strong>
        </div>
        <div style="font-family: monospace; font-size: 20px; background-color: white; padding: 15px; border-radius: 8px; text-align: center; border: 2px dashed #4c9bae; margin-top: 10px; font-weight: bold; letter-spacing: 2px;">
          ${vars.password}
        </div>
      </div>
      
      <!-- Security Note -->
      <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0; color: #856404;">
        <strong>Importante:</strong> Por seguridad, debes cambiar tu contraseña inmediatamente después de iniciar sesión por primera vez. Esta contraseña temporal tiene acceso completo al sistema administrativo.
      </div>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Desde el panel de administración podrás:</p>
      
      <ul style="line-height: 1.6; color: #333; margin-bottom: 15px;">
        <li>Gestionar usuarios (clientes, conductores y guías)</li>
        <li>Supervisar viajes y reservas</li>
        <li>Configurar parámetros del sistema</li>
        <li>Generar reportes y estadísticas</li>
        <li>Gestionar pagos y comisiones</li>
        <li>Administrar contenido de la plataforma</li>
      </ul>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Si tienes alguna pregunta sobre las funcionalidades del panel administrativo, contacta al administrador principal.</p>
      
      <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">Saludos cordiales,<br><strong>El equipo de Turistea</strong></p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #dee9eb; padding: 25px 20px; text-align: center; color: #053654; font-size: 14px; line-height: 1.5;">
      <p style="margin: 0 0 10px 0;">© 2025 Turistea. Todos los derechos reservados.</p>
      <p style="margin: 0 0 10px 0;">Este es un mensaje automático, por favor no respondas a este correo.</p>
      <p style="margin: 0;">Acceso restringido - Uso exclusivo para administradores autorizados</p>
    </div>
  </div>
</body>
</html>
`;
};
