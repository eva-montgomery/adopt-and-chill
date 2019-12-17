let STRAINNAME;
let STRAINID;
let STRAINEFFECTS;
let LOCATION = `30307`;
let cardDeck = document.querySelector(".card-z");
function strainRaceURLGen(race){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/search/race/${race}`;
}

function strainURLGen(strainID, searchy){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/data/${searchy}/${strainID}`;
}

function randomDogURLGenerator(dogBreed){
    return `https://api.petfinder.com/v2/animals/?type=dog&breed=${dogBreed}&location=${LOCATION}&limit=100&status=adoptable`;
}

function formBuilder(){
    let thingy = document.querySelector(".zipcode-button");

    let form = document.createElement("form");
    form.action="";
    form.class="js-form-container";

    let input1 = document.createElement("input");
    input1.className = "js-search-input";
    input1.type = "text";
    //input1.name = "search";
    input1.placeholder = "Enter your Zip Code";

    let input2 = document.createElement("input");
    input2.className = "js-search-btn";
    input2.type = "submit";

    let reset = document.createElement("reset");
    reset.className = "js-search-btn";
    reset.type = "reset";

    form.appendChild(input1);
    form.appendChild(input2);
    form.addEventListener("submit", e => LOCATION = e.target.elements[0].value);

    thingy.appendChild(form);
    thingy.appendChild(reset);
}



function lookInside(o){
    console.log(o);
    return o;
}

function clearCardDeck(passThru){
    cardDeck.textContent = "";
    return passThru;
}

function appendCardToDeck(card){
    cardDeck.appendChild(card);
}

function appendFinalCards(){
    CARDARR.map(card => cardDeck.appendChild(card));
}

function createRaceDOMs(){
    let raceDomArr = [];
    let raceArr = ["Indica", "Sativa", "Hybrid"];
    for (let race of raceArr) {
        let card = document.createElement('div');
        card.className = "js-card";
        card.race = race;
    
        let img = document.createElement('img');
        img.className = "js-card-img-top";
        img.src = `images/${race.toLowerCase()}-dog.png`;
        img.alt = `${race} dog`;
        
        let h5 = document.createElement('h5');
        h5.textContent = race;
        
        card.appendChild(img);
        card.appendChild(h5);
        card.addEventListener('click', raceClick);
        
        raceDomArr.push(card);
    }
    return raceDomArr;
}

function raceClick(event){
    // to add begginer, intermediate, and expert modes, CHANGE THIS FUNCTION!!!!
    // 3 if statements for each different difficulty.
    let domArr=[];
    fetch(strainRaceURLGen(event.currentTarget.race))
        .then(x => x.json())
        .then(selectRandomStrain)
        .then(getStrainInfo)
        .then(clearCardDeck)
        .then(createSingleStrainDOM)
        .then(createNewDog)
        
}

function selectRandomStrain(strainArr){
    let rando = Math.floor(Math.random() * strainArr.length);
    STRAINNAME = strainArr[rando].name;
    STRAINID = strainArr[rando].id;
    return STRAINID;
}

async function getStrainInfo(strainID){
    let URLArr = [strainURLGen(strainID,"desc"),strainURLGen(strainID,"effects"),strainURLGen(strainID,"flavors")]
    let values = await Promise.all(URLArr.map(url => fetch(url).then(r => r.json())));
    return values;
}

function createSingleStrainDOM(infoArr){
    let card = document.createElement('div');
    card.className = "js-card-title";
    
    let h5 = document.createElement("h5");
    h5.className = "js-card-title";
    h5.textContent = "Your new Strain!";

    let img = document.createElement("img");
    img.src = "images/noun_Marijuana_2183514.png";
    img.className = "js-card-img-top";
    img.alt = "weed leaf";

    let p1 = document.createElement('p');
    p1.className = "js-card-text";
    p1.textContent = STRAINNAME;
    
    let p2 = document.createElement('p');
    p2.className = "js-card-text";
    p2.textContent = infoArr[0].desc;
    
    let p3 = document.createElement('p');
    p3.className = "js-card-text";
    STRAINEFFECTS = infoArr[1];
    p3.textContent = effectText(STRAINEFFECTS);
    
    let p4 = document.createElement('p');
    p4.className = "js-card-text";
    p4.textContent = flavorText(infoArr[2]);
    
    card.appendChild(h5);
    card.appendChild(img);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(p3);
    card.appendChild(p4);
    cardDeck.appendChild(card);
}

function effectText(effectObj){
    let posiEffects = "";
    let negEffects = "";
    let medEffects ="";
    for (let effect of effectObj.positive){
        posiEffects = posiEffects + effect + " ";
    }
    for (let effect of effectObj.negative){
        negEffects = negEffects + effect + " ";
    }
    for (let effect of effectObj.medical){
        medEffects = medEffects + effect + " ";
    }
    let effectString = `effects :\n Positive : \n ${posiEffects} \n Negative : \n ${negEffects} \n Medical :\n ${medEffects}`;
    return effectString;
}

function flavorText(flavorObj){
    flavors = "";
    for (let flavor of flavorObj){
        flavors = flavors + flavor + " ";
    }
    let flavorString = `Flavor notes : ${flavors}`;
    return flavorString;
}

function getStrain(strainID){
    fetch(strainURLGen(strainID))
        .then(p => p.json())
        .then(lookInside)
        .then(strainToBreedConverter)
}

function strainToBreedConverter(strainID = STRAINID){
    let dogBreed = dogArr[Math.floor(Math.random() * dogArr.length)];
    // some magic goes here.
    // use global variable STRAINID by default, or pass in another to override.
    return dogBreed;
}

function createNewDog(){
    console.log("createNewDog");
    requestData(randomDogURLGenerator(strainToBreedConverter()))
        .then(r =>{
            if(r.animals.length == 0){
                createNewDog();
            } else{
                buildDogDOM(selectRandDog(r));
            }
        })
}    


function selectRandDog(dogArr){
    console.log('selectRandDog');
    console.log(dogArr);
    let dog = dogArr.animals[Math.floor(Math.random() * dogArr.animals.length)];
    console.log(dog);
    return dog;
}

function buildDogDOM(dogCard){
    let card = document.createElement('div');
    card.className = "js-card-title";
    
    let h5 = document.createElement("h5");
    h5.className = "js-card-title";
    h5.textContent = "Your new Best Friend!";

    let img = document.createElement("img");
    img.src = dogCard.photos[0].full;
    img.className = "js-card-img-top";
    img.alt = "your new best friend!";

    let p1 = document.createElement('p');
    p1.className = "js-card-text";
    p1.textContent = dogCard.name;
    console.log(p1);

    let p2 = document.createElement('p');
    p2.className = "js-card-text";
    p2.textContent = dogCard.description;
    console.log(p2);

    let a = document.createElement('a');
    a.className = "js-adopt-button";
    a.href = dogCard.url;
    a.textContent = `adopt me!!`;
    
    card.appendChild(h5);
    card.appendChild(img);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(a);
    cardDeck.appendChild(card);
}

function main(){
    clearCardDeck();
    // createZipBar();
    raceDomArr.map(appendCardToDeck);
}
getToken();
formBuilder();

const raceDomArr = createRaceDOMs();

window.addEventListener('DOMContentLoaded', main);