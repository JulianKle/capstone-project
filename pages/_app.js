import GlobalStyle from "../styles";
import Header from "../components/Layout/header/Header.js";
import Footer from "../components/Layout/footer/Footer.js";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
