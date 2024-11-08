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
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import {
  useAuth,
  useData,
  useNotifications,
  useTranslate,
  useWord,
} from "@/hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { WordType, WordWithIdType } from "@/types";

type WordFormType = {
  word?: WordType;
  onCreate?: (word: WordType) => void;
  onEdit?: (word: WordType) => void;
  onDelete?: () => void;
};

const defaultWord: WordType = {
  word: "",
  translation: "",
  notes: "",
  tags: [],
  id: undefined,
};

export const WordForm = ({ word = defaultWord, ...props }: WordFormType) => {
  const { tags } = useData();
  const { user } = useAuth();
  const { createWord, updateWord, deleteWord } = useWord();
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

  const handleDelete = async (id: string) => {
    try {
      await deleteWord(id);
      pusblishNotification({ severity: "success", message: "Word deleted!" });
      props.onDelete?.();
    } catch (e) {
      pusblishNotification({
        severity: "error",
        message: "Error when deleting the word",
      });
    }
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
        const wordDTO = { ...values, userId: user?.uid };
        if (values.id) {
          try {
            await updateWord(wordDTO as WordWithIdType);
            pusblishNotification({
              severity: "success",
              message: "Word updated!",
            });
            props.onEdit?.(wordDTO);
          } catch (error) {
            pusblishNotification({
              severity: "error",
              message: "Error when updating the word",
            });
          } finally {
            setSubmitting(false);
          }
        } else {
          try {
            await createWord(wordDTO);
            pusblishNotification({
              severity: "success",
              message: "Word created!",
            });
            props.onCreate?.(wordDTO);
          } catch (error) {
            pusblishNotification({
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
        setFieldValue,
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
            <Stack direction="column" gap={2}>
              <Stack
                direction="column"
                gap={2}
                flexGrow={1}
                overflow="auto"
                // TODO Improve me
                maxHeight="50vh"
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
              </Stack>
              <Stack
                direction={{ sx: "column", lg: "row" }}
                justifyContent="flex-end"
                boxShadow="0px -5px 4px -2px rgba(0, 0, 0, 0.2)"
                gap={2}
                paddingTop={2}
              >
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  disabled={values.id === undefined || isSubmitting}
                  onClick={() => handleDelete(values.id as string)}
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
