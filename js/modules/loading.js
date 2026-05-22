import { majPhrases, startTypewriter } from "./typewriter.js";
import particleAnime from "./particleAnime.js";

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
