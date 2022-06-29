
import Container from "@mui/material/Container"
import { Routes, Route } from "react-router-dom"
import { Header } from "./components";
import { Home, PostDetails, Registration, AddPost, Login } from "./pages";


const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;