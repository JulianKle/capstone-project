import GlobalStyle from "../styles";
import Header from "../components/Layout/header/Header.js";
import Footer from "../components/Layout/footer/Footer.js";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Header />
        <GlobalStyle />
        <Component {...pageProps} />
        <Footer />
      </SWRConfig>
    </>
  );
}
