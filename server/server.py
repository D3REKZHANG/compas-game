from flask import Flask, jsonify
import sqlite3, random

app = Flask(__name__)

DATABASE = "compas.db"

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/", methods=["GET"])
def test():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    rows = cursor.fetchall()
    conn.close()

    data = [dict(row) for row in rows]

    return jsonify(data)

PEOPLE_COUNT = 11757

@app.route("/random-case", methods=["GET"])
def random_case():
    conn = get_db_connection()
    cursor = conn.cursor()

    while True:
        person_id = random.randint(1, PEOPLE_COUNT)

        cursor.execute("SELECT * FROM people WHERE id=?;", (person_id,))
        person = cursor.fetchall()
        if len(person) != 1:
            print(f'people query returned 0 or more than 1 row for id {person_id}')
            continue
        person = dict(zip([desc[0] for desc in cursor.description], person[0]))


        cursor.execute("SELECT in_custody, out_custody FROM jailhistory WHERE person_id=?;", (person_id,))
        jailhistory = [dict(zip([desc[0] for desc in cursor.description], row)) for row in cursor.fetchall()]

        cursor.execute("SELECT in_custody, out_custody FROM prisonhistory WHERE person_id=?;", (person_id,))
        prisonhistory = [dict(zip([desc[0] for desc in cursor.description], row)) for row in cursor.fetchall()]

        cursor.execute("SELECT offense_date, charge_number, charge_degree, charge FROM charge WHERE person_id=?;", (person_id,))
        previous_charges = [dict(zip([desc[0] for desc in cursor.description], row)) for row in cursor.fetchall()]

        # cursor.execute("SELECT arrest_date, charge_degree FROM casearrest WHERE person_id=?;", (person_id,))
        # current_case = cursor.fetchall()
        # if len(current_case) != 1:
        #     print(f'casearrest query returned {len(current_case)} rows for id {person_id}')
        #     continue
        # current_case = dict(zip([desc[0] for desc in cursor.description], current_case[0]))

        cursor.execute("SELECT screening_date, type_of_assessment, decile_score, raw_score, assessment_reason, rec_supervision_level_text FROM compas WHERE person_id=?;", (person_id,))
        compas = [dict(zip([desc[0] for desc in cursor.description], row)) for row in cursor.fetchall()]

        break

    conn.close()

    data = {
        "demographics": {x: person[x] for x in ['name', 'age', 'sex', 'race', ] },
        **{x : person[x] for x in ['is_recid', 'is_violent_recid']},
        "compas": compas,
        "jailhistory": jailhistory,
        "prisonhistory": prisonhistory,
        "previous_charges": previous_charges
    }

    if data["is_recid"]:
        data["recid_info"] = {
            x: person[x] for x in [
                'num_r_cases', 'r_case_number', 'r_charge_degree', 'r_days_from_arrest',
                'r_offense_date', 'r_charge_desc', 'r_jail_in', 'r_jail_out'
            ]
        }

    if data["is_violent_recid"]:
        data["violent_recid_info"] = {
            x: person[x] for x in ['num_vr_cases', 'vr_case_number', 'vr_charge_degree', 'vr_offense_date', 'vr_charge_desc']
        }

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
