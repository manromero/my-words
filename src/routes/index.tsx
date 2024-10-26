import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BuildIcon from "@mui/icons-material/Build";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

export const ROUTES = {
  ROOT: "/",
  PRIVATE_MAIN: "/private/main",
  PRIVATE_TAGS: "/private/tags",
  PRIVATE_PRACTICE: "/private/practice",
  PRIVATE_CONFIG: "/private/config",
};

export const MENU_ITEMS = [
  {
    label: "Main",
    icon: <HomeIcon />,
    path: ROUTES.PRIVATE_MAIN,
    primarySection: true,
  },
  {
    label: "Tags",
    icon: <LocalOfferIcon />,
    path: ROUTES.PRIVATE_TAGS,
    primarySection: true,
  },
  {
    label: "Practice",
    icon: <VideogameAssetIcon />,
    path: ROUTES.PRIVATE_PRACTICE,
    primarySection: true,
  },
  {
    label: "Config",
    icon: <BuildIcon />,
    path: ROUTES.PRIVATE_CONFIG,
    secondarySection: true,
  },
];
