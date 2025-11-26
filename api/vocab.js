export default async function handler(req, res) {
    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Donne-moi une liste de 100 mots de vocabulaire liés au sujet suivant : "${text}". Retourne seulement les mots, séparés par des virgules.`
                }
            ]
        })
    });

    const result = await response.json();

    res.status(200).json({
        result: result.choices?.[0]?.message?.content || "Erreur"
    });
}

