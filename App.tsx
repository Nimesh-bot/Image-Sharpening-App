import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Routes from './Routes';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor='#eeeeee' />
          <Routes />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
