import { useEffect, useState } from 'react'
import { ScrollView, Text, View, Alert } from 'react-native'
import { BottomSheet } from "react-native-btr"
import { Navigate, useNavigate } from 'react-router-native'
import { Appbar, Button, Card, Searchbar } from 'react-native-paper'
import { getProdutos } from '../../api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CatalogoRoute() {
  const navigate = useNavigate()
  const [produtos, setProdutos] = useState([])
  const [carrinho, setCarrinho] = useState([])
  const [carrinhoVisible, setCarrinhoVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const addToCarrinho = async (produto) => {
    const produtoExistente = carrinho.find(item => item.id === produto.id)
    if (produtoExistente) {
      const updatedCarrinho = carrinho.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item)
      await AsyncStorage.setItem('carrinho', JSON.stringify(updatedCarrinho))
      console.log("Produto atualizado no carrinho:", updatedCarrinho)
      setCarrinho(updatedCarrinho)

    } else {
      const newProduto = [...carrinho, { ...produto, quantidade: 1 }]
      await AsyncStorage.setItem('carrinho', JSON.stringify(newProduto))
      console.log("Produto adicionado ao carrinho:", newProduto)
      setCarrinho(newProduto)
    }

  }

  const removeFromCarrinho = async (produto) => {
    try {
      const produtoExistente = carrinho.find(item => item.id === produto.id)
      if (produtoExistente.quantidade > 1) {
        const updatedCarrinho = carrinho.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade - 1 } : item)
        await AsyncStorage.setItem('carrinho', JSON.stringify(updatedCarrinho))
        console.log("Produto atualizado no carrinho:", updatedCarrinho)
        setCarrinho(updatedCarrinho)
      } else {
        const removeFromCarrinho = carrinho.filter(item => item.id !== produto.id)
        await AsyncStorage.setItem('carrinho', JSON.stringify(removeFromCarrinho))
        console.log("Produto removido do carrinho:", removeFromCarrinho)
        setCarrinho(removeFromCarrinho)
      }

    } catch (error) {
      console.log("Erro ao remover produto do carrinho:", error);

    }

  }

  const toggleCarrinhoVisible = () => {
    setCarrinhoVisible(!carrinhoVisible)
  }

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await getProdutos()
        setProdutos(response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProdutos()
  }, [])

 const normalizarTexto = texto =>
  texto?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()

const produtosFiltrados = produtos.filter(produto =>
  normalizarTexto(produto.nome).includes(normalizarTexto(searchQuery))
)


  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#f8f8f8', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
        <Appbar.Content
          title="Belpão"
          titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
        />
        <Appbar.Action
          icon="logout"
          onPress={() => {
            navigate('/logout')


          }}
        />

      </Appbar.Header>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Searchbar
          placeholder="Busque seu produto"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginBottom: 20 }}
        />
        {produtosFiltrados.map(produto => {
          const isInCarrinho = carrinho.find(item => item.id === produto.id)

          return (
            <Card
              style={{ marginBottom: 20 }}
              mode='contained'
              key={produto.id}
            >
              <Card.Cover source={{ uri: produto.imagem }} />
              <Card.Title
                title={produto.nome}
                titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
                subtitle={produto.descricao}
                subtitleStyle={{ fontSize: 14 }}
              />
              <Card.Content>
                <Text style={{ opacity: 0.5, fontSize: 14, paddingBottom: 10 }}>
                  20-30 min • Entrega grátis
                </Text>
              </Card.Content>
              <Card.Actions style={isInCarrinho ? { justifyContent: 'space-between' } : undefined}>
                {isInCarrinho && (
                  <Button
                    icon='minus'
                    mode='contained'
                    labelStyle={{ fontWeight: 'bold' }}
                    onPress={() => removeFromCarrinho(produto)}
                  >
                    Remover
                  </Button>
                )}
                {isInCarrinho && (
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {isInCarrinho.quantidade}
                  </Text>
                )}
                <Button
                  mode='contained'
                  icon={isInCarrinho ? 'plus' : 'cart'}
                  labelStyle={{ fontWeight: 'bold' }}
                  onPress={() => addToCarrinho(produto)}
                >
                  {isInCarrinho ? 'Adicionar' : `Adicionar            R$ ${produto.preco.toFixed(2)}`}
                </Button>
              </Card.Actions>
            </Card>
          )
        })}
      </ScrollView>
      {carrinho.length > 0 && (
        <View>


        </View>
      )}
      <BottomSheet
        visible={carrinhoVisible}
        onBackButtonPress={toggleCarrinhoVisible}
        onBackdropPress={toggleCarrinhoVisible}
      >

        <View style={{ backgroundColor: '#fff', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>
            Carrinho
          </Text>
          {carrinho.map(item => (
            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <Text>{item.nome}</Text>
              <Text>{item.quantidade} x R$ {item.preco.toFixed(2)}</Text>
            </View>
          ))}
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Total: R$ {carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </BottomSheet>
    </>

  )
}
