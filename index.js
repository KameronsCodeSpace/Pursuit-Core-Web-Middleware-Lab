document.addEventListener('DOMContentLoaded', () =>{
    aniSearchButton().addEventListener('click', grabAniServer);
    randomButton().addEventListener('click', grabRandomServer);
    peekButton().addEventListener('click', grabPeekServer);
    enqueueButton().addEventListener('click', grabEnqueueServer);
    dequeueButton().addEventListener('click', grabDequeueServer);
})

function aniSearchButton() {
    return document.querySelector("#animal-button")
}

function randomButton() {
    return document.querySelector("#random-button")
}

function peekButton() {
    return document.querySelector("#peek-button")
}

function enqueueButton() {
    return document.querySelector("#enqueue-button")
}

function dequeueButton() {
    return document.querySelector("#dequeue-button")
}

function grabAniServer() {

    let userSearch = document.querySelector("#animal-input");

    fetch(`http://localhost:1337/animal/${userSearch.value}`)
    .then((response) => {
        return response.json();
    })
    .then(info => {
        appendAnimal(info);
    })
}

function grabRandomServer() {
    let userFloor = document.querySelector("#num1").value;
    let userCeil = document.querySelector("#num2").value;

    fetch(`http://localhost:1337/random/${userFloor}/${userCeil}`)
    .then((response) => {
        return response.json();
    })
    .then(info => {
        appendRandomNum(info);
    })
}

async function grabPeekServer() {
    const myURL = `http://localhost:1337/queue/peek`
    const resp = await axios.get(myURL) 
        appendPeekStatus(resp);
}

async function grabDequeueServer() {
    const myURL = `http://localhost:1337/queue/dequeue`
    const resp = await axios.get(myURL) 
        appendDequeueStatus(resp);
}

async function grabEnqueueServer() {
    let enteredLine = document.querySelector("#line-input").value;
console.log(enteredLine)
        const myURL = `http://localhost:1337/queue/enqueue?added=${enteredLine}`
        const resp = await axios.post(myURL) 
        appendEnqueueStatus(resp);
}

function appendAnimal(resp) {
    console.log(resp);
        let animalReplyArea = document.querySelector('#animal-response');

        let newResp = document.createElement('p');
    
        newResp.innerText = resp.message;
        
        animalReplyArea.appendChild(newResp);
}

function appendRandomNum(resp) {
    console.log('resp', resp);
    let randomReplyArea = document.querySelector('#random-response');

    let newResp = document.createElement('p');

    newResp.innerText = `${resp.status}, the random number between ${resp.range[0]} and ${resp.range[1]} is ${resp.randPick}`;
    
    randomReplyArea.appendChild(newResp);
}

function appendEnqueueStatus(resp) {
    console.log(resp);
    let lineStatusHolder = document.querySelector('#status-update');
    let newStatus = document.createElement('p');

    newStatus.innerText = `${resp.data.enqueued} added to list ${resp.data.peopleArr}`

    lineStatusHolder.appendChild(newStatus);

}

function appendDequeueStatus(resp) {
    console.log(resp);
    let lineStatusHolder = document.querySelector('#status-update');
    let newStatus = document.createElement('p');

    newStatus.innerText = `${resp.data.dequeued} removed from list ${resp.data.peopleArr}`

    lineStatusHolder.appendChild(newStatus);

}

function appendPeekStatus(resp) {
    console.log(resp);
    let lineStatusHolder = document.querySelector('#status-update');
    let newStatus = document.createElement('p');

    newStatus.innerText = `${resp.data.data} is in front of the line`

    lineStatusHolder.appendChild(newStatus);

}
