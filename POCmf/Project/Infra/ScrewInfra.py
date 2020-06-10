import sqlite3

def getAllScrewsPatterns():
    connection = sqlite3.connect("Project/Infra/POCmf_DB.db")
    cursor = connection.cursor()    
    
    query = "SELECT * FROM screwsPatterns"
    result = cursor.execute(query)
    screwsPatterms = result.fetchall()
    
    connection.commit()
    connection.close()
    
    return screwsPatterms