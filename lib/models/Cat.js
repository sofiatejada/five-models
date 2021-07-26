import pool from "../utils/pool";

export default class Cat {
  id;
  name;
  age;
  breed;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.breed = row.breed;
  }

  static async insert({ name, age, breed }) {
    const { rows } = await pool.query('INSERT INTO cats (name, age, breed) VALUES ($1, $2, $3) RETURNING *', [name, age, breed]
    );

    return new Cat(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1', [id]);

    return new Cat(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cats');

    return rows.map((row) => new Cat(row));
  }

  static async updateById(id, { name, age, breed }) {
    const existingCat = await Cat.getById(id);

    const newName = name ?? existingCat.name;
    const newAge = age ?? existingCat.age;
    const newBreed = breed ?? existingCat.breed;

    const { rows } = await pool.query('UPDATE cats SET name=$1, age=$2, breed=$3 WHERE id=$4 RETURNING *', [newName, newAge, newBreed, id]
    );

    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM cats WHERE id=$1 RETURNING *', [id]);

    return new Cat(rows[0]);
  }
}
