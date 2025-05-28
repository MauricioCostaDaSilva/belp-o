import React, { useState } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, View, ScrollView, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useNavigate } from 'react-router-native'
import { cadastro } from '../../api'


const SignIn = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')

  const onPress = async () => {
    try {
      await cadastro(nome, senha, email, telefone)
      alert("Usuário cadastrado com sucesso, efetue o login.")
      navigate('/')
    } catch (error) {
      alert("Falha ao cadastrar usuário, tente novamente.")
    }
  }

  return (
    // rolagem para deixar a tela menos estatica
    <ScrollView> 
      <ImageBackground
        source={require('../../../assets/fundo.jpeg')}
        style={styles.ImageBackground}
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.formContainer}>
          <TextInput
            label="Digite seu nome"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
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
            label="Digite seu telefone"
            value={telefone}
            onChangeText={setTelefone}
            style={styles.input}
            mode="outlined"
            keyboardType="phone-pad"
            theme={{ roundness: 30 }}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={onPress}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Cadastrar
            </Button>
          </View>
         <View style={styles.linkContainer}>
                     <Text style={styles.textFooter}>Já tem uma conta? </Text>
                     <Text
                       style={styles.linkFooter}
                       onPress={() => navigate('/')}
                     >
                       Login
                     </Text>
                   </View>
                      
                    
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  ImageBackground: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    marginTop: -100,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#9D735A',
    borderRadius: 30,
    width: 250,
    height: 40,
    justifyContent: 'center',
    marginTop: -5,
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


export default SignIn
