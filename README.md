
# Alumov

Alumov é um aplicativo mobile para aluguel de imóveis, construído com React Native utilizando a ferramenta Expo. Ele integra autenticação de usuários e persistência de dados com Firebase Authentication e Firestore. A aplicação segue boas práticas de estruturação de projetos React, separando responsabilidades por pastas, usando componentes funcionais e hooks personalizados.

## Features

- 🔐 Autenticação com Firebase (e-mail/senha)
- 📋 Listagem de imóveis (mock + Firestore)
- 🔍 Filtro de imóveis por nome/descrição
- 📄 Detalhes completos do imóvel com botão de contato
- ➕ Cadastro de novos imóveis via formulário
- ✏️ Edição de imóveis existentes
- ↩️ Navegação com Stack e Drawer Navigation
- ⏳ Controle de loading com `ActivityIndicator`
- 🔙 Botões de retorno em todas as telas apropriadas

## Tech Stack

- **Framework**: React Native (Expo)
- **Navegação**: React Navigation (Stack + Drawer)
- **Backend**: Firebase (Auth + Firestore)
- **State Management**: React Hooks
- **Estilização**: StyleSheet API (inline styles)
- **Ícones**: Expo Vector Icons

## Project Structure

```
/src
  /components        # Reusable components
  /hooks             # Custom hooks (e.g., useAuth)
  /navigation        # Navigation configuration (stack + drawer)
  /screens           # Main screen components
  /services          # Firebase setup and API abstraction
App.js
firebaseConfig.js
```

## Setup & Run

1. Clone the repository  
   `git clone https://github.com/your-username/alumov.git && cd alumov`
2. Install dependencies  
   `npm install`
3. Add your Firebase configuration to `firebaseConfig.js` at the root of the project.
4. Start the development server  
   `npm start`
5. Scan the QR code with Expo Go or use an emulator to preview the app.


