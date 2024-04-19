import pandas as pd
from sqlalchemy import create_engine
import pandas as pd

# Lire le fichier CSV en spécifiant l'encodage
df = pd.read_excel(r"C:\Users\Orefice\OneDrive\Bureau\IT\Hackaton\back-end\csv\BDD_VALIDE_HACKATHON.xlsx")

engine = create_engine('sqlite:///database.db', echo=True)  # Replace 'database.db' with your desired database name

# Step 3: Write data to SQLite using SQLAlchemy
df.to_sql('data', con=engine, if_exists='replace', index=False)  # Replace 'table_name' with your desired table name

# Optional Step 4: Close the SQLAlchemy engine (not necessary if you're not doing further operations)
engine.dispose()