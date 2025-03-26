import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

// Criar o servidor Express
const app = express();

// Configurar o middleware para análise do corpo da requisição
app.use(express.json());

// Configurar CORS para permitir requisições do seu domínio
app.use(cors({
    origin: "*", // Permitir requisições apenas desse domínio
    methods: ["POST", "OPTIONS"], // Permitir métodos POST e OPTIONS
    allowedHeaders: ["Content-Type"], // Permitir apenas cabeçalhos necessários
}));

// Rota POST para enviar o e-mail
app.post("/api/enviar-email", async (req, res) => {
    const { name, email, phone, company, investment, revenue } = req.body;

    // Criar o transporte para enviar o e-mail
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "wmmarketing.contato@gmail.com", // Seu email
            pass: "uanvrdlcjhimtlad" // Senha de app do Gmail
        }
    });

    // Configurar as opções do e-mail
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
        // Enviar o e-mail
        await transporter.sendMail(mailOptions);
        // return res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor na porta 5000 (ou qualquer outra que você preferir)
app.listen(5000, () => {
    console.log("Servidor Express rodando na porta 5000");
});
