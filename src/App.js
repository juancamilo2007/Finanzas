import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage.jsx";
import RegisterPage from "./pages/RegisterPage"; // Importamos la página de registro
import Inicio from "./pages/inicio.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Ruta de registro */}
        <Route path="/inicio" element={<Inicio />} /> {/*esta es la pagina de inicio*/}
      </Routes>
    </Router>
  );
}

export default App;