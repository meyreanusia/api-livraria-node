import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O titulo do livro é obrigatório!"],
    },
    editora: { type: String, required: [true, "A Autora é obrigatório!"] },
    preco: { type: Number },
    paginas: { type: Number },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O Autor(a) é obrigatório!"],
    },
  },
  { versionKey: false }
);

const Livro = mongoose.model("Livros", livroSchema);

export default Livro;
