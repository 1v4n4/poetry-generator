export const generatePrompt = (topics: string[]) => {
    const prompt = `Bećir Vuković is a controversial poet who received a Montenegrin state award, despite his publicly stated opposition to Montenegrin statehood and national identity. Ironically, the book for which he received the award hadn't even been published at the time. It has since been released and has gone viral online. His poetry blends themes of love, patriotism (including Serbian identity, Orthodoxy, and Russia), and overt sensuality. Below are five examples of his work:
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
      Write a ‘poem’ in the style of Bećir Vuković, using Serbian Cyrillic and Ekavian dialect. The poem should have **a minimum of five lines and a maximum of eight**. Each line (verse) should be no more than **six words long**. In Serbian. Ideally, mimic the form of one of the example poems above. Add a new line after every verse. You can use the following themes: ${topics.join(
    ", "
  )}.
  `;
  return prompt;
};
