import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/Autor.js";
import Livro from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await Livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await Livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (!autorEncontrado) {
        return res.status(404).json({
          message: "autor não encontrado",
        });
      }

      const livroCompleto = {
        ...novoLivro,
        autor: autorEncontrado._doc,
      };

      const livroCriado = await Livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "Criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await Livro.findByIdAndUpdate(id, req.body);
      if (livroResultado !== null) {
        res.status(200).send({ message: "livro atualizado" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await Livro.findByIdAndDelete(id);
      if (livroResultado !== null) {
        res.status(200).send({ message: "livro excluido com sucesso@" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await Livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
