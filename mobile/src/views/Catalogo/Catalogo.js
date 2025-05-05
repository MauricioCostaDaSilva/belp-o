import { useState } from 'react'
import { Text } from 'react-native'
import { BottomNavigation } from 'react-native-paper'
import CatalogoRoute from './CatalogoRoute'

const PerfilRoute = () => <Text>Perfil</Text>

export default function Catalogo() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'catalogo', title: 'Início', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'profile', title: 'Minha conta', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    catalogo: CatalogoRoute,
    profile: PerfilRoute,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}
