"use client";

import Stack from "@mui/material/Stack";
import { useAuth, useNotifications, useWord } from "@/hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { WordType, WordWithIdType } from "@/types";
import { WordFormContent } from "./wordFormContent";
import { WordFormFooter } from "./wordFormFooter";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import wordFormStyles from "./wordForm.module.css";

type WordFormType = {
  word?: WordType;
  onCreate?: (word: WordType) => void;
  onEdit?: (word: WordType) => void;
  onDelete?: () => void;
  onClose?: () => void;
};

const defaultWord: WordType = {
  word: "",
  translation: "",
  notes: "",
  tags: [],
  id: undefined,
};

export const WordForm = ({ word = defaultWord, ...props }: WordFormType) => {
  const { user } = useAuth();
  const { createWord, updateWord, deleteWord } = useWord();

  const { pusblishNotification } = useNotifications();

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
        return (
          <Stack
            component="form"
            direction="column"
            onSubmit={handleSubmit}
            padding={3}
            className={wordFormStyles.formHeight}
          >
            <IconButton
              color="primary"
              aria-label="Close Modal"
              onClick={props.onClose}
              sx={{ alignSelf: "flex-end" }}
            >
              <CloseIcon />
            </IconButton>
            <WordFormContent
              errors={errors}
              touched={touched}
              values={values}
              onChange={handleChange}
              onBlur={handleBlur}
              setFieldValue={setFieldValue}
            />
            <WordFormFooter
              disableSave={isSubmitting}
              disableDelete={values.id === undefined || isSubmitting}
              onDeleteClick={() => handleDelete(values.id as string)}
            />
          </Stack>
        );
      }}
    </Formik>
  );
};
