import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { theme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Box bg="sm.lemon" minH={"100vh"}>
          <Component {...pageProps} />
        </Box>
      </Provider>
    </ChakraProvider>
  );
}
