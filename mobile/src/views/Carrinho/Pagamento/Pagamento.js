import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Card } from 'react-native-paper'
import { useNavigate } from 'react-router-native'
import { Linking } from 'react-native'

const Pagamento = () => {
  const [carrinho, setCarrinho] = useState([])
  const navigate = useNavigate()

  // Carrega o carrinho do AsyncStorage e garante que o campo imagem existe
  const carregaCarrinho = async () => {
    try {
      const data = await AsyncStorage.getItem('carrinho')
      const carrinhoParse = data ? JSON.parse(data) : []

      // Garantir que cada item tenha o campo imagem (mesmo que vazio ou padrão)
      const carrinhoComImagem = carrinhoParse.map(item => ({
        ...item,
        imagem: item.imagem
          ? item.imagem.startsWith('http')
            ? item.imagem
            : `https://seuservidor.com/imagens/${item.imagem}` // ajuste conforme sua base de imagens
          : 'https://via.placeholder.com/120', // imagem padrão caso não exista
      }))

      setCarrinho(carrinhoComImagem)
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error)
      setCarrinho([])
    }
  }

  // Função para finalizar pedido e enviar via WhatsApp
  const finalizarPedido = async () => {
    try {
      const supported = await Linking.canOpenURL("whatsapp://send")
      const url = new URL(supported ? 'whatsapp://send' : 'https://api.whatsapp.com/send')
      url.searchParams.set('phone', '5521970127661') // WhatsApp da padaria com DDI e DDD
      url.searchParams.set(
        'text',
        `*Pedido do App:*\n\n` +
          carrinho
            .map(item => `- ${item.nome} (R$ ${item.preco.toFixed(2)} x ${item.quantidade})`)
            .join('\n') +
          `\n\n*Total: R$ ${calcularTotal()}*\n\n` +
          `Por favor, confirme o pedido e informe o endereço de entrega.`
      )

      console.info(`WhatsApp URL: ${url.toString()}`)
      await Linking.openURL(url.toString())

      await AsyncStorage.removeItem('carrinho')
      setCarrinho([])

      navigate('/') // volta para tela inicial
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao finalizar o pedido.")
    }
  }

  const calcularTotal = () =>
    carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2)

  useEffect(() => {
    carregaCarrinho()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo do Pedido</Text>

      <Button mode="outlined" onPress={carregaCarrinho} style={styles.botaoAtualizar}>
        Atualizar Carrinho
      </Button>

      <ScrollView style={styles.scroll}>
        {carrinho.length === 0 ? (
          <Text style={styles.vazio}>Carrinho vazio</Text>
        ) : (
          carrinho.map((item, index) => (
            <Card key={index} style={styles.card}>
              {item.imagem && (
                <Card.Cover source={{ uri: item.imagem }} style={styles.imagem} />
              )}
              <Card.Title title={item.nome} />
              <Card.Content>
                <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
                <Text>Quantidade: {item.quantidade}</Text>
                <Text>Total: R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>

      {carrinho.length > 0 && (
        <View style={styles.rodape}>
          <Text style={styles.total}>Total: R$ {calcularTotal()}</Text>
          <Button mode="contained" onPress={finalizarPedido} style={styles.botaoFinalizar}>
            Finalizar Pedido
          </Button>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  botaoAtualizar: {
    marginTop: 16,
    marginBottom: 16
  },
  scroll: {
    flex: 1
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#F5E1D5',
  },
  imagem: {
    height: 120,
    resizeMode: 'cover',
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20
  },
  rodape: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  botaoFinalizar: {
    borderRadius: 30,
    backgroundColor: '#9D735A'
  }
})

export default Pagamento
