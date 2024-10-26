import { PlayCard } from "@/components";
import { Stack } from "@mui/material";

export default function PracticePage() {
  return (
    <Stack direction="column" spacing={2} width={"100%"} marginTop={4}>
      <Stack direction="row" spacing={2}>
        <PlayCard label="Card 1" />
        <PlayCard label="Card 1" selected />
      </Stack>
      <Stack direction="row" spacing={2}>
        <PlayCard label="Card 1" success />
        <PlayCard label="Card 1" error />
      </Stack>
      <Stack direction="row" spacing={2}>
        <PlayCard label="Card 1" completed />
        <PlayCard label="Card 1" />
      </Stack>
      <Stack direction="row" spacing={2}>
        <PlayCard label="Card 1" />
        <PlayCard label="Card 1" />
      </Stack>
      <Stack direction="row" spacing={2}>
        <PlayCard label="Card 1" />
        <PlayCard label="Card 1" />
      </Stack>
    </Stack>
  );
}
