import nodemailer from "nodemailer";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Permitir requisições de qualquer origem
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Permitir métodos POST e OPTIONS
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Permitir apenas cabeçalhos necessários

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Responde ao preflight request
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { name, email, phone, company, investment, revenue } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "wmmarketing.contato@gmail.com",
            pass: "uanvrdlcjhimtlad" // Senha de app do Gmail
        }
    });

    const mailOptions = {
        from: email,
        to: "wmmarketing.contato@gmail.com",
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
