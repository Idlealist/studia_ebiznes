from flask import Flask, render_template, request, jsonify
import requests

ollama_backend = "http://localhost:11434/api/generate"

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")

    response = requests.post(ollama_backend, json={
        "model": "mistral",
        "prompt": user_input,
        "stream": False
    })

    result = response.json()
    return jsonify({"response": result.get("response", "")})

if __name__ == "__main__":
    app.run(debug=True)
