from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3


def search_contact(value_one, value_two, value_three):
    try:
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute("SELECT `Unnamed: 3`, `Unnamed: 4`, `Unnamed: 5` FROM data WHERE `Unnamed: 0` = ? AND `Unnamed: 1` = ? AND `Unnamed: 2` = ?", (value_one, value_two, value_three))
        results = cursor.fetchall()
        conn.close()
        
        if results:
            # Convertir chaque tuple en une chaîne de caractères et les joindre avec une virgule comme séparateur
            values = ', '.join([', '.join(map(str, row)) for row in results])
            print(values)
            return values
        else:
            return None
    except sqlite3.Error as e:
        print("Error searching contacts:", e)
        return None


def search_data(value_to_search):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT `Unnamed: 1` FROM data WHERE `Unnamed: 0` = ?", (value_to_search,))
    results = cursor.fetchall()
    conn.close()
    if results:
        unique_values = [result[0] for result in results]
        return unique_values
    else:
        return None


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.route("/api/update_data", methods=['PUT'])
def update_data():
    data = request.json
    print(data)
    if "region" in data.keys():
        with open("region.txt", "w") as file:
            file.write(data["region"])
    if "typeOfWork" in data.keys():
        register_trad = {"etudes_enrg":"ETUDES ENERGETIQUES" , "inst_enrg":"INSTALLATIONS D'ENERGIES RENOUVELABLES", "renov_global":"RENOVATION GLOBALE", "Trav_eff_enrg":"TRAVAUX D'EFFICACITE ENERGETIQUE"}
        data_to_write = register_trad[data["typeOfWork"]]
        with open("typeofworks.txt", "w") as file:
            file.write(data_to_write)
    
    if "Work" in data.keys():
        try:
            with open("work.txt", "w") as file:
                print(data["Work"])
                file.write(data["Work"])
            print("Data written to work.txt successfully.")
        except Exception as e:
            print("Error writing data to work.txt:", e)

    return jsonify({'message': 'Data updated successfully'})


@app.route("/api/get_data", methods=["GET"])
def get_data():
    try:
        with open("typeofworks.txt", "r") as file:
            value = file.readline().strip()  # Assurez-vous de retirer les espaces inutiles
            data = search_data(value)
            if data is not None:
                return jsonify({"data": data})
            else:
                return jsonify({"error": "Aucune donnée trouvée."}), 404
    except FileNotFoundError:
        print("c")
        return jsonify({"error": "Le fichier spécifié n'existe pas."}), 404
    except Exception as e:
        print("Erreur:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/get_answer", methods=["GET"])
def get_answer():
    with open("typeofworks.txt", "r") as file:
        value = file.readline().strip()  # Assurez-vous de retirer les espaces inutiles
    with open("work.txt", "r") as file:
        value_two = file.readline().strip()
    with open("region.txt", "r") as file:
        value_three = file.readline().strip()

    contact = search_contact(value_one=value, value_two=value_two, value_three=value_three)
    print(contact)
    return jsonify({"data":contact})

if __name__ == "__main__":
    app.run()



    