import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { BottomSheet } from "react-native-btr"
import { Appbar, Button, Card, Searchbar } from 'react-native-paper'
import { getProdutos } from '../../api'

export default function CatalogoRoute() {
  const [produtos, setProdutos] = useState([])
  const [carrinho, setCarrinho] = useState([])
  const [carrinhoVisible, setCarrinhoVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const addToCarrinho = (produto) => {
    const produtoExistente = carrinho.find(item => item.id === produto.id)
    if (produtoExistente) {
      setCarrinho(carrinho.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item))
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }])
    }
  }

  const removeFromCarrinho = (produto) => {
    const produtoExistente = carrinho.find(item => item.id === produto.id)
    if (produtoExistente.quantidade > 1) {
      setCarrinho(carrinho.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade - 1 } : item))
    } else {
      setCarrinho(carrinho.filter(item => item.id !== produto.id))
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

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#f8f8f8', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
        <Appbar.Content
          title="Belpão"
          titleStyle={{ fontSize: 24, fontWeight: 'bold' }}
        />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <Searchbar
          placeholder="Busque seu produto"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ marginBottom: 20 }}
        />
        {produtos.map(produto => {
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
          <Button
            icon="cart"
            mode="contained"
            onPress={toggleCarrinhoVisible}
            style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: '#ff6347' }}
            labelStyle={{ fontWeight: 'bold' }}
          >
            Carrinho ({carrinho.reduce((total, item) => total + item.quantidade, 0)})
          </Button>
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
