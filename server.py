from flask import Flask,render_template,request
import json
 
app=Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_player_data', methods=['POST'])
def fetch_player_data():
    
    name = request.json.get('name')
    save_path="data/player_db.json"
    # save_path="data/player_db.txt"
    print("Name got from client",name)
    try:
        with open(save_path, 'w') as file:
            file.write(name)
            file.close()
            data = {"message": f"Player data for {name} saved successfully."}
            return data
        # return data
    except Exception as e:
        print("Error saving player data:", e)
        return {"error": "Player data not saved"}, 404


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000) 