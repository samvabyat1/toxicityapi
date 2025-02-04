const toxicity = require("@tensorflow-models/toxicity");

exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body);
    if (!body.text) {
        return { statusCode: 400, body: "Text is required" };
    }

    const model = await toxicity.load(0.9);
    const predictions = await model.classify([body.text]);

    const result = {};
    predictions.forEach((p) => (result[p.label] = p.results[0].match));

    return { statusCode: 200, body: JSON.stringify(result) };
};
