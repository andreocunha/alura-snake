const PORT = process.env.PORT || 4000; // process.env.PORT eh usado pelo Heroku

// importa o socket.io, define a porta e resolve o problema do cors
const io = require('socket.io')(PORT, {
  cors: {
    origin: '*'
  }
});

io.on( "connection", (socket) => {
  console.log("NOVA CONEXAO: " + socket.id); // socket.id é o id do cliente que se conectou

  io.emit("bem-vindo", "Olá do servidor!"); // envia uma mensagem de boas vindas para TODOS os clientes (por causa do io)

  socket.on("mensagem", (msg) => { // recebe uma mensagem do cliente com a chamada "mensagem", e imprime no console
    console.log(msg);
  });

  socket.on("disconnect", () => { // quando o cliente desconectar, imprime no console
    console.log("CONEXAO DESFEITA: " + socket.id);
  })

})