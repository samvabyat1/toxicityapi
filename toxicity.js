const toxicity = require('@tensorflow-models/toxicity');
const tf = require('@tensorflow/tfjs');

// Minimum confidence threshold
const threshold = 0.9;

// Get input text from Python script
const inputText = process.argv[2];

async function classifyText(text) {
    const model = await toxicity.load(threshold);
    const predictions = await model.classify([text]);

    const result = {};
    predictions.forEach(prediction => {
        result[prediction.label] = prediction.results[0].match;
    });

    console.log(JSON.stringify(result));
}

classifyText(inputText);
