"use client";

import Stack from "@mui/material/Stack";
import { TagType, TagWithIdType } from "@/types";
import { useAuth, useNotifications, useTag } from "@/hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { TagFormFooter } from "./tagFormFooter";
import { TagFormContent } from "./tagFormContent";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type TagFormType = {
  tag?: TagType;
  onCreate?: (tag: TagType) => void;
  onEdit?: (tag: TagType) => void;
  onDelete?: () => void;
  onClose?: () => void;
};

const defaultTag: TagType = {
  label: "",
  color: "default",
};

export const TagForm = ({ tag = defaultTag, ...props }: TagFormType) => {
  const { user } = useAuth();
  const { createTag, updateTag, deleteTag } = useTag();
  const { pusblishNotification } = useNotifications();

  const handleDelete = async (id: string) => {
    try {
      await deleteTag(id);
      pusblishNotification({ severity: "success", message: "Tag deleted!" });
      props.onDelete?.();
    } catch (e) {
      pusblishNotification({
        severity: "error",
        message: "Error when deleting the tag",
      });
    }
  };

  return (
    <Formik
      initialValues={tag}
      validationSchema={Yup.object({
        label: Yup.string()
          .max(100, "Must be 50 characters or less")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        const tagDTO = { ...values, userId: user?.uid };
        if (values.id) {
          try {
            await updateTag(tagDTO as TagWithIdType);
            pusblishNotification({
              severity: "success",
              message: "Tag updated!",
            });
            props.onEdit?.(tagDTO);
          } catch (error) {
            pusblishNotification({
              severity: "error",
              message: "Error when updating the tag",
            });
          } finally {
            setSubmitting(false);
          }
        } else {
          try {
            await createTag(tagDTO);
            pusblishNotification({
              severity: "success",
              message: "Tag created!",
            });
            props.onCreate?.(tagDTO);
          } catch (error) {
            pusblishNotification({
              severity: "error",
              message: "Error when creating the tag",
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
        return (
          <Stack
            component="form"
            direction="column"
            onSubmit={handleSubmit}
            padding={3}
            maxHeight="80vh"
          >
            <IconButton
              color="primary"
              aria-label="Close Modal"
              onClick={props.onClose}
              sx={{ alignSelf: "flex-end" }}
            >
              <CloseIcon />
            </IconButton>
            <TagFormContent
              errors={errors}
              touched={touched}
              values={values}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TagFormFooter
              disableDelete={values.id === undefined || isSubmitting}
              disableSave={isSubmitting}
              onDeleteClick={() => handleDelete(values.id as string)}
            />
          </Stack>
        );
      }}
    </Formik>
  );
};
