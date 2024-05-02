import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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

export const WordForm = () => {
  return (
    <Box>
      <FormControl fullWidth>
        <Stack direction="column" spacing={2}>
          <FormControl>
            <TextField
              fullWidth
              id="1"
              label="Word or concept:"
              variant="outlined"
              helperText="Insert here the word or concept to translate"
            />
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="input-word-translation">
              Translation:
            </InputLabel>
            <OutlinedInput
              fullWidth
              label="Translation:"
              id="input-word-translation"
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
            <FormHelperText>
              Insert here the tranalation associated to the word or click in the
              magic wand
            </FormHelperText>
          </FormControl>

          <FormControl>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Notes:"
              variant="outlined"
              helperText="Insert here help notes"
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="input-word-tag">Tags:</InputLabel>
            <Select id="input-word-tag" label="Tags:" variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Select one or more tags</FormHelperText>
          </FormControl>

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
