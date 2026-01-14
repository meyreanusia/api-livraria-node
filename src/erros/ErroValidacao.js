import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const messagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${messagensErro}`);
  }
}

export default ErroValidacao;
