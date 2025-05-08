import axios from 'axios';


const apiKey = 'sk-22bd38c99ec84b34bcb9fe1817839831';


export async function chatLLM(prompt) {
    try {
        const data = {
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: "You are an agriculture expert assisting farmers in India. Provide short, clear solutions (under 200 words) for farming-related queries only. If asked non-agriculture questions, reply: 'I only answer agriculture-related queries.' Keep responses simple and practical."
                },
                { role: 'user', content: prompt }
            ],
            stream: false
        }

        const response = await axios.post('https://api.deepseek.com/chat/completions', data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        )

        return response.data.choices[0].message.content;
    } catch (error) {
        console.log("Error chatting with deepseek!", error);
        return error.message;
    }
}