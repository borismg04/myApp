import nodemailer from 'nodemailer';

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
    from: '"MyTimeUp - Admin de Proyectos" <cuentas@mytimeup.com>',
    to: email,
    subject: "MyTimeUp - Confirma tu cuenta ✅",
    text: "Comprueba tu Cuenta 📧",
    html: `<p>Hola ${nombre} Comprueba tu cuenta en MyTimeUp🎉</p>
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el sigueinte enlace:

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>

    <p>Si no has solicitado una cuenta en MyTimeUp, por favor ignora este mensaje.</p>


    `
  });
  console.log("Message sent:", info.messageId);
};
