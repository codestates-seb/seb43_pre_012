import styled from "styled-components";
import Questions from "./pages/Questions";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import QuestionDetail from "./pages/QuestionDetail";
import Header from "./components/Header";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Wrapper>
      <Footer />
    </>
  );
}

export default App;
