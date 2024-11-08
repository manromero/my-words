"use client";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Chip from "@mui/material/Chip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TagType, TagWithIdType } from "@/types";
import { useAuth, useNotifications, useTag } from "@/hooks";
import { Formik } from "formik";
import * as Yup from "yup";

type TagFormType = {
  tag?: TagType;
  onCreate?: (tag: TagType) => void;
  onEdit?: (tag: TagType) => void;
  onDelete?: () => void;
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
        const labelError = Boolean(
          errors.label && touched.label && errors.label
        );

        return (
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
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
                      name="label"
                      label="Label"
                      variant="outlined"
                      helperText={
                        labelError
                          ? errors.label
                          : "Insert here the label of the tag"
                      }
                      error={labelError}
                      value={values.label}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel id="input-color-tag">Color</FormLabel>
                    <RadioGroup
                      aria-labelledby="input-color-tag"
                      defaultValue="default"
                      sx={{ flexDirection: "row", flexWrap: "wrap" }}
                    >
                      <FormControlLabel
                        name="color"
                        value="default"
                        control={<Radio />}
                        label={<Chip label="default" color="default" />}
                        checked={values.color === "default"}
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        name="color"
                        value="error"
                        control={<Radio />}
                        label={<Chip label="error" color="error" />}
                        checked={values.color === "error"}
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        name="color"
                        value="info"
                        control={<Radio />}
                        label={<Chip label="info" color="info" />}
                        checked={values.color === "info"}
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        name="color"
                        value="primary"
                        control={<Radio />}
                        label={<Chip label="primary" color="primary" />}
                        checked={values.color === "primary"}
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        name="color"
                        value="secondary"
                        control={<Radio />}
                        label={<Chip label="secondary" color="secondary" />}
                        checked={values.color === "secondary"}
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        name="color"
                        value="success"
                        control={<Radio />}
                        label={<Chip label="success" color="success" />}
                        checked={values.color === "success"}
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        name="color"
                        value="warning"
                        control={<Radio />}
                        label={<Chip label="warning" color="warning" />}
                        checked={values.color === "warning"}
                        onChange={handleChange}
                      />
                    </RadioGroup>
                  </FormControl>
                  {values.label !== "" && (
                    <Stack direction="row" alignItems="center" gap={2}>
                      <FormLabel component="p">Preview</FormLabel>
                      <Chip label={values.label} color={values.color as any} />
                    </Stack>
                  )}
                </Stack>
                <Stack
                  direction={{ sx: "column", lg: "row" }}
                  justifyContent="flex-end"
                  gap={2}
                  boxShadow="0px -5px 4px -2px rgba(0, 0, 0, 0.2)"
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
            </FormControl>
          </form>
        );
      }}
    </Formik>
  );
};
