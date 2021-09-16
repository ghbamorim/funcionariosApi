# Gerenciador de funcionários

## Api-service
Api para gerenciamento de funcionários
### Instruções:
Instale as dependências:
  `npm install`;  
Inicialize o serviço:  
`npm start`;  
Testes:  
`npx jest`   
#### Swagger
You can access Swagger interface by accessing the host followed by /docs route. Eg.: 
`http://127.0.0.1:3001/docs`
# Accessing quotes
It should be done in Api-service.  
Register a valid email using /register route. Use the given token to access the following routes:  
/stock  
/history  
/stats  
Bearer token must be provided on Authentication header  
[Bearer example](auth.jpg?raw=true)  
**After registering an user and getting a token, there is no need to inform user on those 3 routes. User will stay linked to the token until it expires. After that, you should register again to retrieve a new one**
## Important notes about the Challenge
- I planned using Sequelize with Postgres database, but it would require the database setup for the evaluators. So, I decided to use a simple local json database instead;  
- The challenge required to inform user and password authentication, but I choose to use only the jwt token, as it's linked to the user from /register route.  
