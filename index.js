// document.addEventListener("DOMContentLoaded", async () => {
//     console.log("DOM LOADED")
//     let url = 'http://localhost:1337/animal'
//     try{
//         let response = await axios.post(url)
//         console.log(response)
//     } catch(err) {
//         console.log(err)
//     }
// })

document.addEventListener('DOMContentLoaded', () =>{
    aniSearchButton().addEventListener('click', grabAniServer)
})

function aniSearchButton() {
    return document.querySelector("#animal-button")
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

function appendAnimal(resp) {
    console.log(resp);
        let animalReplyArea = document.querySelector('#animal-response');

        let newResp = document.createElement('p');
    
        newResp.innerText = resp.message;
        
        animalReplyArea.appendChild(newResp);

    // for(let i = 0; i < resp.length; i++) {
    //     let giphyGifs = document.querySelector('#giphy');

    //     let newImg = document.createElement('img');
    
    //     newImg.src = resp[i];
    //     newImg.id = "theseGifImages"
        
    //     giphyGifs.appendChild(newImg);
    // }
    // console.log("WORK", resp[10])
}

