import nodemailer from 'nodemailer';

//TODO: Mover hacia un cliente Axios
export const emailRegistro = async (datos)=>{
  const { email , nombre , token } = datos;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ecee6dec1afb6f",
      pass: "74af5245d9b6e3"
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

//TODO: Mover a encriptacion(env)
export const emailOlvidePassword = async (datos)=>{
  const { email , nombre , token } = datos;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ecee6dec1afb6f",
      pass: "74af5245d9b6e3"
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
