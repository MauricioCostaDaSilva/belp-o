import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function InfoPadariaScreen() {
  const handleOpenURL = async (url, fallbackMessage) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erro', fallbackMessage);
    }
  };

  const handleOpenInstagram = () => {
    handleOpenURL('https://www.instagram.com/padaria.belpao', 'Não foi possível abrir o Instagram.');
  };

  const handleCallPadaria = () => {
    handleOpenURL('tel:+5521988083458', 'Não foi possível fazer a chamada.');
  };

  const handleOpenMap = () => {
    handleOpenURL(
      'https://www.google.com/maps/search/Av.+Amália+Rocha,+16+-+Bairro+das+Graças,+Belford+Roxo+-+RJ',
      'Não foi possível abrir o mapa.'
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        source={require('../../../assets/fundo.jpeg')}
        style={styles.topImage}
        imageStyle={styles.topImageRounded}
        resizeMode="cover"
      >

      </ImageBackground>

      <View style={styles.infoBox}>
        {/* Sobre */}
        <Text style={styles.title}>Sobre</Text>
        <Text style={styles.aboutText}>
          Desde 2024, a Padaria BelPão oferece produtos fresquinhos e deliciosos para toda a comunidade de Belford Roxo.
        </Text>

        <View style={styles.separator} />

        <Text style={styles.title}>Informações</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map-marker" size={30} color="#fff" />
            <TouchableOpacity onPress={handleOpenMap}>
              <Text style={[styles.infoText, styles.link]}>
                Av. Amália Rocha, 16 - Bairro das Graças, Belford Roxo - RJ
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="phone" size={30} color="#fff" />
            <TouchableOpacity onPress={handleCallPadaria}>
              <Text style={[styles.infoText, styles.link]}>
                +55 21 98808-3458
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="instagram" size={30} color="#fff" />
            <TouchableOpacity onPress={handleOpenInstagram}>
              <Text style={[styles.infoText, styles.link]}>@padaria.belpao</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={30} color="#fff" />
            <Text style={styles.infoText}>
              <Text style={styles.bold}>Horário de Funcionamento:</Text>{'\n'}
              Segunda a Sábado, das 6h às 18h
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          "Com amor e sabor em cada pedaço!🥐"
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  topImage: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
  },
  topImageRounded: {
    borderTopLeftRadius: 20,
  borderTopRightRadius: 20,


  },
  infoBox: {
    marginTop: 0,
    backgroundColor: 'rgba(157, 115, 90, 0.9)',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 30,
    paddingHorizontal: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
  },
  aboutText: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 25,
    textAlign: 'justify',
  },
  separator: {
    borderBottomColor: '#fff',
    borderBottomWidth: 4,
    marginVertical: 25,
    marginHorizontal: 15,
    opacity: 0.6,
    borderRadius: 3,
  },
  infoContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 25,
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
  },
  footer: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
