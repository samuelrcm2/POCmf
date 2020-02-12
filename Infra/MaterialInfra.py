import sqlite3

def get_all_materials():
    connection = sqlite3.connect("POCmf/Infra/POCmf_DB.db")
    cursor = connection.cursor()    
    
    query = "SELECT * FROM materials"
    result = cursor.execute(query)
    materials = result.fetchall()
    
    connection.commit()
    connection.close()
    
    return materials
    
get_all_materials()