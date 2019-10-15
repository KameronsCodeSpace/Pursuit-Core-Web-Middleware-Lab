document.addEventListener('DOMContentLoaded', () =>{
    aniSearchButton().addEventListener('click', grabAniServer);
    randomButton().addEventListener('click', grabRandomServer);


})

function aniSearchButton() {
    return document.querySelector("#animal-button")
}

function randomButton() {
    return document.querySelector("#random-button")
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

