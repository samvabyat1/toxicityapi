
# Text Toxicity Detection API

The toxicity model detects whether text contains toxic content such as threatening language, insults, obscenities, identity-based hate, or sexually explicit language.


## API Reference

#### Post content

```http
  POST https://toxicityapi.netlify.app/.netlify/functions/toxicity
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `text` | `string` | **Required**. Content text |



## Deployment

To deploy this project run

```bash
  curl -X 'POST' 'https://toxicityapi.netlify.app/.netlify/functions/toxicity' -H 'Content-Type: application/json' -d '{"text": "I hate you"}'

```

#### Response
```
{
  "identity_attack": true,
  "insult": true,
  "obscene": false,
  "severe_toxicity": false,
  "sexual_explicit": false,
  "threat": false,
  "toxicity": true
}
```
## Reference

[Tensorflow Toxicity Model](https://github.com/tensorflow/tfjs-models/tree/master/toxicity)

