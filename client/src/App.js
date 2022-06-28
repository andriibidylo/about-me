
import Container from "@mui/material/Container"

import { Header } from "./components";
import { Home, PostDetails, Registration, AddPost, Login } from "./pages";


const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
        {/* <PostDetails /> */}
        {/* <AddPost /> */}
        {/* <Login /> */}
        {/* <Registration /> */}
      </Container>
    </>
  );
}

export default App;