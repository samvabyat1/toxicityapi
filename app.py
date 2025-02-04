from fastapi import FastAPI
from pydantic import BaseModel
import subprocess
import json

app = FastAPI()

# Define request body
class TextInput(BaseModel):
    text: str

@app.post("/predict")
def predict(input: TextInput):
    # Call Node.js script to run TFJS toxicity model
    result = subprocess.run(["node", "toxicity.js", input.text], capture_output=True, text=True)
    return json.loads(result.stdout)

# Run the API with:
# uvicorn app:app --host 0.0.0.0 --port 8000
