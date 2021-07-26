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

}
