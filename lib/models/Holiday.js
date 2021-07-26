import pool from "../utils/pool";

export default class Holiday {
  id;
  country;
  lang;
  capital;

  constructor(row) {
    this.id = row.id;
    this.country = row.country;
    this.lang = row.lang;
    this.capital = row.capital;
  }

  static async insert({ country, lang, capital }) {
    const { rows } = await pool.query('INSERT INTO holidays (country, lang, capital) VALUES ($1, $2, $3) RETURNING *', [country, lang, capital]
    );

    return new Holiday(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM holidays WHERE id=$1', [id]);

    return new Holiday(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM holidays');

    return rows.map((row) => new Holiday(row));
  }

  static async updateById(id, { country, lang, capital }) {
    const existingHoliday = await Holiday.getById(id);

    const newCountry = country ?? existingHoliday.country;
    const newLang = lang ?? existingHoliday.lang;
    const newCapital = capital ?? existingHoliday.capital;

    const { rows } = await pool.query('UPDATE holidays SET country=$1, lang=$2, capital=$3 WHERE id=$4 RETURNING *', [newCountry, newLang, newCapital, id]
    );

    return new Holiday(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM holidays WHERE id=$1 RETURNING *', [id]);

    return new Holiday(rows[0]);
  }

}
