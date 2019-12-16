let strainName = '';
let strainID = 1758;
let strainDescription;
let strainEffects;
let strainFlavors;
function strainRaceURLGen(race){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/search/race/${race}`;
}

function strainURLGen(strainID){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/data/effects/${strainID}`;
}


function lookInside(o){
    console.log(o);
    return o;
}

function getAllOfRace(race){
    return fetch(strainRaceURLGen(race))
        .then(p => p.json())
        .then(lookInside)
        .then(createRandomStrainDOM)
        // .then(createStrainDOMs)
}

function createRaceDOMs(){
    
    let cardDeck = document.querySelector(".card-deck");
    let raceArr = ["Indica", "Sativa", "Hybrid"];
    for (let race of raceArr) {
        let card = document.createElement('div');
        card.className = ".js-card";
        card.race = race;
        let img = document.createElement('img');
        img.src = `images/${race.toLowerCase()}-dog.png`;
        img.alt = `${race} dog`;
        
        let h5 = document.createElement('h5');
        h5.textContent = race;
        
        card.appendChild(img);
        card.appendChild(h5);
        card.addEventListener('click', raceClick);
        cardDeck.appendChild(card);
    }
}

function raceClick(event){
    console.log(event);
    console.log(event.currentTarget.race);
    fetch(strainRaceURLGen(event.currentTarget.race))
        .then(x => x.json())
        .then(lookInside)
        .then(selectRandomStrain)
        .then(lookInside)
        .then(createSingleStrainDOM)
}

function createStrainDOMs(strainsObjArr){
    console.log(strainsObjArr);
    for (let strain of strainsObjArr){
        createSingleStrainDOM(strain);
    }
    
    // strainsArr = Object.keys(strainsObj);
    //iterates thru all the strains of a race and creates a clickable DOM DIV for each, style TBD.
    // onClick function should set both the strainName and strainID global vars
}

function selectRandomStrain(strainArr){
    let rando = Math.floor(Math.random() * strainArr.length);
    return strainArr[rando];
}


function createSingleStrainDOM(strainObj){
    let card = document.createElement('div');
}

function getStrain(strainID){
    fetch(strainURLGen(strainID))
        .then(p => p.json())
        .then(lookInside)
        .then(strainToBreedConverter)
}

function strainToBreedConverter(strainObj){
    // some magic goes here.
    console.log(strainObj);
    return "Pomeranian";
}

// getAllOfRace('Sativa');
// getStrain(strainID);

createRaceDOMs();


