import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import themeJSON from './theme.json';
import Catalogo from './views/Catalogo/Catalogo';
import Login from './views/Login/Login';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...themeJSON.colors,
  },
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <>
        <Login>
          <Catalogo />
        </Login>
        <StatusBar style="auto" />
      </>
    </PaperProvider>
  )
}
