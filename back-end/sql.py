import sqlite3




def search_data(value_to_search):
    conn = sqlite3.connect('back-end\\database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT `Unnamed: 1` FROM data WHERE `Unnamed: 0` = ?", (value_to_search,))
    results = cursor.fetchall()
    conn.close()
    if results:
        unique_values = [result[0] for result in results]
        return unique_values
    else:
        return None

def search_contact(value_one, value_two, value_three):
    try:
        conn = sqlite3.connect('back-end\\database.db')
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

def get_answer():
    with open("typeofworks.txt", "r") as file:
        value = file.readline().strip()  # Assurez-vous de retirer les espaces inutiles
    with open("work.txt", "r") as file:
        value_two = file.readline().strip()
    with open("region.txt", "r") as file:
        value_three = file.readline().strip()



with open("typeofworks.txt", "r") as file:
        value = file.readline().strip()  # Assurez-vous de retirer les espaces inutiles
with open("work.txt", "r") as file:
        value_two = file.readline().strip()
with open("region.txt", "r") as file:
        value_three = file.readline().strip()

contact = search_contact(value_one="RENOVATION GLOBALE", value_two="Etude thermique réglementaire", value_three="Champagne")
print(contact)