# FullCycle - Docker - Desafio 2

Projeto criado para atender aos requisitos do desafio 2 do curso de Docker da FullCycle.

### Observações

- Neste desafio foi utilizada uma imagem Docker *mysql:8*, pois a versão demonstrada no curso não foi compatível com o processador Apple M3.
- Ao utilizar a versão *mysql:8* foi  necessário utilizar o pacote *mysql2* para que a aplicação Noje.js possa autenticar corretamente.
- O banco de dados é inicializado automaticamente e cria a tabela de pessoa.  
- Para tratar a dependências entre os containers foi utilizado o recurso de healthcheck do docker, porém deixei o codigo cometando utilizando o script com dockerize que também funcionou com o container *mysql*.

