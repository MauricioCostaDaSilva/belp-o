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

const Pagamento = (props) => {
  const [carrinho, setCarrinho] = useState(undefined)

  useEffect(() => {
    const carregaCarrinho = async () => {
      const data = await AsyncStorage.getItem('carrinho')
      setCarrinho(data)
    }

    carregaCarrinho()
  }, [])

  return (
    <View style={styles.container}>
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
