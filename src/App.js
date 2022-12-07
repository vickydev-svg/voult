
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import CoinPage from './Pages/CoinPage/CoinPage';
import ProjectToken from './Components/ProjectToken/ProjectToken';
function App() {

  return (
    <div className="App">
      <Header/>
     <Routes>
     <Route path="/" element={<HomePage />} exact />
     <Route path = "/coins/:id" element={<CoinPage/>}/>
     <Route
            path="/project-token/:id"
            element={<ProjectToken />}
          />
     </Routes>
    </div>
  );
}

export default App;
