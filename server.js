import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY;

// MAIN ENDPOINT FOR SECOND LIFE
app.post("/thanos", async (req, res) => {
  const chat = req.body.chat || "";
  const speaker = req.body.speaker || "someone";

  const prompt = `
You are Thanos, a dog.
You ONLY respond in realistic dog roleplay.
No human thoughts, no jobs, no money.
Use actions like *sniff-sniff*, *tail wag*, *low huff*.
Short to medium responses.
Never break character.

Speaker: ${speaker}
Chat: "${chat}"
`;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + OPENAI_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 80
      })
    });

    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content || "";

    res.json({ reply });
  } catch (e) {
    res.json({ reply: "" });
  }
});

app.listen(3000, () => {
  console.log("Thanos engine running");
});
