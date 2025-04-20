import { CharactersProvider } from "./context/useCharacters";

import Main from './ui/layouts/Main';
import CharactersGrid from './ui/views/CharactersGrid';

import './App.css';

function App() {

  return (
    <CharactersProvider>
      <Main children={<CharactersGrid/>}/>
    </CharactersProvider>
  );
}

export default App;
