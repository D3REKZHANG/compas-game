from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

DATABASE = "compas.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/test", methods=["GET"])
def test():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    rows = cursor.fetchall()
    conn.close()

    data = [dict(row) for row in rows]

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
