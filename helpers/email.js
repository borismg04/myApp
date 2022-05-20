import nodemailer from 'nodemailer';

export const emailRegistro = async (datos)=>{
  const { email , nombre , token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Información del correo
  const info = await transport.sendMail({
    from: '"MyTimeApp - Admin de Proyectos" <cuentas@mytimeapp.com>',
    to: email,
    subject: "MyTimeApp - Confirma tu cuenta ✅",
    text: "Comprueba tu Cuenta 📧",
    html: `<p>Hola ${nombre} Comprueba tu cuenta en MyTimeApp🎉</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el sigueinte enlace:

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>

    <p>Si no has solicitado una cuenta en MyTimeApp, por favor ignora este mensaje.</p>


    `
  });
  console.log("Message sent:", info.messageId);
};

export const emailOlvidePassword = async (datos)=>{
  const { email , nombre , token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Información del correo
  const info = await transport.sendMail({
    from: '"MyTimeApp - Admin de Proyectos" <cuentas@mytimeApp.com>',
    to: email,
    subject: "MyTimeApp - Reestablece tu Contraseña🔄",
    text: "Reestablece tu contraseña 🔄",
    html: `<p>Hola ${nombre} has solicitado reestablecer tu contraseña</p>

    <p>Sigue el siguiente enlace para generar tu nueva contraseña:

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Contraseña</a>

    <p>Si tu no has solicitado este email, por favor ignora este mensaje.</p>


    `
  });
  console.log("Message sent:", info.messageId);
};
