import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useNavigate } from 'react-router-native'
import { cadastro } from '../../api'

/**
 * Tela de login do usuário com campos para username, email e senha.
 *
 * @example
 * ```jsx
 * <SignIn />
 * ```
 *
 * @since 12/05/2025
 * @link https://react-styleguidist.js.org/docs/documenting.html
 */
const SignIn = () => {
 
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone ] = useState('')

  const onPress = async ()=> {
    try {

      await cadastro(nome,senha,email,telefone)

    alert("Usuário cadastrado com sucesso, efetue o login.")
    navigate('/')

    } catch (error) {

      alert("Falha ao cadastrar usuário, tente novamente.")

    }

  }

  return (  
    
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        label="Digite seu nome"
        value={nome}
        onChangeText={setNome}
        style={{marginBottom: 15, backgroundColor: 'white', padding: 20, }}
       theme={{ roundness: 30 }}
            
        mode="outlined"
      />

      <TextInput
        label="Digite seu email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{ roundness: 30 }}
      />

      <TextInput
        label="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        theme={{ roundness: 30 }}
      />

      <TextInput
        label="Digite seu Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        theme={{ roundness: 30 }}
      />

        <Button mode="contained" onPress={onPress} style={styles.button}>
        Cadastrar
      </Button>

      <Button mode="contained" onPress={() => navigate('/')} style={styles.button}>
        Voltar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 20,
  },
  button: {
    marginTop: 16,
  },
})


export default SignIn

