import { StatusBar } from 'expo-status-bar'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'
import { NativeRouter, Route, Routes } from 'react-router-native'
import themeJSON from './theme.json'
import Catalogo from './views/Catalogo/Catalogo'
import Login from './views/Login/Login'
import SignIn from './views/SignIn/SignIn'
import Pagamento from './views/Carrinho/Pagamento/Pagamento'
import Informacoes from './views/Catalogo/Informacoes'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Navigate, useNavigate } from 'react-router-native'

function Logout() {
  const navigate = useNavigate()
  useEffect(() => {
    const logout = async () => {
      try {
        await AsyncStorage.removeItem('token')
        navigate('/')
        console.log("Usuário deslogado com sucesso")
      } catch (error) {
        console.error("Erro ao deslogar:", error)
      }
    }
    logout()
  }, [])
  return null
}
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
            <Route path='/logout' element={<Logout />} />
            <Route path='/pagamento' element={<Pagamento />} />
            <Route path='/informações' element={<Informacoes />} />
          </Route>
        </Routes>
        <StatusBar style="auto" />
      </NativeRouter>
    </PaperProvider>
  );
}
