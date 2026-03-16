import htmlPdf from 'html-pdf-node';
import fs from 'fs';

export async function gerarPdfAluno(aluno) {
    let fotoHtml = '-';

    if (aluno.foto) {
        const base64 = fs.readFileSync(aluno.foto).toString('base64');
        fotoHtml = `<img src="data:image/jpeg;base64,${base64}" width="120"/>`;
    }

    const html = `
    <html>
    <body>
        <h1>Relatório do Aluno</h1>

        <p>Foto: ${fotoHtml}</p>
        <p>Nome: ${aluno.nome}</p>
        <p>Escola: ${aluno.escola || '-'}</p>
        <p>Turma: ${aluno.turma || '-'}</p>
    </body>
    </html>
    `;

    return htmlPdf.generatePdf({ content: html }, { format: 'A4' });
}
