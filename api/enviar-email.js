const nodemailer = require("nodemailer");

export default async function (req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { name, email, phone, company, investment, revenue } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "wmmarketing.contato@gmail.com",
            pass: "17192022" // Use uma senha de app, não sua senha normal
        }
    });

    const mailOptions = {
        from: email,
        to: "wmmarketing.contato@gmail.com",
        subject: "Novo contato do site!",
        text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nEmpresa: ${company}\nInvestimento: ${investment}\nFaturamento Mensal: ${revenue}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
