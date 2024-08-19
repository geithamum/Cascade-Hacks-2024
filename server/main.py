import os

try:
    from flask import Flask, request
    from flask_cors import CORS
    import ollama
except ImportError as importError:
    print("Packages not found!")
    print("Installing now: ")
    os.system("pip install -r ./server/requirements.txt")
    from flask import Flask, request
    from flask_cors import CORS
    import ollama

app = Flask(__name__)
CORS(app)

llmModels = ["llama3.1", "gemma2"]


def setup():
    try:
        print("Downloading LLM Models")
        for i, model in enumerate(llmModels):
            print("Downloading " + model)
            ollama.pull(model)
    except Exception as e:
        print("ERROR during setup!")
        print(e)


setup()


@app.route("/generateText")
def generateText():
    try:
        prompt = request.args.get("prompt")
        model = request.args.get("model")
        response = ollama.generate(model=model, prompt=prompt)
        print(response["response"])
        return {"success": True, "data": response["response"]}
    except Exception as e:
        print(e)
        return {"success": False, "data": str(e)}


if __name__ == "__main__":
    app.run("0.0.0.0", 5000, False)
