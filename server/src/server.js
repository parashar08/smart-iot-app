import express from 'express';
import { chatLLM } from './chatLLM/chatLLM.js';

const app = express();

app.use(express.json());

app.get('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await chatLLM(message);

        return res.status(200).json({ message: response });
    } catch (error) {
        console.log("Error in /chat route", error);
        return res.status(500).json({ message: `error happen in /chat route! & ${error.message}`})
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})