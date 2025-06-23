import Layout from "./components/layout/Layout";
import Detail from "./pages/Detail";

function App() {
  return <Layout children={<Detail />} />;
}

export default App;
