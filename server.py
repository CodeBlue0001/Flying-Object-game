from flask import Flask,render_template,request
 
app=Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_player_data', methods=['GET'])
def fetch_player_data():
    name=request.args.get('name')
    # saveing player data to a file as JSON
    save_path="data/player_db.json"
    try:
        with open(save_path, 'r') as file:
            data = file.read()
        return data
    except FileNotFoundError:
        return {"error": "Player data not found"}, 404


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000) 