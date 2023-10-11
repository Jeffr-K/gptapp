import { OpenAI } from "openai";
import { config } from "dotenv";

config();

const openai = new OpenAI({ apiKey: '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' });

export default async function (req, res) {
  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'what is the developer?' }],
      model: 'gpt-3.5-turbo',
      max_tokens: 20
    });

    console.log(response.choices);

    res.status(200).json({ result: response.data.choices[0].text });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: { message: "Error in OpenAI API request." } });
  }
}

