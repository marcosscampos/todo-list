const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const todoRoutes = express.Router()
const PORT = 4000
const Todo = require('./todo.model')

app.use(cors())
app.use(bodyParser.json())


/*Conexão com o banco de dados*/
mongoose.connect('mongodb+srv://mirlock:<password>@cluster0-dxblw.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
const connection = mongoose.connection

connection.once('open', function () {
  console.log("A conexão com o banco de dados foi concluída!")
})

/*Sistema de rotas*/
todoRoutes.route('/').get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err)
    } else {
      res.json(todos)
    }
  })
})

todoRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id
  Todo.findById(id, function (err, todo) {
    res.json(todo)
  })
})

todoRoutes.route('/update/:id').post(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo)
      res.status(404).send("Dados não encontrado");
    else
      todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo.save().then(todo => {
      res.json('To-Do Atualizado!');
    })
      .catch(err => {
        res.status(400).send("Não foi possível atualizar");
      });
  });
});

todoRoutes.route('/add').post(function (req, res) {
  let todo = new Todo(req.body);
  todo.save()
    .then(todo => {
      res.status(200).json({ 'todo': 'To-Do criado com sucesso!' });
    })
    .catch(err => {
      res.status(400).send('Erro ao adicionar um  novo To-Do');
    });
});

app.use('/todos', todoRoutes)

/*Conexão com o servidor*/
app.listen(PORT, function () {
  console.log(`O servidor está rodando na porta: ${PORT}`)
})
