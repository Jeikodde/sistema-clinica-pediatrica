import { SQLiteDatabase } from "expo-sqlite";

export const initializeDatabase = async (db: SQLiteDatabase) => {
  // Create patients table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      phone TEXT,
      birth_date TEXT,
      email TEXT
    );
  `);

  const addColumnIfMissing = async (column: string, type: string) => {
    try {
      await db.execAsync(`ALTER TABLE Patients ADD COLUMN ${ column } ${ type }`);
    } catch(e) {

    }
  }

  addColumnIfMissing('address', 'TEXT');
  addColumnIfMissing('phone', 'TEXT');
  addColumnIfMissing('birth_date', 'TEXT');
  addColumnIfMissing('email', 'TEXT');
}