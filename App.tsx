import { StatusBar } from "expo-status-bar";
import { LogBox, SafeAreaView, StyleSheet } from "react-native";
import Routes from "./Routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" backgroundColor="#eeeeee" />
          <Routes />
        </SafeAreaView>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});
