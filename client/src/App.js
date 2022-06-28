
import Container from "@mui/material/Container"
import { Home } from "./pages/Home"
import {Header} from "./components/Header"


const App = () => {
  return (
    <>
    <Header/>
      <Container maxWidth="lg">
      <Home />
      </Container>
    </>
  );
}

export default App;