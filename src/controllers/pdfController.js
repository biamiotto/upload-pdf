import AlunoModel from '../models/AlunoModel.js'
import { gerarPdfTodos, gerarPdfAluno } from '../utils/pdfHelper.js';

export const relatorioTodos = async (req, res) => {
    try {
        const resgistros = await AlunoModel.buscarTodos();

        if (!resgistros || resgistros.length === 0) {
            return res.status(200).json({ message: 'Nenhum relatório encontrado. ' });
        }

        const pdf = await gerarPdfTodos(resgistros);
        return res
            .set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="alunos.pdf"',
            })
            .send(pdf);
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        return res.status(500).json({ error: 'Erro ao gerar o relatório. ' });
    }
};

export const relatorioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const aluno = await gerarPdfAluno(aluno);

        if (!aluno) {
            return res.status(404).json({ error: 'Registro do aluno não encontrado.' });
        }

        return res
        .set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="alunos.pdf"',
            })
    } catch (error) {
        console.error('Erro ao buscar PDF aluno:', error);
        res.status(500).json({ error: 'Erro ao buscar registro do PDF do aluno.' });
    }
};
