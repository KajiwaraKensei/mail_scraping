import * as sqlite from "util/sqlite3"

export const SetTimeStamp = (type: string) => async (id: string) => {
    const db = await sqlite.connect();
    sqlite.update(db, id, type);
    db.close();
}