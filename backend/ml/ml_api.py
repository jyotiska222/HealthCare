from flask import Flask, request, jsonify
import pickle
import pandas as pd
from datetime import datetime
from sklearn.preprocessing import OneHotEncoder

app = Flask(__name__)

# Load trained model
model = "./ml/model.pkl", 
model_filename = "./test_model/dr_recommendation_model.pkl"
try:
    with open(model_filename, "rb") as file:
        model_data = pickle.load(file)
        model = model_data["model"]
        encoder = model_data["encoder"]
    print("✅ Model loaded successfully!")
except FileNotFoundError:
    print(f"❌ Error: Model file '{model_filename}' not found.")
    exit()

def predict_doctor(doctor_specialization, symptoms, patient_age, previous_appointments):
    # Prepare input data as a DataFrame
    input_df = pd.DataFrame([[doctor_specialization, symptoms, patient_age, previous_appointments]],
                            columns=["doctor_specialization", "symptoms", "patient_age", "previous_appointments"])
    
    # Encode categorical features
    input_encoded = encoder.transform(input_df)

    # Make prediction
    predicted_doctor = model.predict(input_encoded)
    
    return predicted_doctor[0]

# Flask route to recommend doctor
@app.route('/recommend_doctor/', methods=['POST'])
def recommend_doctor():
    try:
        # Get input JSON data
        data = request.get_json()

        # Extract values from request data
        doctor_specialization = data['doctor_specialization']
        symptoms = data['symptoms']
        patient_age = data['patient_age']
        previous_appointments = data['previous_appointments']

        # Get the doctor recommendation
        recommended_doctor = predict_doctor(
            doctor_specialization, symptoms, patient_age, previous_appointments
        )

        # Return the recommendation as JSON
        return jsonify({"recommended_doctor": recommended_doctor})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/predict', methods=['GET'])
def predict_demand():
    # Get today's date features
    today = datetime.today()
    input_features = pd.DataFrame([[today.day, today.month, today.year]], columns=["day", "month", "year"])
    
    # Predict demand
    prediction = model.predict(input_features)[0]
    
    return jsonify({"predicted_demand": int(prediction)})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
