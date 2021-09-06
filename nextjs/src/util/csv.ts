import fs from "fs";

import parse from "csv-parse";
import stringify from "csv-stringify";

/**
 * csv保存
 * @module saveCSV
 * @param saveData 保存データ
 * @param fileName 保存ファイル名
 */
export function saveCSV(saveData: string[][], fileName: string) {
  return new Promise<void>((resolve, reject) => {
    stringify(saveData, (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      saveFile(fileName, data).then(resolve).catch(reject);
      console.log("saved!");

      return;
    });
  });
}

/**
 * csvロード
 * @module LoadCSV
 * @param fileName 読み込むファイル名
 * @param option オプション
 * @returns csvを２次元配列に変換したデータ
 */
export function LoadCSV(fileName: string, option?: parse.Options) {
  return new Promise<string[][]>((resolve, reject) => {
    const stream = fs.createReadStream(fileName);
    stream.on("error", reject);
    stream.pipe(
      parse(
        {
          from_line: 1,
          ...option,
        },
        (error, data) => {
          console.log("reading");

          if (error) {
            reject(error);
            return;
          }
          resolve(data);
        }
      )
    );
  });
}

/**
 * ファイル保存
 * @module delay
 * @param fileName 保存するファイル名
 * @param data 保存データ
 */
export function saveFile(
  fileName: string,
  data: string | NodeJS.ArrayBufferView
) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(fileName, data, (error) => {
      error ? reject(error) : resolve();
      return;
    });
  });
}
