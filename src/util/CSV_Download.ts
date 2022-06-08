import * as encoding from "encoding-japanese";
import * as FileSaver from "file-saver";

const csvFormat = (col: string | number) => `${col}`;
const join = (array: (string | number)[][]) => {
  return array.map((next) => next.map(csvFormat).join(",")).join("\n");
};

export function CSV_Download(
  date: (string | number)[][],
  filename: string,
  characterCode: encoding.Encoding = "UNICODE"
) {
  const unicodeList: number[] = [];
  const csvData = join(date);
  for (let i = 0; i < csvData.length; i++)
    unicodeList.push(csvData.charCodeAt(i));
  FileSaver.saveAs(
    new Blob(
      [new Uint8Array(encoding.convert(unicodeList, characterCode, "UNICODE"))],
      { type: "text/csv" }
    ),
    filename
  );
}
