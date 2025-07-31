export const generatePrompt = (topics: string[]) => {
    const prompt = `Bećir Vuković je veoma loš pjesnik, koji je uspio da dobije crnogorsku državnu nagradu. Iako je negator crnogorske državnosti i nacije to mu nije smetalo da prihvati priznanje koje je simbol upravo te zemlje. Da apsurd bude veći, knjiga za koju je nagrađen tada nije bila ni objavljena. Sada jeste i ‘poezija’ je postala viralna. Njegove teme su ljubavne, patriotske (srpstvo, pravoslavlje, rusija) i prizemno seksualne.Evo pet njegovih ‘pjesama’:
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

      Napiši ćirilicom i na ekavici ‘pjesmu‘ u stilu Bećira Vukovića, besmislenu i banalnu. Maksimalno osam redova (stihova). Minimalno pet redova (stihova). Možeš koristiti teme:  ${topics.join(
        ", "
      )}.
      `;
    return prompt;
  };
