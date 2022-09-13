import nodemailer from 'nodemailer'


export const emailRegistro = async (datos) => {

    const { email, token, usuario } = datos
    
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user:process.env.EMAIL_USER ,
          pass:process.env.EMAIL_PASS
        }
      });

      const mailBody = await transport.sendMail({
          from: '"My Comic Collection - Registro" <registro@mycomiccollection.com>',
          to: email,
          subject: "Bienvenido a My Comic Collection - Verifica tu email",
          text:'Verifica tu email',
          html:` <p> Hola: ${usuario} Verifica tu email para completar tu registro</p> <br>
                  <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}"> Verificar mail</a> <br>
                  <p>Si tu no creaste esta cuenta, ignora este mensaje.</p> `
      })

}


var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2f5770f865c59c",
      pass: "e50e3e27d00116"
    }
  });