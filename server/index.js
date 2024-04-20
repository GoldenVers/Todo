const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

//testing the server connection
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//connect to database

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.t6dukqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Failed to connect to database', err);
    });

//module

const todo = require('./models/Todo');

//routes


{/*  this is the following routes: 

        a route to get all the todos - GET
        a route to add a new todo - POST
        a route to delete a todo - DELETE
        a route to update the status of the todo - PUT
        a route to edit a todo - PUT

*/}

//list out all todos

app.get('/todos', async (req, res) => {
    const todos = await todo.find();
    res.json(todos);
});






//add a new todo

app.post('/todos/new', async (req, res) => {
    const newTodo = new todo({
        title: req.body.title,
        
    });
    await newTodo.save();
    res.json(newTodo);
});

//delete a todo

app.delete('/todos/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result =  await todo.findByIdAndDelete(id);
    console.log('Todo has been deleted!');
    res.json(result);
});

//update the status of todo

app.put('/todos/update/:id', async (req, res) => {
    const id = req.params.id;
    const Updatedtodo = await todo.findById(id);
    Updatedtodo.completed = !Updatedtodo.completed;
    await Updatedtodo.save();

    console.log('Todo has been updated!');
    res.json(Updatedtodo);
});


//edit a todo




app.get('/todos/edit/:id', async (req, res) => {
    const id = req.params.id;
    const EditTodo = await todo.findById(id);

    EditTodo.title = req.body.title;

    //update the date of the todo

    EditTodo.Date = Date.now();
    await EditTodo.save();

    console.log('Todo has been edited!');
    res.json(EditTodo);
});






//test the routes

//list the todos - done
//add a new todo - done
//delete a todo - done
//edit a todo - done
//change the status of the todo - done
//update the date of the todo - done


//the backend is done, lessgo! 

//onto the frontend!

