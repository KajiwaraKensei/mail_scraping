import sqlite3 from "sqlite3";

type LogRow = {
  id: string;
  date: string;
};

// 接続
export const connect = async (): Promise<sqlite3.Database> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./update.db");
    return db.run(
      "create table if not exists log(id TEXT, type TEXT, date TIMESTAMP, primary key(id, type))",
      (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(db);
        return;
      }
    );
  });
};

// レコード取得
export const all = (db: sqlite3.Database): Promise<LogRow[]> => {
    return new Promise((resolve) => {
      db.all("SELECT * FROM log ORDER BY date", (err, row) => {
        if (err) {
          console.error("SELECT エラー");
          throw err;
        }
  
        resolve(row || []);
        return;
      });
    });
  };
  // レコード取得
  export const get = (db: sqlite3.Database, type: string): Promise<LogRow[]> => {
    return new Promise((resolve) => {
      db.all(`SELECT * FROM log WHERE TYPE = ${type} ORDER BY date`, (err, row) => {
        if (err) {
          console.error("SELECT エラー");
          throw err;
        }
  
        resolve(row || []);
        return;
      });
    });
  };

// レコード更新
export const update = (db: sqlite3.Database, id: string, type: string): void => {
  db.run(
    "replace into log(id,date,type) values(?, ?, ?)",
    id,
    new Date().toLocaleString(),
    type
  );
  return;
};
