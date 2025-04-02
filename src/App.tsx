import AppRouter from "./routes/AppRouter";
import { GlobalStyle } from "./styles/GlobalStyled";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
}
export default App;
