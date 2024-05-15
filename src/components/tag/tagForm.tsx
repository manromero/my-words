import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export const TagForm = () => {
  return (
    <Box>
      <FormControl fullWidth>
        <Stack direction="column" spacing={2}>
          <FormControl>
            <TextField
              fullWidth
              id="1"
              label="Label"
              variant="outlined"
              helperText="Insert here the label of the tag"
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
                value="default"
                control={<Radio />}
                label={<Chip label="default" color="default" />}
              />
              <FormControlLabel
                value="error"
                control={<Radio />}
                label={<Chip label="error" color="error" />}
              />
              <FormControlLabel
                value="info"
                control={<Radio />}
                label={<Chip label="info" color="info" />}
              />
              <FormControlLabel
                value="primary"
                control={<Radio />}
                label={<Chip label="primary" color="primary" />}
              />
              <FormControlLabel
                value="secondary"
                control={<Radio />}
                label={<Chip label="secondary" color="secondary" />}
              />
              <FormControlLabel
                value="success"
                control={<Radio />}
                label={<Chip label="success" color="success" />}
              />
              <FormControlLabel
                value="warning"
                control={<Radio />}
                label={<Chip label="warning" color="warning" />}
              />
            </RadioGroup>
          </FormControl>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FormLabel component="p">Preview</FormLabel>
            <Chip label="warning" color="warning" />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              color="primary"
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </FormControl>
    </Box>
  );
};
