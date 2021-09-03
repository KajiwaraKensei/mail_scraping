import nightmare from "nightmare";

export async function searchMap(word: string) {
  try {
    const n = new nightmare({ show: true });

    await n
      .goto("https://www.google.co.jp/maps/@34.7014664,135.2089037,14z?hl=ja")
      .type("input[id=searchboxinput]", word)
      .click("#searchbox-searchbutton")
      .wait(3000)
      .evaluate(function () {
        return;
      });
    n.halt("", () => {});
  } catch (e) {
    console.error(e);
  }
}
