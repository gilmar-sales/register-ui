import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme(
  {
    fonts: {
      body: "Nunito",
      heading: "Nunito",
      mono: "Nunito",
    },
    components: {
      Button: {
        baseStyle: {
          borderRadius: "none",
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "green" })
);

export default theme;
