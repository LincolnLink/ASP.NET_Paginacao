import React from 'react';
import Paginacao from './Paginacao/Index';
import Header from './Header';
import Home from './Home';

function App() {

  const { pathname } = window.location;

  // Sistema de paginação temporario.
  let Component;
  if (pathname === '/paginacao') {
    Component = Paginacao;
  }
  else {
    Component = Home;
  }
  // else if(pathname === '/useEffect'){
  //   Component = UseEffect;
  // }
  

  return (
    <>      
      <h1>Pafinação Exemplo</h1>
      <section>
          <Header />
          <Component />
      </section>     
    </>
  )
}

export default App
