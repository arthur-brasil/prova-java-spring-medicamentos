# App Expo - Medicamentos

App em Expo (React Native) que consome a API do backend: lista, cadastra (POST) e edita (PUT) medicamentos, mostrando os erros de validação.

```bash
npm install
npx expo start
```

- **Navegador:** aperte `w` (abre em `http://localhost:8081`, origem liberada no CORS do backend).
- **Celular (Expo Go):** o celular não enxerga o `localhost` do computador. Crie o arquivo `.env` nesta pasta com o IP do computador na mesma rede Wi-Fi:
  ```
  EXPO_PUBLIC_API_URL=http://192.168.0.10:8080
  ```
  e rode `npx expo start -c`. No emulador Android use `http://10.0.2.2:8080`.

O backend precisa estar rodando.
