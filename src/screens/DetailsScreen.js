import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  const handleAlugar = () => {
    Alert.alert('Contato enviado', 'O locatário receberá seu interesse em breve.');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltar}>
        <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        <Text style={styles.voltarTexto}>Voltar</Text>
      </TouchableOpacity>

      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.preco}>{item.preco}</Text>
        <Text style={styles.descricao}>{item.descricaoDetalhada}</Text>

        <Text style={styles.subtitulo}>Características:</Text>
        {item.features.map((feature, index) => (
          <Text key={index} style={styles.feature}>• {feature}</Text>
        ))}

        <Text style={styles.infoExtra}>Quartos: {item.quartos}</Text>

        <View style={styles.buttonArea}>
          <Button title="Contatar Locatário" color="#2C3E50" onPress={handleAlugar} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  voltar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  voltarTexto: {
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  preco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d3a971',
    marginBottom: 15,
  },
  descricao: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 22,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  feature: {
    fontSize: 15,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  infoExtra: {
    fontSize: 15,
    color: '#2C3E50',
    marginTop: 20,
  },
  buttonArea: {
    marginTop: 30,
  },
});
