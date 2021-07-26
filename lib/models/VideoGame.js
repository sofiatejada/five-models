import pool from "../utils/pool";

export default class VideoGame {
  id;
  name;
  genre;
  rating;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.genre = row.genre;
    this.rating = row.rating;
  }

  static async insert({ name, genre, rating }) {
    const { rows } = await pool.query('INSERT INTO videogames (name, genre, rating) VALUES ($1, $2, $3) RETURNING *', [name, genre, rating]
    );

    return new VideoGame(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM videogames WHERE id=$1', [id]);

    return new VideoGame(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM videogames');

    return rows.map((row) => new VideoGame(row));
  }

  static async updateById(id, { name, genre, rating }) {
    const existingVideoGame = await VideoGame.getById(id);

    const newName = name ?? existingVideoGame.name;
    const newGenre = genre ?? existingVideoGame.genre;
    const newRating = rating ?? existingVideoGame.rating;

    const { rows } = await pool.query('UPDATE videogames SET name=$1, genre=$2, rating=$3 WHERE id=$4 RETURNING *', [newName, newGenre, newRating, id]
    );

    return new VideoGame(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM videogames WHERE id=$1 RETURNING *', [id]);

    return new VideoGame(rows[0]);
  }
}
