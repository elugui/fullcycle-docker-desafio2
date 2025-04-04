const express = require('express');
const mySql = require('mysql2');

const app = express();
const port = 3000;

const config = {
    host: 'db-mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mySql.createConnection(config);
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    const sql = 'SELECT name FROM people';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Erro ao buscar nomes!');
            return;
        }
        let html = '<h1>Full Cycle Rocks!</h1>';
        html += '<h2>Lista de pessoas castradas</h2>';
        html += '<ul>';
        results.forEach((row) => {
            html += `<li>${row.name}</li>`;
        });
        html += '</ul>';
        html += `
            <br>
            <button onclick="window.location.href='/dialog'">Adicionar</button>
        `;
        res.send(html);
    });
});

app.get('/dialog', (req, res) => {
    const html = `
                <h1>Informe um novo nome</h1>
                <form action="/add" method="POST">
                <label for="name">Nome:</label>
                <input type="text" id="name" name="name" required>
                <button type="submit">Confirmar</button>
                </form>
                `;
    res.send(html);
});

app.post('/add', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO people (name) VALUES (?)';
    connection.query(sql, [name], (err) => {
        if (err) {
            console.error('Error inserting name:', err);
            res.status(500).send('Erro ao adicionar nome!');
            return;
        }
        res.redirect('/');
    });
});

app.get('/healthcheck', (req, res) => {
    const currentDateTime = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    res.json({ status: 'OK', dateTime: currentDateTime });
});

app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).send('Um erro não esperado ocorreu, tente novamente mais tarde.');
});