const express = require('express')
const bodyParser = require('body-parser');

const port = 1337;
const app = express();
const species = ['lion', 'tiger', 'bear', 'monkey', 'bird', 'whale', 'fox', 'dog', 'deer'];

app.use(bodyParser.urlencoded({
    extended: false,
}))

const handleCors = (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*")
    next();
}

app.use(handleCors);

const hello = (req, res, next) => {
    console.log("Hello World")
    res.send('Hello World');
}

const isAnimal = (req, res, next) => {
    const query = req.params.type;
    console.log(query)
    for(let value of species) {
        if (query === value) {
            res.json({
                status: "success",
                message: true 
            })
            return;
        } else {
            res.json({
                status: "failure",
                message: false 
            })
            return;
          }
    }
}

const getRandom = (req, res, next) => {

}

app.get('/', hello);

app.get('/animal/:type', isAnimal);

app.get('/random/:floor/:ceil', getRandom);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})