import express from "express";
import FuncionarioController from "../controllers/funcionarioController";
import ValidaFuncionario from "../validations/funcionario";
import { IErro } from "../models/interfaces";

const router = express.Router();

router.post("/new", function (req: any, res: any, next: any) {
  const erros: IErro[] = [];
  try {
    const funcController = new FuncionarioController();
    const valida = new ValidaFuncionario(funcController);
    const usuario = req.body;
    if (!valida.validaInsert(usuario, erros)) {
      return res.status(406).send(erros);
    }

    funcController.new(usuario);
    res.status(200).json(usuario);
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ errorMessage: msg });
  }
});

router.patch("/update", function (req: any, res: any, next: any) {
  const erros: IErro[] = [];
  try {
    const usuario = req.body;
    const funcController = new FuncionarioController();
    const valida = new ValidaFuncionario(funcController);
    if (!valida.validaUpdate(usuario, erros)) {
      return res.status(406).send(erros);
    }
    funcController.update(usuario);
    res.status(200).json(usuario);
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ errorMessage: msg });
  }
});

router.delete("/delete", function (req: any, res: any, next: any) {
  const erros: IErro[] = [];
  try {
    const id = req.query.id;
    const funcController = new FuncionarioController();
    const valida = new ValidaFuncionario(funcController);
    if (!valida.funcionarioExiste(id, erros)) {
      return res.status(406).send(erros);
    }
    funcController.delete(id);
    res.status(200).json({ mensagem: "Deletado com sucesso" });
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ errorMessage: msg });
  }
});

router.get("/list", function (req: any, res: any, next: any) {
  try {
    const funcController = new FuncionarioController();
    const result = funcController.list();
    res.status(200).json(result);
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ errorMessage: msg });
  }
});

router.get("/query_by_id", function (req: any, res: any, next: any) {
  try {
    const id = req.query.id;
    const funcController = new FuncionarioController();
    const result = funcController.findById(id);
    if (!result) {
      res.status(404).json({ errorMessage: "Funcionário não encontrado" });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ errorMessage: msg });
  }
});

router.get("/query_by_name", function (req: any, res: any, next: any) {
  try {
    const nome = req.query.nome;
    const funcController = new FuncionarioController();
    const result = funcController.findByName(nome);
    if (!result) {
      res.status(404).json({ errorMessage: "Funcionário não encontrado" });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    const msg = (err as any).message;
    res.status(500).json({ errorMessage: msg });
  }
});

export default router;
