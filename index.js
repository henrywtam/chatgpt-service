import * as dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
    organization: process.env.ORG_ID,
    apiKey: process.env.CHATGPT_API_KEY,
})

const openai = new OpenAIApi(configuration);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { messages } = req.body;
    console.log(messages);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: 'You are a MagicGPT helpful assistant Magic: the Gathering chatbot' },
            ...messages
        ]
    })

    res.json({
        completion: completion.data.choices[0].message
    })
})

app.listen(process.env.PORT, () => {
    console.log(`ChatGPTService app listening at http://localhost:${process.env.PORT}`);
})