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

function grabPeekServer() {
    fetch(`http://localhost:1337/queue/peek`)
    .then((response) => {
        return response.json();
    })
    .then(info => {
        appendQueueStatus(info);
    })
}

function grabDequeueServer() {
    fetch(`http://localhost:1337/queue/dequeue`)
    .then((response) => {
        return response.json();
    })
    .then(info => {
        appendQueueStatus(info);
    })
}

function grabEnqueueServer() {
    let enteredLine = document.querySelector("#line-input").value;
console.log(enteredLine)
    fetch(`http://localhost:1337/enqueue?added=${enteredLine}`)
    .then((response) => {
        return response.json();
    })
    .then(info => {
        appendQueueStatus(info);
    })
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

function appendQueueStatus(resp) {
    console.log(resp);
    let userNameEntered = document.querySelector('#status-update');

}