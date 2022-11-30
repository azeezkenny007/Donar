import {
  extendTheme,
  type ThemeConfig,
  type ThemeExtension,
} from "@chakra-ui/react";

const colors = {
  dark: {
    primary: "#192F2C",
    secondary: "#2F5C56",
    neutral: "#FEFEFE",
    accent: "7AF1DC",
  },
  light: {
    primary: "#FFFFFF",
    secondary: "#7AF1DC",
    neutral: "#FEFEFE",
    accent: "7AF1DC",
  },
};
const fonts = {
  head: "'Plus Jakarta Sans', sans-serif;",
  body: "'Mandali', sans-serif;",
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const space = {
  0.5: "2px",
  1: "4px",
  1.5: "8px",
  2: "16px",
  2.5: "24px",
  3: "32px",
  3.5: "40px",
  4: "48px",
  4.5: "56px",
  5: "36px",
  5.5: "64px",
  6: "72px",
  6.3: "80px",
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  space,
});

export default theme;
