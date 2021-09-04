import Readline from "readline";

/**
 * 指定秒待ちます
 * @module delay
 * @param {number} second - 待ちたい秒数
 */
export function delay(second: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1000);
  });
}

/**
 * キーボードからの入力
 * @module delay
 * @param {string} question コンソールに表示される文字
 * @returns {Promise<string>} 入力された文字
 */
export function readUserInput(question: string): Promise<string> {
  const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    readline.question(question, (answer: string) => {
      resolve(answer);
      readline.close();
    });
  });
}

export const loop = (count: number) => {
  return (callback: (value: number, index: number) => void): void => {
    [...Array<number>(count)].map(callback);
  };
};
