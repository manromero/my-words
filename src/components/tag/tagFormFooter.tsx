import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

type TagFormFooterType = {
  disableSave?: boolean;
  disableDelete?: boolean;
  onDeleteClick?: React.MouseEventHandler;
};

export const TagFormFooter = ({
  disableSave,
  disableDelete,
  onDeleteClick,
}: TagFormFooterType) => {
  return (
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
        disabled={disableDelete}
        onClick={onDeleteClick}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        color="primary"
        type="submit"
        disabled={disableSave}
      >
        Save
      </Button>
    </Stack>
  );
};
