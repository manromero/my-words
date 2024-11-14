import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TagType } from "@/types";
import { FormikErrors, FormikHandlers, FormikTouched } from "formik";

type TagFormContentType = {
  errors: FormikErrors<TagType>;
  touched: FormikTouched<TagType>;
  values: TagType;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
};

export const TagFormContent = ({
  errors,
  touched,
  values,
  onChange,
  onBlur,
}: TagFormContentType) => {
  const labelError = Boolean(errors.label && touched.label);

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
          name="label"
          label="Label"
          variant="outlined"
          helperText={
            labelError ? errors.label : "Insert here the label of the tag"
          }
          error={labelError}
          value={values.label}
          onChange={onChange}
          onBlur={onBlur}
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
            onChange={onChange}
          />
          <FormControlLabel
            name="color"
            value="error"
            control={<Radio />}
            label={<Chip label="error" color="error" />}
            checked={values.color === "error"}
            onChange={onChange}
          />
          <FormControlLabel
            name="color"
            value="info"
            control={<Radio />}
            label={<Chip label="info" color="info" />}
            checked={values.color === "info"}
            onChange={onChange}
          />
          <FormControlLabel
            name="color"
            value="primary"
            control={<Radio />}
            label={<Chip label="primary" color="primary" />}
            checked={values.color === "primary"}
            onChange={onChange}
          />
          <FormControlLabel
            name="color"
            value="secondary"
            control={<Radio />}
            label={<Chip label="secondary" color="secondary" />}
            checked={values.color === "secondary"}
            onChange={onChange}
          />
          <FormControlLabel
            name="color"
            value="success"
            control={<Radio />}
            label={<Chip label="success" color="success" />}
            checked={values.color === "success"}
            onChange={onChange}
          />
          <FormControlLabel
            name="color"
            value="warning"
            control={<Radio />}
            label={<Chip label="warning" color="warning" />}
            checked={values.color === "warning"}
            onChange={onChange}
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
  );
};
