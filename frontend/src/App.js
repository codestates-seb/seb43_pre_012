import styled from "styled-components";
import Questions from "./pages/Questions";
import Footer from "./components/Footer";
import TempHeader from "./components/TempHeader";
import { Route, Routes } from "react-router-dom";

const Please = styled.div`
  width: 100vw;
  height: auto;
`;

function App() {
  return (
    <Please>
      <TempHeader />
      <Routes>
        <Route path="/questions" element={<Questions />} />
      </Routes>
      <Footer />
    </Please>
  );
}

export default App;
