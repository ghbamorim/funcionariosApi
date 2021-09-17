# Gerenciador de funcionários  
Api para gerenciamento de funcionários  
### Instruções:
Instale as dependências:  
  `npm install`;  
Inicialize o serviço:  
`npm start`;  
Testes:  
`npx jest`   
#### Swagger
Você pode acessar a interface do Swagger pela rota /docs. Ex.:  
http://3.129.218.243:3001/docs
#### Serverless
Os arquivos das funções lambda estão na pasta ./serverless/lambda.  
Existe uma instância da aplicação sendo executada no Aws no endereço: http://3.129.218.243:3001  
As funções lambda estão apontando para este endereço.
Foi utilizado o framework serverless (https://serverless.com).
Para fazer o deploy, após se autenticar no Aws, execute o seguinte comando dentro da pasta ./serverless/lambda:  
`serverless deploy -v`;  
 ***Apenas as rotas get estão funcionando via lambda(todas estão funcinando normalmente por acesso direto ao Aws):***  
 http://3.129.218.243:3001/funcionarios/list  
 https://j4gy0d50wi.execute-api.us-east-1.amazonaws.com/dev/byid?id=1  
 https://j4gy0d50wi.execute-api.us-east-1.amazonaws.com/dev/byname?nome=Gustavo+Amorim  