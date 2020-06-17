import sqlite3

def getAllScrewsPatterns():
    connection = sqlite3.connect("Project/Infra/POCmf_DB.db")
    cursor = connection.cursor()    
    
    query = "SELECT * FROM metricScrewPatterns"
    result = cursor.execute(query)
    screwsPatterms = result.fetchall()
    
    connection.commit()
    connection.close()
    
    return screwsPatterms

def getScrewsPatternsByDiameter(internalDiameter, externalDiameter):
    connection = sqlite3.connect("Project/Infra/POCmf_DB.db")
    cursor = connection.cursor()    
    
    query = "SELECT * FROM metricScrewPatterns WHERE MaxMajorDiameter < ? AND MinMinorDiameter > ?"
    result = cursor.execute(query, (externalDiameter, internalDiameter))
    screwsPatterms = result.fetchall()
    
    connection.commit()
    connection.close()
    
    return screwsPatterms