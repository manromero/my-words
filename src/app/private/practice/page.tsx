import { PlayCard } from "@/components";
import { Stack } from "@mui/material";

const game = {
  words: [
    {
      word: "Cat",
      translation: "Gato",
    },
    {
      word: "Home",
      translation: "Casa",
    },
    {
      word: "Dog",
      translation: "Perro",
    },
    {
      word: "Computer",
      translation: "Ordenador",
    },
    {
      word: "Girl",
      translation: "Niña",
    },
  ],
};

const suffleArray = (array: string[]) => {
  return array.sort((_a, _b) => 0.5 - Math.random());
};

const getSuffledWords = () => {
  return suffleArray(game.words.map((word) => word.word));
};

const getSuffledTranslations = () => {
  return suffleArray(game.words.map((word) => word.translation));
};

export default function PracticePage() {
  const suffledWords = getSuffledWords();
  const suffledTranslations = getSuffledTranslations();

  return (
    <Stack direction="column" spacing={2} width={"100%"} marginTop={4}>
      {suffledWords.map((suffledWord, index) => (
        <Stack direction="row" spacing={2} key={suffledWord}>
          <PlayCard label={suffledWord} />
          <PlayCard label={suffledTranslations[index]} />
        </Stack>
      ))}
    </Stack>
  );
}
