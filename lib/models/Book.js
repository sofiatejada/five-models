import pool from "../utils/pool";

export default class Book {
  id;
  name;
  author;
  genre;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.author = row.author;
    this.genre = row.genre;
  }

  static async insert({ name, author, genre }) {
    const { rows } = await pool.query('INSERT INTO books (name, author, genre) VALUES ($1, $2, $3) RETURNING *', [name, author, genre]
    );

    return new Book(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);

    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');

    return rows.map((row) => new Book(row));
  }

  static async updateById(id, { name, author, genre }) {
    const existingBook = await Book.getById(id);

    const newName = name ?? existingBook.name;
    const newAuthor = author ?? existingBook.author;
    const newGenre = genre ?? existingBook.genre;

    const { rows } = await pool.query('UPDATE books SET name=$1, author=$2, genre=$3 WHERE id=$4 RETURNING *', [newName, newAuthor, newGenre, id]
    );

    return new Book(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM books WHERE id=$1 RETURNING *', [id]);

    return new Book(rows[0]);
  }
}

