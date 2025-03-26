const nodemailer = require("nodemailer");

export default async function (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { name, email, phone, company, investment, revenue } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "wmmarketing.contato@gmail.com", // Seu email
            pass: "uanvrdlcjhimtlad" // Senha de app do Gmail
        }
    });

    const mailOptions = {
        from: email, // E-mail do usuário que preencheu o formulário
        to: "wmmarketing.contato@gmail.com", // E-mail que vai receber os contatos
        subject: "Novo contato do site!",
        text: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone}
        Empresa: ${company}
        Investimento em marketing: ${investment}
        Faturamento mensal: ${revenue}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
