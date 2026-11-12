# Prova Java Spring - API de Medicamentos

API REST para gerenciar o catálogo de medicamentos de uma rede de farmácias (prova teste de Java Spring - FATEC Itu).

## Tecnologias
- Java 25
- Spring Boot 4.1.0 (Web MVC, Data JPA, Validation)
- H2 em memória + H2 Console

## Como rodar
```bash
./mvnw spring-boot:run
```
A API sobe em `http://localhost:8080`.

H2 Console: `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:mem:farmacia`, usuário `sa`, sem senha).

## Endpoints
| Método | Rota | Descrição |
|---|---|---|
| GET | `/medicamentos` | Lista todos os medicamentos |
| POST | `/medicamentos` | Cadastra um medicamento (201 + Location) |
| PUT | `/medicamentos/{id}` | Atualiza um medicamento (204) |

Exemplo de corpo (POST/PUT):
```json
{
  "nome": "Dipirona",
  "fabricante": "EMS",
  "preco": 12.5,
  "quantidadeEstoque": 100,
  "controlado": false
}
```
Dados inválidos retornam **400 Bad Request**.

## Organização em camadas
`entity`, `repository`, `service`, `controller`, `dto`, `mapper` (e `config` para o CORS).

## Padrão de commits
[Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat:`, `fix:`, `chore:`, `docs:`, `test:`.
