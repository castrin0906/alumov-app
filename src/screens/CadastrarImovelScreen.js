import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export default function CadastrarImovelScreen() {
  const [form, setForm] = useState({
    nome: '',
    localizacao: '',
    descricao: '',
    descricaoDetalhada: '',
    preco: '',
    quartos: '',
    imagem: '',
    features: ''
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const camposObrigatorios = ['nome', 'localizacao', 'descricao', 'preco', 'quartos', 'imagem'];
    const camposVazios = camposObrigatorios.filter(key => !form[key]);
    if (camposVazios.length > 0) {
      Alert.alert('Campos obrigatórios faltando', 'Preencha todos os campos antes de cadastrar.');
      return;
    }

    try {
      await addDoc(collection(db, 'imoveis'), {
        ...form,
        quartos: parseInt(form.quartos),
        features: form.features.split(',').map(f => f.trim()),
        timestamp: serverTimestamp()
      });
      Alert.alert('Imóvel cadastrado!', 'O imóvel foi adicionado com sucesso.');
      setForm({
        nome: '',
        localizacao: '',
        descricao: '',
        descricaoDetalhada: '',
        preco: '',
        quartos: '',
        imagem: '',
        features: ''
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o imóvel.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Imóvel</Text>

      {Object.entries({
        nome: 'Nome do imóvel',
        localizacao: 'Localização',
        descricao: 'Descrição curta',
        descricaoDetalhada: 'Descrição detalhada',
        preco: 'Preço (ex: R$ 3.000/mês)',
        quartos: 'Número de quartos',
        imagem: 'URL da imagem',
        features: 'Características (separadas por vírgula)'
      }).map(([key, label]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={label}
          value={form[key]}
          onChangeText={value => handleChange(key, value)}
        />
      ))}

      <View style={styles.buttonArea}>
        <Button title="Cadastrar Imóvel" onPress={handleSubmit} color="#2C3E50" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  buttonArea: {
    marginTop: 10,
  },
});
