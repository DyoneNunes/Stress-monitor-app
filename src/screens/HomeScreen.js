import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthProvider';

export default function HomeScreen() {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={{ padding: 20 }}>
      <Text>Bem-vindo, {user?.email}!</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
