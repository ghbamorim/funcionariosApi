const app = require("../app");
const request = require("supertest");

const funcionarioTeste = {
  id: 0,
  nome: "funcionario_de_teste",
  segundo_nome: "funcionario_de_teste2",
  cargo: "Testador",
};

/*Esse deve ser executado primeiro, para limpar algum resíduo */
beforeAll(async () => {
  let status = 200;
  let res = undefined;

  while (status === 200) {
    console.log(`/funcionarios/query_by_name?nome=${funcionarioTeste.nome}`);
    res = await request(app).get(
      `/funcionarios/query_by_name?nome=${funcionarioTeste.nome}`
    );
    const func = res.body;
    status = res.statusCode;
    if (status === 200) {
      await request(app).delete(`/funcionarios/delete?id=${func.id}`);
    }
  }
  return true;
});

afterAll(async () => {
  return await request(app).delete(
    `/funcionarios/delete?id=${funcionarioTeste.id}`
  );
});

test("Inserindo novo funcionário", async () => {
  const res = await request(app).post("/funcionarios/new").send({
    nome: funcionarioTeste.nome,
    cargo: funcionarioTeste.cargo,
  });
  const novoUsuario = res.body;

  expect(novoUsuario).toHaveProperty("id");
  expect(novoUsuario).toHaveProperty("nome");
  expect(novoUsuario).toHaveProperty("cargo");
  expect(novoUsuario.nome).toEqual(funcionarioTeste.nome);
  expect(novoUsuario.cargo).toEqual(funcionarioTeste.cargo);
  funcionarioTeste.id = novoUsuario.id;
});

test("Inserindo funcionário duplicado", async () => {
  const res = await request(app).post("/funcionarios/new").send({
    nome: funcionarioTeste.nome,
    cargo: funcionarioTeste.cargo,
  });
  expect(res.statusCode).toBe(406);
});

test("Inserindo funcionário faltando campos", async () => {
  const res = await request(app).post("/funcionarios/new").send({
    nome: "",
    cargo: "",
  });
  expect(res.statusCode).toBe(406);
});

test("editando funcionário", async () => {
  const res = await request(app).patch("/funcionarios/update").send({
    id: funcionarioTeste.id,
    nome: funcionarioTeste.segundo_nome,
    cargo: funcionarioTeste.cargo,
  });
  const novoUsuario = res.body;
  expect(novoUsuario).toHaveProperty("id");
  expect(novoUsuario).toHaveProperty("nome");
  expect(novoUsuario).toHaveProperty("cargo");
  expect(novoUsuario.nome).toEqual(funcionarioTeste.segundo_nome);
  expect(novoUsuario.cargo).toEqual(funcionarioTeste.cargo);
});

test("validando edição", async () => {
  const res = await request(app).patch("/funcionarios/update").send({
    id: funcionarioTeste.id,
    nome: "",
    cargo: "",
  });
  expect(res.statusCode).toBe(406);
});

test("excluindo funcionário", async () => {
  let res = await request(app).delete(
    `/funcionarios/delete?id=${funcionarioTeste.id}`
  );
  expect(res.statusCode).toBe(200);

  res = await request(app).get(
    `/funcionarios/query_by_id?id=${funcionarioTeste.id}`
  );
  expect(res.statusCode).toBe(404);
});
