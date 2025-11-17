from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


COMMENTS_DB = {
    "1001": [
        {"id": "1", "text": "Nice!"},
        {"id": "2", "text": "This is a longer comment that should be red flagged"},
        {"id": "3", "text": "Ok"},
        {"id": "4", "text": "Amazing!"},
        {"id": "5", "text": "This comment is definitely longer than ten characters"},
        {"id": "6", "text": "Good"},
        {"id": "7", "text": "Another long red flagged comment for testing"},
    ]
}

def classify_comment(text):
    return "red" if len(text.strip()) > 10 else "green"

@app.route("/api/fetch_comments")
def fetch_comments():
    tweet_id = request.args.get("tweet_id")
    comments = COMMENTS_DB.get(tweet_id, [])
    red, green = [], []
    for c in comments:
        if classify_comment(c["text"]) == "red":
            red.append(c)
        else:
            green.append(c)
    return jsonify({"red": red, "green": green})

@app.route("/api/hide_red_flags", methods=["POST"])
def hide_red_flags():
    data = request.get_json() or {}
    ids = data.get("ids", [])
    return jsonify({"hidden_count": len(ids), "hidden_ids": ids, "status": "simulated"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
