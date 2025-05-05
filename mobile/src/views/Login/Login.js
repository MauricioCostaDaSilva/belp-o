import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Appbar, Button, TextInput } from 'react-native-paper'
import { getToken } from '../../api'

const Login = (props) => {
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
      <>{props.children}</>
    )
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Entrar" />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 20, padding: 20 }}>
        <Text style={{ textAlign: 'center'}}>
          Para continuar informe seu usuário e senha</Text>
        <TextInput
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            label="Informe seu endereço de e-mail"
            disabled={loading}
            value={username}
            onChangeText={setUsername}
            style={{ borderRadius: 30, backgroundColor: 'white' }}
            theme={{ roundness: 30 }}
          />
          <TextInput
            mode='outlined'
            label="Informe sua senha"
            secureTextEntry
            disabled={loading}
            value={password}
            onChangeText={setPassword}
            style={{ borderRadius: 30, backgroundColor: 'white' }}
            theme={{ roundness: 30 }}
          />
          <Button mode="contained" onPress={handleLogin} disabled={loading}
          style={{ borderRadius: 30, marginTop:10 }}>
            Entrar
          </Button>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Login
