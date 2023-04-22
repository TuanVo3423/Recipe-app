import React from "react";
import AppContainer from "./src/navigations/AppNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider } from "native-base";
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <AppContainer />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
