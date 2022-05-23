import { BrowserRouter, Routes, Route } from "react-router-dom";
import Application from "./pages/Application/Application";
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Application/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
