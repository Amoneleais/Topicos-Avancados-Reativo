const { Subject } = require('rxjs');
const { filter } = require('rxjs/operators');

// Instanciando o objeto subject
const messageStream = new Subject();

// Definindo uma palavra chave. que quando chamada na aplicação vai disparar um evento
const palavraChave = 'programando';

// Cria um stream que filtra as mensagens contendo a palavra chave
const notificationStream = messageStream.pipe(
  filter(message => message.includes(palavraChave))
);

notificationStream.subscribe({
  next: (message) => {
    console.log(`Atenção: '${palavraChave}' mencionada na mensagem { ${message} }`);
  },
  error: (error) => console.error('Erro no stream de notificações:', error),
  complete: () => console.log('\nAtividade encerrada'),
});

// Simulação de chat
messageStream.next('João: Olá!!!');
messageStream.next('Lucas: Opa, como você está?');
messageStream.next('João: Estou programando!');
messageStream.next('Lucas: Bacana.');

// Mais uma simulação de chat
messageStream.next('Miguel: Estou programando uma API em Express!');

// Fim da conversa
messageStream.complete();