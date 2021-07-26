import pool from "../utils/pool";

export default class Pokemon {
  id;
  name;
  type1;
  type2;
  hiddenAb;

  constructor(row) {
    // {id: '1', name: 'something', ...
    this.id = row.id;
    this.name = row.name;
    this.type1 = row.type1;
    this.type2 = row.type2;
    this.hiddenAb = row.hidden_ab;
  }

  // we don't have a dog yet, so that's why we're using a static method
  static async insert({ name, type1, type2, hiddenAb }) {
    const { rows } = await pool.query(
      'INSERT INTO pokemon (name, type1, type2, hidden_ab) VALUES ($1, $2, $3, $4)RETURNING *', [name, type1, type2, hiddenAb]
    );

    return new Pokemon(rows[0])
  }

  
}
