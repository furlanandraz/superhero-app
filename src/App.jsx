
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CharactersProvider } from "./context/CharactersContext";
import Main from './ui/layouts/Main';

import './App.css';
import CharactersGrid from "./ui/views/CharactersGrid";
import Error404 from "./ui/views/Error404";

function App() {

  return (
    <CharactersProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Main/>}>
            <Route index element={<CharactersGrid />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CharactersProvider>
  );
}

export default App;
