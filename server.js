const express = require("express");
const toxicity = require("@tensorflow-models/toxicity");
const tf = require("@tensorflow/tfjs-node");

const app = express();
app.use(express.json());

const threshold = 0.9;

app.post("/predict", async (req, res) => {
    try {
        const text = req.body.text;
        if (!text) return res.status(400).json({ error: "Text is required" });

        const model = await toxicity.load(threshold);
        const predictions = await model.classify([text]);

        const result = {};
        predictions.forEach((p) => (result[p.label] = p.results[0].match));

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

// Start server locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
