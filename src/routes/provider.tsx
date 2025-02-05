import { Provider } from "react-redux";
import store from "@/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/styles/global";

type AppProvider = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProvider) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
