import React from "react";
import AppContainer from "./src/navigations/AppNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
import { LogBox } from "react-native";
const queryClient = new QueryClient();
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <AppContainer />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
