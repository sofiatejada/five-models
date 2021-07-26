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

    return new Pokemon(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM pokemon WHERE id=$1', [id]);

    return new Pokemon(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM pokemon');

    return rows.map((row) => new Pokemon(row));
  }

  static async updateById(id, { name, type1, type2, hiddenAb }) {
    const existingPokemon = await Pokemon.getById(id);
    // question marks ask if it's null or undefined, while || only checks if it's falsy
    const newName = name ?? existingPokemon.name;
    const newType1 = type1 ?? existingPokemon.type1;
    const newType2 = type2 ?? existingPokemon.type2;
    const newHiddenAb = hiddenAb ?? existingPokemon.hiddenAb;

    const { rows } = await pool.query('UPDATE pokemon SET name=$1, type1=$2, type2=$3, hidden_ab=$4 WHERE id=$5 RETURNING *', [newName, newType1, newType2, newHiddenAb, id]
    );

    return new Pokemon(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM pokemon WHERE id=$1 RETURNING *', [id]);

    return new Pokemon(rows[0]);
  }
}
