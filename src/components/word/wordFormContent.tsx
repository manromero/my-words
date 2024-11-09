"use client";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useData, useNotifications, useTranslate } from "@/hooks";
import {
  FormikErrors,
  FormikHandlers,
  FormikHelpers,
  FormikTouched,
} from "formik";

import { WordType } from "@/types";

type WordFormContentType = {
  errors: FormikErrors<WordType>;
  touched: FormikTouched<WordType>;
  values: WordType;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  setFieldValue: FormikHelpers<WordType>["setFieldValue"];
};

export const WordFormContent = ({
  errors,
  touched,
  values,
  onChange,
  onBlur,
  setFieldValue,
}: WordFormContentType) => {
  const { tags } = useData();

  const { translate, loading: loadingTranslate } = useTranslate();
  const { pusblishNotification } = useNotifications();

  const handleTranslate = async ({
    text,
    setFieldValue,
  }: {
    text?: string;
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void;
  }) => {
    if (!text) {
      return;
    }
    try {
      const translation = await translate(text);
      if (translation) {
        setFieldValue("translation", translation);
        pusblishNotification({
          severity: "success",
          message: "Translation generated",
        });
      }
    } catch (e) {
      pusblishNotification({
        severity: "error",
        message: "Unexpected error when translating",
      });
    }
  };

  const wordError = Boolean(errors.word && touched.word && errors.word);
  const translationError = Boolean(
    errors.translation && touched.translation && errors.translation
  );
  const notesError = Boolean(errors.notes && touched.notes && errors.notes);

  return (
    <Stack
      direction="column"
      flexGrow={1}
      overflow="auto"
      gap={2}
      paddingTop={2}
      paddingBottom={2}
    >
      <FormControl>
        <TextField
          fullWidth
          name="word"
          label="Word or concept"
          variant="outlined"
          helperText={
            wordError
              ? errors.word
              : "Insert here the word or concept to translate"
          }
          error={wordError}
          value={values.word}
          onChange={onChange}
          onBlur={onBlur}
        />
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="input-word-translation" error={translationError}>
          Translation
        </InputLabel>
        <OutlinedInput
          fullWidth
          label="Translation:"
          id="input-word-translation"
          name="translation"
          error={translationError}
          value={values.translation}
          onChange={onChange}
          onBlur={onBlur}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                color="primary"
                aria-label="Click here to autogenerate a translation"
                onClick={() =>
                  handleTranslate({
                    text: values.word,
                    setFieldValue,
                  })
                }
                disabled={!values.word || loadingTranslate}
              >
                <AutoFixHighIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error={translationError}>
          {translationError
            ? errors.translation
            : "Insert here the tranalation associated to the word or click in the magic wand"}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Notes"
          variant="outlined"
          helperText={notesError ? errors.notes : "Insert here help notes"}
          name="notes"
          error={notesError}
          value={values.notes}
          onChange={onChange}
          onBlur={onBlur}
        />
      </FormControl>
      <FormControl fullWidth component="fieldset" variant="outlined">
        <FormLabel component="legend">Tags</FormLabel>
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          {tags.data.map((tag) => (
            <FormControlLabel
              key={tag.label}
              control={<Checkbox />}
              label={<Chip label={tag.label} color={tag.color as any} />}
              name="tags"
              value={tag.id}
              onChange={onChange}
              checked={values.tags?.includes(tag.id as string)}
            />
          ))}
        </FormGroup>
        <FormHelperText>Select one or more tags</FormHelperText>
      </FormControl>
    </Stack>
  );
};
