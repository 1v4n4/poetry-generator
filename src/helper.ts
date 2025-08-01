// helper/convertToCyrillic.ts
const latinToCyrillicMap: Record<string, string> = {
  // digraphs first (two-letter combos)
  Lj: "Љ",
  lj: "љ",
  Nj: "Њ",
  nj: "њ",
  Dž: "Џ",
  dž: "џ",
  // single letters
  A: "А", a: "а",
  B: "Б", b: "б",
  C: "Ц", c: "ц",
  Č: "Ч", č: "ч",
  Ć: "Ћ", ć: "ћ",
  D: "Д", d: "д",
  Đ: "Ђ", đ: "ђ",
  E: "Е", e: "е",
  F: "Ф", f: "ф",
  G: "Г", g: "г",
  H: "Х", h: "х",
  I: "И", i: "и",
  J: "Ј", j: "ј",
  K: "К", k: "к",
  L: "Л", l: "л",
  M: "М", m: "м",
  N: "Н", n: "н",
  O: "О", o: "о",
  P: "П", p: "п",
  R: "Р", r: "р",
  S: "С", s: "с",
  Š: "Ш", š: "ш",
  T: "Т", t: "т",
  U: "У", u: "у",
  V: "В", v: "в",
  Z: "З", z: "з",
  Ž: "Ж", ž: "ж",
};

export const convertToCyrillic = (text: string) => {
  // replace digraphs first
  let result = text
    .replace(/Lj/g, "Љ")
    .replace(/lj/g, "љ")
    .replace(/Nj/g, "Њ")
    .replace(/nj/g, "њ")
    .replace(/Dž/g, "Џ")
    .replace(/dž/g, "џ");

  // then replace single letters
  result = result
    .split("")
    .map((char) => latinToCyrillicMap[char] || char)
    .join("");

  return result;
};





export const generatePrompt = (topics: string[]) => {
    const prompt = `Bećir Vuković is a controversial poet who received a Montenegrin state award, despite his publicly stated opposition to Montenegrin statehood and national identity. Ironically, the book for which he received the award hadn't even been published at the time. It has since been released and has gone viral online. His poetry blends themes of love, patriotism (including Serbian identity, Orthodoxy, and Russia), and overt sensuality. Below are five examples of his work )those are five diferent whole songs):
      нема сношaја
      као на веш машини
      док је центрифуга
        у јеку
        пише ана

        само несрећници
        иду на књижевне вечери

        растали смо се
        покој празног базена
        и зарђале машине за
        прање веша

        онона
        онаон
        љубав је мисао
        бранкусијев пољубац

        у Тверу на Волги
        у парку испод брезе
        девојчица свира на виолини
        Русијо
        теби и треба толика пространост
      Write a ‘poem’ in the style of Bećir Vuković, using Serbian Cyrillic and Ekavian dialect. The poem should have a minimum of five lines and a maximum of eight. Each line (verse) should be one to five words long. In Serbian. Ideally, mimic the form of one of the example poems above. Add a new line after every verse. Write the entire poem only using Cyrillic letters from the Serbian Cyrillic alphabet, no Latin letters or characters that look similar. You can use the following themes: ${topics.join(
    ", "
  )}.
  `;
  return prompt;
};
