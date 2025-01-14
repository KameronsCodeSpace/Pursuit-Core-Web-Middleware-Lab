const express = require('express')
const bodyParser = require('body-parser');

const port = 1337;
const app = express();
const species = ['lion', 'tiger', 'bear', 'monkey', 'bird', 'whale', 'fox', 'dog', 'deer'];
let selectedNumbers = [];
let peopleArr = ['xavier', 'michelle', 'corey', 'reed'];

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
    const param = req.params.type;
    console.log(param)
    for(let value of species) {
        if (param === value) {
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
    // console.log(selectedNumbers)
    const floor = req.params.floor;
    const ceil = req.params.ceil;
    let randomNum =  Math.floor(Math.random() * (selectedNumbers.length -1));
    // console.log(selectedNumbers[randomNum])
    res.json({
        status: "Success",
        range: [floor, ceil],
        randPick: selectedNumbers[randomNum]
    })
}

const generateSpread = (req, res, next) => {
    selectedNumbers = [];
    const floor = req.params.floor;
    const ceil = req.params.ceil;
    // console.log("floor", typeof floor)
    for(let i = Number(floor); i <= Number(ceil); i++) {
        selectedNumbers.push(i)
    }
    // console.log("selectedNumbers", selectedNumbers)
    next();

}

// const peek = (req, res, next) => {
//     console.log(peopleArr[peopleArr.length - 1])
//     res.json(
//         {
//             status: "success",
//             data: peopleArr[peopleArr.length - 1]
//         }
//     )
// }

// const enqueue = (req, res, next) => {
//     console.log(req.query['added'])
//     peopleArr.unshift(req.query['added'])
//     res.json(
//         {
//             status: "success",
//             enequeued: req.query['added'],
//             peopleArr
//         }
//     )
// }

// const dequeue = (req, res, next) => {
//     // console.log()
//     let dequeuePerson = peopleArr[peopleArr.length - 1]
//     peopleArr.pop();
//     res.json(
//         {
//             status: "success",
//             dequeued: dequeuePerson,
//             peopleArr
//         }
//     )
// }

const handleQueue = (req,res, next) => {
    if(req.params.action === "peek") {
        res.json(
            {
                status: "success",
                data: peopleArr[peopleArr.length - 1]
            }
        )
    } else if (req.params.action === "enqueue"){
        peopleArr.unshift(req.query['added'])
        res.json(
            {
                status: "success",
                enqueued: req.query['added'],
                peopleArr
            }
        )
    } else if (req.params.action === "dequeue") {
        let dequeuePerson = peopleArr[peopleArr.length - 1]
        peopleArr.pop();
        res.json(
            {
                status: "success",
                dequeued: dequeuePerson,
                peopleArr
            }
        )
    }
}

app.get('/', hello);

app.get('/animal/:type', isAnimal);

app.get('/random/:floor/:ceil', generateSpread, getRandom);

// app.get('/queue/peek', peek);

// app.get('/queue/enqueue', enqueue);

// app.get('/queue/dequeue', dequeue);

app.get('/queue/:action', handleQueue)

app.post('/queue/:action', handleQueue)

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})