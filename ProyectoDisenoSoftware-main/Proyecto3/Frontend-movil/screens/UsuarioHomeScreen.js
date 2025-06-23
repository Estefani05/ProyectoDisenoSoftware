import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';

const API_URL = 'http://192.168.100.28:3001/api'; // Cambia la IP si es necesario
const FILES_URL = 'http://192.168.100.28:3001';   // Para acceder a /uploads

export default function UsuarioHomeScreen() {
  const [articulos, setArticulos] = useState([]);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articulosRes, slidesRes] = await Promise.all([
          axios.get(`${API_URL}/articulos/listar`),
          axios.get(`${API_URL}/carrusel`)
        ]);
        setArticulos(articulosRes.data);
        setSlides(slidesRes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleVerPDF = async (rutaPDF) => {
    if (rutaPDF) {
      await WebBrowser.openBrowserAsync(`${FILES_URL}${rutaPDF}`);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrusel</Text>
      <FlatList
        horizontal
        data={slides}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: `${FILES_URL}${item.ruta_imagen}` }} style={styles.slideImage} />
        )}
        style={styles.carousel}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.title}>Artículos Médicos</Text>
      <FlatList
        data={articulos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.articleCard}>
            <Text style={styles.articleTitle}>{item.titulo}</Text>
            <Text>{item.descripcion}</Text>
            {item.archivo_url && (
              <Button
                title="Ver PDF"
                onPress={() => handleVerPDF(item.archivo_url)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  carousel: { marginBottom: 20 },
  slideImage: { width: 250, height: 150, marginRight: 10, borderRadius: 8 },
  articleCard: { marginBottom: 16, padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8 },
  articleTitle: { fontSize: 18, fontWeight: 'bold' }
});