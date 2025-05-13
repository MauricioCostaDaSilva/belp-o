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
  const navigate = useNavigate()
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
        label="Usuário"
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />

      <TextInput
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Digite sua senha"
        style={styles.input}
        mode="outlined"
        secureTextEntry
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
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
})

export default SignIn
