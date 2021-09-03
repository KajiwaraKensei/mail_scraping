import { createInterface } from "readline";

/**
 * 指定秒待ちます
 * @module delay
 * @param {number} second - 待ちたい秒数
 */
export function delay(second: number) {
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
export function readUserInput(question: string) {
  const readline = require("readline").createInterface({
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
