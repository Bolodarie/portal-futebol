# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Configuração da API externa
- É necessário um arquivo .env em backend/futebol_stats informando a API Key para que o projeto funcione corretamente.
- Esse arquivo foi disponibilizado na entrega da atividade.

# Rodando o projeto
- Para executar o frontend, abra um terminal e execute os comandos:
  - `npm install`
  - `npm run dev`
  - Acesse a URL exibida no console: http://localhost:5173
- Para executar o backend, abra um terminal e execute os comandos:
  - `python manage.py migrate`
  - `python manage.py runserver`
- Para criar um usuário administrador, execute o comando `python manage.py createsuperuser` e insira suas informações.
- É necessário manter o frontend e o backend rodando ao mesmo tempo para que a aplicação funcione corretamente.
