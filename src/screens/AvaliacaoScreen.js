import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { db } from '../Firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const perguntas = [
  'Como você se sentiu mentalmente hoje?',
  'Teve dificuldade de concentração?',
  'Se sentiu fisicamente cansado(a)?',
  'Sentiu ansiedade ou irritação fora do comum?',
];

export default function AvaliacaoScreen() {
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));

  const responder = (index, valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = valor;
    setRespostas(novasRespostas);
  };

  const enviarAvaliacao = async () => {
    if (respostas.includes(null)) {
      Alert.alert('Responda tudo!', 'Por favor, responda todas as perguntas antes de enviar.');
      return;
    }

    try {
      await addDoc(collection(db, 'avaliacoes'), {
        respostas,
        data: Timestamp.now(),
      });

      Alert.alert('Obrigado!', 'Sua avaliação foi salva com sucesso.');
      setRespostas(Array(perguntas.length).fill(null));
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Avaliação Diária</Text>

      {perguntas.map((pergunta, index) => (
        <View key={index} style={styles.perguntaBox}>
          <Text style={styles.pergunta}>{pergunta}</Text>
          <View style={styles.botoes}>
            {[1, 2, 3, 4, 5].map((valor) => (
              <TouchableOpacity
                key={valor}
                style={[
                  styles.botao,
                  respostas[index] === valor && styles.botaoSelecionado,
                ]}
                onPress={() => responder(index, valor)}
              >
                <Text style={styles.botaoTexto}>{valor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.enviarBotao} onPress={enviarAvaliacao}>
        <Text style={styles.enviarTexto}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  perguntaBox: {
    marginBottom: 25,
  },
  pergunta: {
    fontSize: 16,
    marginBottom: 10,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSelecionado: {
    backgroundColor: '#5e60ce',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
  enviarBotao: {
    backgroundColor: '#5e60ce',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  enviarTexto: {
    color: '#fff',
    fontSize: 18,
  },
});
