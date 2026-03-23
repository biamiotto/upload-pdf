import AlunoModel from '../models/AlunoModel.js';
import fs from 'fs/promises';
import { processarFoto, removerFoto } from '../utils/fotoHelper.js';

export const uploadFoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado!' });
        }

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O id não é um número válido.' });
        }

        const aluno = await AlunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            removerFoto(req.file.path);
            return res.status(400).json({ error: 'O aluno não possui registro.' });
        }

        if (aluno.foto) {
            await fs.unlink(aluno.foto).catch(() => {});
        }

        aluno.foto = await processarFoto(req.file.path);

        await aluno.atualizar();

        return res.status(201).json({
            message: 'Foto salva com sucesso!',
            data: aluno,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const verFoto = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const aluno = await AlunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            return res.status(404).json({ error: 'Registro do aluno não encontrado.' });
        }

        if (!aluno.foto) {
            return res.status(400).json({
                error: 'Este aluno não tem foto cadastrada!',
            });
        }

        return res.sendFile(aluno.foto, { root: '.' });
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro do aluno.' });
    }
};
