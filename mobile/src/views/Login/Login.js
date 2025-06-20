import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,Linking
} from 'react-native'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { useNavigate, Outlet } from 'react-router-native'
import { getToken } from '../../api'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



const Login = ({ navigation, children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkToken()
  }, [])

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { token } = await getToken(username, password)
      await AsyncStorage.setItem('token', JSON.stringify(token))
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      alert("Falha ao fazer login, verifique seu usuário e senha e tente novamente")
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return (
      <Outlet />
    )
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <ImageBackground
        source={require('../../../assets/fundo.jpeg')}
        style={styles.ImageBackground}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <SafeAreaView>
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              label="Informe seu endereço de e-mail"
              disabled={loading}
              value={username}
              onChangeText={setUsername}
              style={styles.emailInput}
              theme={{ roundness: 30 }}
            />
            <TextInput
              mode="outlined"
              label="Informe sua senha"
              secureTextEntry
              disabled={loading}
              value={password}
              onChangeText={setPassword}
              style={styles.senhaInput}
              theme={{ roundness: 30 }}
            />
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Entrar
              </Button>
            </View>
            <View style={styles.linkContainer}>
              <Text style={styles.textFooter}>Novo usuário? </Text>
              <Text
                style={styles.linkFooter}
                onPress={() => navigate('/cadastro')}
              >
                Cadastre-se
              </Text>
            </View>

            <View style={[styles.linkContainer, { marginTop: 5 }]}>
              <Text style={styles.textFooter}>É administrador? </Text>
              <Text
                style={styles.linkFooter}
                onPress={() => Linking.openURL('http://192.168.1.5:3001/login_adm/index.html')}
              >
                Acesse
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailInput: {
    marginBottom: 15,
    marginTop: 15,
    backgroundColor: 'white',
  },
  senhaInput: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  formContainer: {
    flex: 1,
    marginTop: -40,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    borderRadius: 30,
    backgroundColor: '#9D735A',
    width: 250,
    height: 40,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center'
  },
  textFooter: {
    fontSize: 14,
  },
  linkFooter: {
    color: '#9D735A',
    fontWeight: 'bold',
    fontSize: 14
  },
})
export default Login
