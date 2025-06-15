[Português](#-português) | [English](#-english)

---

## 🇧🇷 Português

# API de Autenticação e Gerenciamento de Perfil

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## Status do Projeto: Concluído ✔️

## 📝 Descrição

Este projeto é uma API RESTful completa desenvolvida em Node.js com TypeScript, focada em fornecer um sistema de autenticação e gerenciamento de perfil de usuário seguro e robusto. A arquitetura foi construída seguindo os princípios SOLID para garantir um código limpo, escalável e de fácil manutenção.

## ✨ Funcionalidades

- ✅ **Cadastro de Usuários:** Rota pública para criação de novas contas com senhas criptografadas.
- ✅ **Autenticação de Usuários:** Rota pública para login que retorna um token JWT em caso de sucesso.
- ✅ **Gerenciamento de Perfil:** Rotas privadas para:
  - Visualizar os dados do próprio perfil.
  - Atualizar a senha.
  - Deletar a própria conta.
- ✅ **Validação de Dados:** Uso da biblioteca `Zod` para validar todos os dados de entrada, garantindo a integridade e segurança.
- ✅ **Segurança:** Senhas hasheadas com `bcryptjs` e rotas protegidas com `middleware` de autenticação JWT.

## 🛠️ Tecnologias Utilizadas

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Express](https://expressjs.com/)
- **Banco de Dados:**
  - [PostgreSQL](https://www.postgresql.org/)
  - [Prisma](https://www.prisma.io/) (ORM)
- **Segurança:**
  - [JSON Web Token (JWT)](https://jwt.io/)
  - [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Validação:**
  - [Zod](https://zod.dev/)
- **Ambiente de Desenvolvimento:**
  - [ts-node-dev](https://github.com/wclr/ts-node-dev)

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- Uma instância do [PostgreSQL](https://www.postgresql.org/) rodando em sua máquina.

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/PedroAlencarr/auth-api.git](https://github.com/PedroAlencarr/auth-api.git)
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd auth-api
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**

    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Copie o conteúdo do arquivo `.env.example` (se existir) ou use o exemplo abaixo.
    - Substitua os valores pelas suas credenciais do PostgreSQL e crie um segredo para o JWT.

    ```env
    # Exemplo de .env
    DATABASE_URL="postgresql://[USUARIO_POSTGRES]:[SENHA_POSTGRES]@localhost:5432/[NOME_DO_BANCO]"
    JWT_SECRET="[SEU_SEGREDO_SUPER_SECRETO_PARA_O_JWT]"
    ```

5.  **Rode as migrações do Prisma:**
    Este comando irá criar as tabelas no seu banco de dados.

    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:3000`.

## 📖 Estrutura da API (Endpoints)

| Método   | Endpoint          | Protegido? | Descrição                                     | Corpo da Requisição (Exemplo)                                | Resposta de Sucesso (Exemplo)                                  |
| :------- | :---------------- | :--------- | :-------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------- |
| `POST`   | `/users`          | ❌ Não     | Cria um novo usuário.                         | `{"email": "teste@email.com", "password": "senha123"}`       | `201 Created` com `{"id": 1, "email": "teste@email.com", ...}` |
| `POST`   | `/sessions`       | ❌ Não     | Autentica um usuário e retorna um token.      | `{"email": "teste@email.com", "password": "senha123"}`       | `200 OK` com `{"user": {...}, "token": "eyJ..."}`              |
| `GET`    | `/users/profile`  | ✅ Sim     | Retorna os dados do perfil do usuário logado. | (Nenhum)                                                     | `200 OK` com `{"id": 1, "email": "teste@email.com", ...}`      |
| `PUT`    | `/users/password` | ✅ Sim     | Atualiza a senha do usuário logado.           | `{"oldPassword": "senha123", "newPassword": "novaSenha456"}` | `204 No Content`                                               |
| `DELETE` | `/users/profile`  | ✅ Sim     | Deleta a conta do usuário logado.             | (Nenhum)                                                     | `204 No Content`                                               |

## 🏛️ Arquitetura e Princípios

Este projeto foi desenvolvido com uma arquitetura em camadas, baseada nos princípios **SOLID**, para garantir um código desacoplado e de alta coesão.

- **S - Single Responsibility Principle (SRP):** Cada classe e módulo tem uma responsabilidade única e bem definida (ex: `UserRepository` só fala com o banco, `UserService` só lida com regras de negócio).
- **D - Dependency Inversion Principle (DIP):** As camadas de mais alto nível (controllers) não dependem diretamente das de mais baixo nível (repositórios), mas sim de abstrações. (Ex: O `Controller` chama o `Service`, que por sua vez chama o `Repository`).

A estrutura de pastas reflete essa separação:

- `src/routes`: Definição de rotas.
- `src/controllers`: Orquestração do fluxo da requisição.
- `src/services`: Lógica de negócio.
- `src/repositories`: Acesso e manipulação de dados.
- `src/middlewares`: Lógicas transversais como autenticação e validação.

## 👨‍💻 Autor

Feito com ❤️ por **Pedro Alencar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pedroalencarr/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PedroAlencarr)

## ⚖️ Licença

Este projeto está sob a licença MIT.

---

## 🇺🇸 English

# Authentication & Profile Management API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## Project Status: Completed ✔️

## 📝 Description

This project is a comprehensive RESTful API developed in Node.js with TypeScript, focused on providing a secure and robust user authentication and profile management system. The architecture follows SOLID principles to ensure clean, scalable, and maintainable code.

## ✨ Features

- ✅ **User Registration:** Public route for creating new accounts with encrypted passwords.
- ✅ **User Authentication:** Public route for login that returns a JWT token upon successful authentication.
- ✅ **Profile Management:** Private routes for:
  - Viewing own profile data.
  - Updating password.
  - Deleting own account.
- ✅ **Data Validation:** Utilization of the `Zod` library to validate all input data, ensuring integrity and security.
- ✅ **Security:** Passwords hashed with `bcryptjs` and routes protected with JWT authentication `middleware`.

## 🛠️ Technologies Used

- **Backend:**
  - [Node.js](https://nodejs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Express](https://expressjs.com/)
- **Database:**
  - [PostgreSQL](https://www.postgresql.org/)
  - [Prisma](https://www.prisma.io/) (ORM)
- **Security:**
  - [JSON Web Token (JWT)](https://jwt.io/)
  - [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Validation:**
  - [Zod](https://zod.dev/)
- **Development Environment:**
  - [ts-node-dev](https://github.com/wclr/ts-node-dev)

## 🚀 How to Run the Project

### Prerequisites

Before starting, you will need to have the following tools installed on your machine:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- A running instance of [PostgreSQL](https://www.postgresql.org/) on your machine.

### Step-by-Step Guide

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/PedroAlencarr/auth-api.git](https://github.com/PedroAlencarr/auth-api.git)
    ```

2.  **Navigate to the project folder:**

    ```bash
    cd auth-api
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Set up environment variables:**

    - Create a file named `.env` at the root of the project.
    - Copy the contents of the `.env.example` file (if it exists) or use the example below.
    - Replace the values with your PostgreSQL credentials and create a JWT secret.

    ```env
    # .env example
    DATABASE_URL="postgresql://[POSTGRES_USER]:[POSTGRES_PASSWORD]@localhost:5432/[DATABASE_NAME]"
    JWT_SECRET="[YOUR_SUPER_SECRET_JWT_KEY]"
    ```

5.  **Run Prisma migrations:**
    This command will create the tables in your database.

    ```bash
    npx prisma migrate dev
    ```

6.  **Start the server:**
    ```bash
    npm run dev
    ```
    The server will be running at `http://localhost:3000`.

## 📖 API Structure (Endpoints)

| Method   | Endpoint          | Protected? | Description                                | Request Body (Example)                                            | Success Response (Example)                                     |
| :------- | :---------------- | :--------- | :----------------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------- |
| `POST`   | `/users`          | ❌ No      | Creates a new user.                        | `{"email": "test@email.com", "password": "password123"}`          | `201 Created` with `{"id": 1, "email": "test@email.com", ...}` |
| `POST`   | `/sessions`       | ❌ No      | Authenticates a user and returns a token.  | `{"email": "test@email.com", "password": "password123"}`          | `200 OK` with `{"user": {...}, "token": "eyJ..."}`             |
| `GET`    | `/users/profile`  | ✅ Yes     | Returns the logged-in user's profile data. | (None)                                                            | `200 OK` with `{"id": 1, "email": "test@email.com", ...}`      |
| `PUT`    | `/users/password` | ✅ Yes     | Updates the logged-in user's password.     | `{"oldPassword": "password123", "newPassword": "newPassword456"}` | `204 No Content`                                               |
| `DELETE` | `/users/profile`  | ✅ Yes     | Deletes the logged-in user's account.      | (None)                                                            | `204 No Content`                                               |

## 🏛️ Architecture and Principles

This project was developed with a layered architecture, based on **SOLID** principles, to ensure decoupled and highly cohesive code.

- **S - Single Responsibility Principle (SRP):** Each class and module has a single and well-defined responsibility (e.g., `UserRepository` only interacts with the database, `UserService` only handles business logic).
- **D - Dependency Inversion Principle (DIP):** High-level modules (controllers) do not depend on low-level modules (repositories), but on abstractions. (e.g., `Controller` calls `Service`, which in turn calls `Repository`).

The folder structure reflects this separation:

- `src/routes`: Route definitions.
- `src/controllers`: Orchestrates the request flow.
- `src/services`: Business logic.
- `src/repositories`: Data access and manipulation.
- `src/middlewares`: Cross-cutting concerns like authentication and validation.

## 👨‍💻 Author

Made with ❤️ by **Pedro Alencar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pedroalencarr/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PedroAlencarr)

## ⚖️ License

This project is under the MIT License.
