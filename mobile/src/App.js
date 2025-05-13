import { StatusBar } from 'expo-status-bar'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'
import { NativeRouter, Route, Routes } from 'react-router-native'
import themeJSON from './theme.json'
import Catalogo from './views/Catalogo/Catalogo'
import Login from './views/Login/Login'
import SignIn from './views/SignIn/SignIn'

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
      <NativeRouter>
        <Routes>
          <Route path='/cadastro' element={<SignIn />} />
          <Route path='/' element={<Login />}>
            <Route index element={<Catalogo />} />
          </Route>
        </Routes>
        <StatusBar style="auto" />
      </NativeRouter>
    </PaperProvider>
  );
}
