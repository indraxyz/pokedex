import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import { grey } from "@mui/material/colors";

import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import { Roboto } from "next/font/google";

const container = () => document.getElementById("__next");

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    text: {
      secondary: grey[500],
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  cssVariables: true,
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        container,
      },
    },
    MuiPopper: {
      defaultProps: {
        container,
      },
    },
    MuiDialog: {
      defaultProps: {
        container,
      },
    },
    MuiModal: {
      defaultProps: {
        container,
      },
    },
  },
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme} defaultMode="system">
          <main className={roboto.variable}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </StyledEngineProvider>
    </AppCacheProvider>
  );
}
