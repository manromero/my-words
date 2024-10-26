import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

type PlayCardType = {
  label: string;
  selected?: boolean;
  success?: boolean;
  error?: boolean;
  completed?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PlayCard = (props: PlayCardType) => {
  const getBackgroundColor = () => {
    if (props.error) {
      return "error.light";
    }
    if (props.success) {
      return "success.light";
    }
    if (props.selected) {
      return "info.light";
    }
    if (props.completed) {
      return "grey.300";
    }
    return "background.paper";
  };

  const getColor = () => {
    if (props.error) {
      return "error.contrastText";
    }
    if (props.success) {
      return "success.contrastText";
    }
    if (props.selected) {
      return "info.contrastText";
    }
    if (props.completed) {
      return "grey.400";
    }
    return "grey.900";
  };

  return (
    <Card
      sx={{
        backgroundColor: getBackgroundColor(),
        width: "30%", // TODO could be improved
        flexGrow: 1,
        flexShrink: "0",
      }}
    >
      <CardActionArea onClick={props.onClick}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "fontWeightMedium", color: getColor() }}
          >
            {props.label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
