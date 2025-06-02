import { useState } from 'react'
import { Text } from 'react-native'
import { BottomNavigation } from 'react-native-paper'
import CatalogoRoute from './CatalogoRoute'
import { useNavigate, Outlet } from 'react-router-native'
import InfoPadariaScreen from './Informacoes'
import Pagamento from '../Carrinho/Pagamento/Pagamento'


const PerfilRoute = () => <Text>Perfil</Text>


export default function Catalogo() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
 { key: 'catalogo', title: 'Início', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
 { key: 'pagamento', title: 'Carrinho', focusedIcon: 'cart', unfocusedIcon: 'cart-outline'  },
{ key: 'informacoes', title: 'Informações', focusedIcon: 'account', unfocusedIcon: 'account-outline' },


  ])

  const renderScene = BottomNavigation.SceneMap({
    catalogo: CatalogoRoute,
    profile: PerfilRoute,
    pagamento: Pagamento,
    informacoes: InfoPadariaScreen
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

