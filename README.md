**Sistema de Gestão de Filas - Clínica Quero Saúde**
Este projeto é um ecossistema de gerenciamento de atendimento médico em tempo real desenvolvido para a disciplina de Desenvolvimento Web II. O foco principal foi implementar diferentes estratégias de comunicação entre cliente e servidor para garantir sincronia entre Recepção, Consultório e Painel de TV.

**Como Executar o Projeto**
- Instalar dependências:
No terminal, dentro da pasta do projeto, rode:

npm install

- Iniciar o servidor:

npm run dev

- Interfaces:

Recepção: http://localhost:3000/atendente.html

Médico: http://localhost:3000/medico.html

Painel TV: http://localhost:3000/tv.html

**Nota importante:** Na tela da TV, é necessário dar um clique em qualquer lugar da página para libertar o áudio (restrição de segurança dos navegadores para autoplay).

**Tecnologias e Arquitetura**
Backend: Node.js com Express.

Persistência: Base de dados local em JSON utilizando o módulo fs.

Frontend: HTML5, CSS3 (Flexbox e Google Fonts) e JavaScript Vanilla.

Estratégias de Comunicação: Implementação híbrida de HTTP Short Polling e HTTP Long Polling.

- Organização do Código
server.js: Core do sistema. Gere as rotas da API, a lógica de ordenação de prioridades e o estado das conexões penduradas (Long Polling) para a TV.

clinica.json: Ficheiro de persistência que guarda a fila e o histórico.

public/: Pasta de ficheiros estáticos:

atendente.html: Cadastro de pacientes com métricas de fila em tempo real.

medico.html: Painel de controle do consultório com atualização via Short Polling.

tv.html: Interface de alta visibilidade com alertas sonoros e atualização imediata via Long Polling.

- Diferenciais Técnicos
Gestão de Prioridades: O sistema reordena a fila automaticamente, colocando pacientes prioritários (Idosos/PCD) no topo no momento do cadastro.

Otimização de Latência: Uso de Long Polling na TV para garantir que o aviso sonoro aconteça no exato milissegundo em que o médico faz a chamada.

UI/UX Moderna: Design focado em legibilidade com a fonte Montserrat, eliminando o aspecto de sistema padrão e focando na experiência de utilizador.

- Bónus Implementados
Logs de monitorização de conexões no servidor.

Tratamento de erros com reconexão automática (resiliência de conexão).

Suporte para múltiplos acessos simultâneos sem perda de estado.
