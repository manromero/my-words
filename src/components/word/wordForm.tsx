"use client";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Alert,
  AlertColor,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Snackbar,
} from "@mui/material";
import { useAuth, useData, useWord } from "@/hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { WordType } from "@/types";

type WordFormType = {
  word?: WordType;
};

const defaultWord: WordType = {
  word: "",
  translation: "",
  notes: "",
  tags: [],
};

export const WordForm = ({ word = defaultWord }: WordFormType) => {
  const { tags } = useData();
  const { user } = useAuth();
  const { createWord, updateWord } = useWord();
  const [snackbar, setSnackbar] = useState<
    | {
        severity: AlertColor;
        message: string;
      }
    | undefined
  >();

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(undefined);
  };

  return (
    <Formik
      initialValues={word}
      validationSchema={Yup.object({
        word: Yup.string()
          .max(100, "Must be 50 characters or less")
          .required("Required"),
        translation: Yup.string().max(100, "Must be 100 characters or less"),
        notes: Yup.string().max(500, "Must be 500 characters or less"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const id = undefined as string | undefined;
        const wordDTO = { ...values, userId: user?.uid };
        console.log(wordDTO);
        if (id) {
          try {
            await updateWord({ ...wordDTO, id: id as string });
            setSnackbar({ severity: "success", message: "Word updated!" });
          } catch (error) {
            setSnackbar({
              severity: "error",
              message: "Error when updating the word",
            });
          } finally {
            setSubmitting(false);
          }
        } else {
          try {
            await createWord(wordDTO);
            setSnackbar({ severity: "success", message: "Word created!" });
          } catch (error) {
            setSnackbar({
              severity: "error",
              message: "Error when creating the word",
            });
          } finally {
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        const wordError = Boolean(errors.word && touched.word && errors.word);
        const translationError = Boolean(
          errors.translation && touched.translation && errors.translation
        );
        const notesError = Boolean(
          errors.notes && touched.notes && errors.notes
        );

        return (
          <form onSubmit={handleSubmit}>
            <Snackbar
              open={snackbar !== undefined}
              onClose={handleSnackbarClose}
              autoHideDuration={5000}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={snackbar?.severity}
                variant="filled"
                sx={{ width: "100%" }}
              >
                {snackbar?.message}
              </Alert>
            </Snackbar>
            <Stack direction="column" spacing={2}>
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl variant="outlined" fullWidth>
                <InputLabel
                  htmlFor="input-word-translation"
                  error={translationError}
                >
                  Translation
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  label="Translation:"
                  id="input-word-translation"
                  name="translation"
                  error={translationError}
                  value={values.translation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        aria-label="Click here to autogenerate a translation"
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
                  helperText={
                    notesError ? errors.notes : "Insert here help notes"
                  }
                  name="notes"
                  error={notesError}
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl fullWidth component="fieldset" variant="outlined">
                <FormLabel component="legend">Tags</FormLabel>
                <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                  {tags.data.map((tag) => (
                    <FormControlLabel
                      key={tag.label}
                      control={<Checkbox />}
                      label={
                        <Chip label={tag.label} color={tag.color as any} />
                      }
                      name="tags"
                      value={tag.id}
                      onChange={handleChange}
                      checked={values.tags?.includes(tag.id as string)}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>Select one or more tags</FormHelperText>
              </FormControl>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  disabled={isSubmitting}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </form>
        );
      }}
    </Formik>
  );
};
