let strainName = '';
let strainID = 1758;
let strainDescription;
let strainEffects;
let strainFlavors;
function strainRaceURLGen(race){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/search/race/${race}`;
}

function strainURLGen(strainID, searchy){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/data/${searchy}/${strainID}`;
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
    
    let cardDeck = document.querySelector(".card-z");
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

async function getStrainInfo(strainID){
    let URLArr = [strainURLGen(strainID,"desc"),strainURLGen(strainID,"effects"),strainURLGen(strainID,"flavors")]
    let values = await Promise.all(URLArr.map(url => fetch(url).then(r => r.json())));
    return values;
}

function createSingleStrainDOM(strainObj){
    getStrainInfo(strainObj.id)
        .then(infoArr => {
            let cardDeck = document.querySelector(".card-z");
            let card = document.createElement('div');
            card.className = ".js-card-title";
            
            let h5 = document.createElement("h5");
            h5.className = ".js-card-title";
            h5.textContent = "Your new Strain!";

            let img = document.createElement("img");
            img.src = "images/noun_Marijuana_2183514.png";
            img.className = ".js-card-img-top";
            img.alt = "weed leaf";

            let p1 = document.createElement('p');
            p1.className = ".js-card-text";
            p1.textContent = strainObj.name;
            console.log(p1);

            let p2 = document.createElement('p');
            p2.className = ".js-card-text";
            p2.textContent = infoArr[0].desc;
            console.log(p2);
            console.log(infoArr[0]);

            let p3 = document.createElement('p');
            p3.className = ".js-card-text";
            p3.textContent = effectText(infoArr[1]);
            console.log(p3);
            console.log(infoArr[1]);

            let p4 = document.createElement('p');
            p4.className = ".js-card-text";
            p4.textContent = flavorText(infoArr[2]);
            console.log(p4);
            console.log(infoArr[2]);

            cardDeck.textContent = "";
            card.appendChild(h5);
            card.appendChild(img);
            card.appendChild(p1);
            card.appendChild(p2);
            card.appendChild(p3);
            card.appendChild(p4);
            cardDeck.appendChild(card);
        })
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

function strainToBreedConverter(strainObj){
    // some magic goes here.
    console.log(strainObj);
    return "Pomeranian";
}

// getAllOfRace('Sativa');
// getStrain(strainID);

createRaceDOMs();

// console.log(getStrainInfo(255));
