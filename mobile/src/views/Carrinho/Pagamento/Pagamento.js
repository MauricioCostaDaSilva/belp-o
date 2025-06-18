/**
 * Copyright (c) 2025-present, Mauricio Costa da Silva.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appbar, Button, Card, Searchbar } from 'react-native-paper'


const Pagamento = (props) => {
  const [carrinho, setCarrinho] = useState([])

  const carregaCarrinho = async () => {
   try {const data = await AsyncStorage.getItem('carrinho')
    console.log(data);

    setCarrinho(JSON.parse(data))
  } catch (error) {
      console.error("Erro ao carregar o carrinho:", error),
   setCarrinho([])
    }
  }
 useEffect(() => {
  (async () => {
    await carregaCarrinho()
  })()
}, [])
  return (
    <View style={styles.container}>
      <Button onClick={() => carregaCarrinho()} style={{ marginBottom: 20 }}>
        Atualizar Carrinho
      </Button>
       <Text>{JSON.stringify(carrinho)}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Pagamento
