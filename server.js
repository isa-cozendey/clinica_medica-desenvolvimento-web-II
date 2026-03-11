const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

let clinica = JSON.parse(fs.readFileSync("clinica.json", "utf-8"));

let clientesEsperando = [];

function salvarNoArquivo() {
    fs.writeFileSync("clinica.json", JSON.stringify(clinica, null, 2));
}

app.get("/status", (req, res) => {
    res.json(clinica);
});

app.get("/esperar-chamada", (req, res) => {
    clientesEsperando.push(res);

    req.on('close', () => {
        clientesEsperando = clientesEsperando.filter(c => c !== res);
    });
});

app.post("/adicionar", (req, res) => {
    const { nome, prioridade } = req.body;
    const novoPaciente = {
        id: Date.now(),
        nome: nome,
        prioridade: parseInt(prioridade)
    };

    clinica.fila.push(novoPaciente);
    clinica.fila.sort((a, b) => b.prioridade - a.prioridade);
    salvarNoArquivo();
    res.json({ mensagem: "Paciente adicionado." });
});

app.post("/chamar", (req, res) => {
    if (clinica.fila.length > 0) {
        clinica.chamadoAtual = clinica.fila.shift();
        salvarNoArquivo();

        clientesEsperando.forEach(resTV => {
            resTV.json(clinica); 
        });
        
        clientesEsperando = [];

        res.json({ mensagem: "Paciente chamado.", proximo: clinica.chamadoAtual });
    } else {
        res.status(400).json({ mensagem: "Fila vazia." });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});