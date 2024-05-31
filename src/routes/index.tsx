import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BuildIcon from "@mui/icons-material/Build";

export const ROUTES = [
  {
    label: "Main",
    icon: <HomeIcon />,
    path: "/private/main",
    primarySection: true,
  },
  {
    label: "Tags",
    icon: <LocalOfferIcon />,
    path: "/private/tags",
    primarySection: true,
  },
  {
    label: "Config",
    icon: <BuildIcon />,
    path: "/private/config",
    secondarySection: true,
  },
];
