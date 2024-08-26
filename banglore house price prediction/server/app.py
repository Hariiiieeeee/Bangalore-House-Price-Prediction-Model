from flask import Flask, request, jsonify, render_template
import util

app = Flask(__name__, template_folder="templates")

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get_location_names", methods=['GET'])
def get_location_names():
    response = jsonify({
        "locations": util.get_locations()
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    
    return response

@app.route("/predict_home_prices", methods=['GET', 'POST'])
def predict_home_prices():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price' : util.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add("Access-control-Allow-Origin", "*")

    return response

if __name__ == "__main__":
    print("Starting python server...")
    util.load_artifacts()
    app.run(debug=True)