# Gerenciador de Tarefas

## Objetivo

Este sistema deve permitir que um usuário crie tarefas, atribua a um responsável, adicione uma descrição e defina uma data de conclusão. O usuário também deve poder editar ou excluir tarefas existentes.

## Funcionalidades

- [x]    - Sistema de autenticação
- [x]    - Página de listagem de tarefas
- [x]    - Página de criação de tarefas
- [x]    - Página de edição de tarefas
- [x]    - Modal de confirmação de exclusão de tarefa
- [x]    - Filtragem e ordenação de tarefas
- [ ]    - Realizar a conteinerização do projeto com Docker.

## Tecnologias utlizadas

- Laravel
- React in TS
- Ant-Design
- Postgres

## Instalação

1. Clone o repositório

```bash
git clone https://github.com/natanaeldeveloper/test-todo-list-app.git
```

## Configuração e inicialização do back-end

1. acesse a pasta `backend` do projeto
```bash
cd test-todo-list-app/backend
```
2. Copie o arquivo `.env.example` para `.env`
```
cp .env.example .env
```
3. Configure seu `.env` especificando o banco, usuário e senha
```js
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todolist
DB_USERNAME=postgres
DB_PASSWORD=
```
4. Instale as dependências do composer
```bash
composer install
```
5. Gere uma `key` para o projeto
```bash
php artisan key:generate
```
6. Execute as migrations do projeto
```bash
php artisan migrate
```
7. Execute as seeders do projeto. 
```bash
php artisan db:seed

# Este comando persistirá no banco 30 usuários e 100 tarefas aleatoriamente.
```
8. Inicialize o servidor e pronto. O back-end já estará em execução!
```bash
php artisan serve

# http://localhost:8000
```

## Configuração e inicialização do front-end
1. acesse a pasta `frontend` do projeto
```bash
cd test-todo-list-app/frontend
```
2. Instale as dependências via `npm`
```bash
npm install
```
3. Execute o seguinte comando para buildar o projeto
```bash
npm run build
```
4. Inicialize o projeto e pronto! o front-end já estará disponível para acesso!
```bash
npm run preview

# vite preview
#  ➜  Local:   http://127.0.0.1:4173/
#  ➜  Network: use --host to expose
```
5. Basta acessar o endereço `http://127.0.0.1:4173` no seu navegador para acessar a aplicação. 
