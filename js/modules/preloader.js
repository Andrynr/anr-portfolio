import { majPhrases, startTypewriter } from "./animations/typewriter.js";
import particleAnime from "./animations/particleAnime.js";

particleAnime();

export const initLoading = () => {
  const greeting = async () => {
    /* Animation écriture au clavier */
    const phrases = [
      "Hello wo... 🤭",
      "Hello, visitor! 😌",
      "Mes salutations !",
      " Salama tompoko !",
    ];

    majPhrases(phrases);
    startTypewriter("greeting");
  };
  greeting();
};
