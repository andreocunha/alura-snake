import React, { useEffect } from 'react';
import socket from './server/socket';

export default function App() {
  useEffect(() => { // o useEffect é usado para executar uma função apenas uma vez, quando o componente é montado
    socket.on("bem-vindo", (msg) => { // recebe uma mensagem do servidor com a chamada "bem-vindo", e imprime no console
      console.log(msg);
    });
  }, []);

  // envia uma mensagem para o servidor
  function enviarMensagem() { 
    socket.emit("mensagem", "Olá do cliente!");
  }

  return (
    <div style={styles.container}>
      <h1>TESTE USANDO SOCKET.IO</h1>
      <button onClick={enviarMensagem}>Enviar mensagem</button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  }
}