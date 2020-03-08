import sqlite3

def get_all_materials():
    connection = sqlite3.connect("Infra/POCmf_DB.db")
    cursor = connection.cursor()    
    
    query = "SELECT * FROM materials"
    result = cursor.execute(query)
    materials = result.fetchall()
    
    connection.commit()
    connection.close()
    
    return materials
    
def get_material_by_id(Id):
    connection = sqlite3.connect("Infra/POCmf_DB.db")
    cursor = connection.cursor()    
    
    query = "SELECT * FROM materials WHERE id=?"
    result = cursor.execute(query, (Id,))
    material = result.fetchone()
    
    connection.commit()
    connection.close()
    
    return material