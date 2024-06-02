import nodemailer from 'nodemailer'

const sendEmail =async ({from=process.env.EMAIL,to,subject,cc,text,html,attachments})=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        tls:{rejectUnauthorized:false},
        auth: {
          
          user: process.env.GMAIL,
          pass: process.env.GMAILPASS,
        },
      });
      
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: `"Route 👻" <${process.env.GMAIL}>`, // sender address
          to, // list of receivers
          subject, // Subject line
          cc,
          text, // plain text body
          html,
          attachments // html body
        });
      
        console.log("Message sent: %s", info);
       
        return info.rejected.length?false:true
      
}

export default sendEmail
