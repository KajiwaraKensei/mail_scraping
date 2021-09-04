import parse from "csv-parse";
import stringify from "csv-stringify";
import fs from "fs";

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

      return;
    });
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
