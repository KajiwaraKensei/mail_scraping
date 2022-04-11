import * as sqlite from "util/sqlite3"

export const  GetTimeStamp =  async(type: string) => {
    const db = await sqlite.connect();
    const res =  sqlite.get(db, type);
    db.close();
    return res;
}