import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Modal,
  Image,
  StatusBar,
} from "react-native";
import { WebView } from 'react-native-webview';
import Header from "../pages/Header";
import FooterNavigation from "../pages/Footer";

export default function Clinicas() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  const clinicas = [
    {
      id: "1",
      local: "PetCare North Shopping",
      endereco:
        "Av. Bezerra de Menezes, 2450 - Pres. Kennedy, Fortaleza - CE, 60325-002\nSegundo Piso",
      telefone: "(85) 9999-9999",
      img: require("../assets/clinica1.png"),
      mapaUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3437296491597!2d-38.56860542502606!3d-3.735057896238839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7497eef567a1d%3A0x59c14c92734a19b7!2sNorth%20Shopping%20Fortaleza!5e0!3m2!1spt-BR!2sbr!4v1747607136166!5m2!1spt-BR!2sbr",
    },
    {
      id: "2",
      local: "PetCare Joquei",
      endereco:
        "Av. Lineu Machado, 419 - Jóquei Clube, Fortaleza - CE, 60520-102\nPrimeiro Piso",
      telefone: "(85) 8888-8888",
      img: require("../assets/clinica2.png"),
      mapaUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.208928364215!2d-38.57461929999999!3d-3.7646571999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74bf9281de4b5%3A0xbfbcad0a85fe0b85!2sNorth%20Shopping%20J%C3%B3quei!5e0!3m2!1spt-BR!2sbr!4v1747667114140!5m2!1spt-BR!2sbr",
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nossas Clínicas</Text>
        {clinicas.map((item) => (
          <View
            key={item.id}
            style={styles.clinicaCard}

          >
            <Text style={styles.clinicaNome}>{item.local}</Text>
            <Text style={styles.clinicaInfo}>{item.endereco}</Text>
            <Text style={styles.clinicaInfo}>{item.telefone}</Text>
            <Image style={styles.image} source={item.img} />
            <TouchableOpacity style={styles.botao}
              onPress={() => {
              setSelectedUrl(item.mapaUrl);
              setVisibleModal(true);
            }}>
            <Text style={styles.textoBotao}
>Visualizar Localização <Image style={{ width: 15, height: 15}} source={require("../assets/mapa.png")} /></Text>
          </TouchableOpacity>
          </View>
        ))}

<Modal visible={visibleModal} transparent={true} onRequestClose={() => setVisibleModal(false)}>
  <View style={styles.modalBackground}>
    <TouchableOpacity onPress={() => setVisibleModal(false)} style={styles.closeButton}>
      <Image style={{ width: 22, height: 22 }} source={require("../assets/fechar.png")} />
    </TouchableOpacity>

    <View style={styles.webviewContainer}>
<WebView
  originWhitelist={['*']}
  source={{
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow: hidden;
              touch-action: none;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: 0;
              pointer-events: auto;
            }
          </style>
        </head>
        <body>
          <iframe
            src="${selectedUrl}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </body>
      </html>
    `
  }}
  style={styles.webview}
  scrollEnabled={false}
/>
    </View>
  </View>
</Modal>

      </ScrollView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87a9a8",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flexGrow: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
    color: "#fff",
    marginLeft: 10,
  },
  clinicaCard: {
    backgroundColor: "#f4f4f4",
    padding: 7,
    borderRadius: 8,
    marginBottom: 12,
  },
  clinicaNome: {
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 4,
    fontSize: 15,
    marginBottom: 2,
  },
  clinicaInfo: {
    marginLeft: 10,
    fontSize: 13,
    color: "#333",
  },
image: {
  width: "95%",
  height: 150,
  alignSelf: "center",
  resizeMode: "cover",
  borderRadius: 8,
  marginTop: 10,
}
,
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
    justifyContent: "center",
  },
  closeButton: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  webviewContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
botao: {
  backgroundColor: "#345c5a",
  paddingVertical: 15,
  borderRadius: 8,
  alignItems: "center",
  marginTop: 10,
  width: "95%", 
  alignSelf: "center",
},
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
