import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const imoveisFixos = [
  {
    id: '1',
    imagem: 'https://s2.glbimg.com/xkpyXBFH8qzWJoDTced4Ctxmar8=/smart/e.glbimg.com/og/ed/f/original/2021/01/06/projeto-apartamento-brasilia_10.jpg',
    nome: 'Apartamento SQN 312 - Asa Norte',
    descricao: 'Apartamento moderno com 3 quartos e varanda gourmet.',
    preco: 'R$ 3.200/mês',
    quartos: 3,
    features: ['Piscina', 'Academia', 'Portaria 24h'],
    descricaoDetalhada: 'Localização privilegiada na Asa Norte com ambientes amplos e bem iluminados.'
  },
  {
    id: '2',
    imagem: 'https://s2.glbimg.com/Ow1MVjY4U55sQ59_pmbP0wnj6rA=/smart/e.glbimg.com/og/ed/f/original/2018/12/07/casa-brasilia-samuel-lamas01.jpg',
    nome: 'Casa SQS 412 - Asa Sul',
    descricao: 'Casa térrea com quintal arborizado e garagem para 2 carros.',
    preco: 'R$ 2.500/mês',
    quartos: 2,
    features: ['Área de serviço', 'Cozinha planejada'],
    descricaoDetalhada: 'Ambiente familiar e silencioso próximo ao metrô e parque.'
  },
  {
    id: '3',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvLatZIpvSX4rtAzxews2gWOy_W8hOkQOaGw&s',
    nome: 'Cobertura SHN 104 - Setor Hoteleiro Norte',
    descricao: 'Cobertura de alto padrão com vista panorâmica da cidade.',
    preco: 'R$ 7.000/mês',
    quartos: 4,
    features: ['Jacuzzi', '2 Suítes', 'Espaço gourmet'],
    descricaoDetalhada: 'Cobertura sofisticada com acabamentos premium e segurança 24h.'
  },
  {
    id: '4',
    imagem: 'https://static.arboimoveis.com.br/KN0001_AUG/640x480/foto11716907441101.jpg',
    nome: 'Kitnet CLS 215 - Asa Sul',
    descricao: 'Kitnet compacta ideal para estudantes e solteiros.',
    preco: 'R$ 1.300/mês',
    quartos: 1,
    features: ['Portaria', 'Elevador'],
    descricaoDetalhada: 'Próxima à UnB e estação de metrô, excelente custo-benefício.'
  },
  {
    id: '5',
    imagem: 'https://plantasdecasas.com/wp-content/uploads/2013/04/Sobrado-Brasilia-3-quartos-800px-1.jpg',
    nome: 'Sobrado QI 21 - Lago Sul',
    descricao: 'Sobrado espaçoso com 5 quartos e piscina privativa.',
    preco: 'R$ 10.000/mês',
    quartos: 5,
    features: ['Piscina', 'Churrasqueira', 'Garagem 4 carros'],
    descricaoDetalhada: 'Ideal para famílias grandes, em região nobre com vista para o lago.'
  },
  {
    id: '6',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9f_vUJVOS20cFLhegLJtJ5jrJWVHUZLpKTA&s',
    nome: 'Apartamento QS 08 - Águas Claras',
    descricao: 'Apartamento de 2 quartos com varanda e área de lazer.',
    preco: 'R$ 2.200/mês',
    quartos: 2,
    features: ['Playground', 'Academia', 'Salão de festas'],
    descricaoDetalhada: 'Ambiente jovem e completo, ideal para casais e pequenos núcleos.'
  }
];

export default function DashboardScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [imoveisFirestore, setImoveisFirestore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchImoveis = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'imoveis'), orderBy('timestamp', 'desc'));
        const snapshot = await getDocs(q);
        const dados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setImoveisFirestore(dados);
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchImoveis();
    }
  }, [isFocused]);

  const imoveisCombinados = [...imoveisFixos, ...imoveisFirestore].filter(imovel =>
    imovel.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    imovel.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2C3E50" />
        <Text style={{ marginTop: 12 }}>Carregando imóveis...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imóveis em Destaque</Text>

      <TextInput
        style={styles.input}
        placeholder="Filtrar por nome ou descrição..."
        value={filtro}
        onChangeText={setFiltro}
      />

      <FlatList
        data={imoveisCombinados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { item })}
          >
            {item.imagem ? (
              <Image source={{ uri: item.imagem }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage}>
                <MaterialIcons name="image" size={48} color="#ccc" />
                <Text style={styles.placeholderText}>Imagem do imóvel</Text>
              </View>
            )}
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.preco}>{item.preco}</Text>
              <Text style={styles.quartos}>Quartos: {item.quartos}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2C3E50',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  placeholderImage: {
    height: 180,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    marginTop: 8,
  },
  info: {
    padding: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
  },
  descricao: {
    fontSize: 14,
    color: '#7F8C8D',
    marginVertical: 4,
  },
  preco: {
    fontSize: 16,
    color: '#d3a971',
    fontWeight: 'bold',
  },
  quartos: {
    fontSize: 14,
    color: '#2C3E50',
  },
});
