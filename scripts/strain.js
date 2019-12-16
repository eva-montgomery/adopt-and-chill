let STRAINNAME;
let STRAINID;
let STRAINDESCRIPTION;
let STRAINEFFECTS;
let STRAINFLAVORS;
let LOCATION = `30307`;
let STRAINDOGDOMARR = [];
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
        cardDeck.appendChild(card);
    }
}

function raceClick(event){
    // to add begginer, intermediate, and expert modes, CHANGE THIS FUNCTION!!!!
    // 3 if statements for each different difficulty.

    // console.log(event);
    // console.log(event.currentTarget.race);
    fetch(strainRaceURLGen(event.currentTarget.race))
        .then(x => x.json())
        //.then(lookInside)
        .then(selectRandomStrain)
        //.then(lookInside)
        .then(createSingleStrainDOM)
        .then(clearCardDeck)
        .then(appendCardToDeck)
        .then(createNewDog)
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
    STRAINID = strainArr[rando].id;
    return strainArr[rando];
}

async function getStrainInfo(strainID){
    let URLArr = [strainURLGen(strainID,"desc"),strainURLGen(strainID,"effects"),strainURLGen(strainID,"flavors")]
    let values = await Promise.all(URLArr.map(url => fetch(url).then(r => r.json())));
    return values;
}

function clearCardDeck(passThru){
    let cardDeck = document.querySelector(".card-z");
    cardDeck.textContent = "";
    return passThru;
}

function appendCardToDeck(card){
    let cardDeck = document.querySelector(".card-z");
    cardDeck.appendChild(card);
}

function createSingleStrainDOM(strainObj){
    return getStrainInfo(strainObj.id)
        .then(infoArr => {
            let cardDeck = document.querySelector(".card-z");
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
            STRAINNAME = strainObj.name;
            p1.textContent = STRAINNAME;
            console.log(p1);

            let p2 = document.createElement('p');
            p2.className = "js-card-text";
            STRAINDESCRIPTION = infoArr[0].desc;
            p2.textContent = STRAINDESCRIPTION;
            console.log(p2);
            console.log(infoArr[0]);

            let p3 = document.createElement('p');
            p3.className = "js-card-text";
            STRAINEFFECTS = infoArr[1];
            p3.textContent = effectText(STRAINEFFECTS);
            console.log(p3);
            console.log(infoArr[1]);

            let p4 = document.createElement('p');
            p4.className = "js-card-text";
            STRAINFLAVORS = infoArr[2]
            p4.textContent = flavorText(STRAINFLAVORS);
            console.log(p4);
            console.log(infoArr[2]);

            card.appendChild(h5);
            card.appendChild(img);
            card.appendChild(p1);
            card.appendChild(p2);
            card.appendChild(p3);
            card.appendChild(p4);
            //cardDeck.appendChild(card);
            STRAINDOGDOMARR[0] = card;
            return card;
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

function strainToBreedConverter(strainID = STRAINID){
    let dogBreed = dogArr[Math.floor(Math.random() * dogArr.length)];
    // some magic goes here.
    // use global variable STRAINID by default, or pass in another to override.
    console.log(strainID);
    return dogBreed;
}

function createNewDog(){
    let dogBreed = strainToBreedConverter();
    console.log(dogBreed);
    findDog(dogBreed);
}

function findDog(dogBreed){
    requestData(randomDogURLGenerator(dogBreed))
        .then(lookInside)
        .then(selectDog)
        .then(buildDogDOM)
}

function selectDog(dogArr){
    console.log('dogs');
    let dog = dogArr.animals[Math.floor(Math.random() * dogArr.animals.length)];
    console.log(dog);
}

function randomDogURLGenerator(dogBreed){
    return `https://api.petfinder.com/v2/animals/?type=dog&breed=${dogBreed}&location=${LOCATION}&limit=100`;
}

function buildDogDOM(dogCard){
    let cardDeck = document.querySelector(".card-z");
    let card = document.createElement('div');
    card.className = ".js-card-title";
    
    let h5 = document.createElement("h5");
    h5.className = ".js-card-title";
    h5.textContent = "Your new Best Friend!";

    let img = document.createElement("img");
    img.src = "images/noun_Marijuana_2183514.png";
    img.className = ".js-card-img-top";
    img.alt = "weed leaf";

    let p1 = document.createElement('p');
    p1.className = ".js-card-text";
    STRAINNAME = strainObj.name;
    p1.textContent = STRAINNAME;
    console.log(p1);

    let p2 = document.createElement('p');
    p2.className = ".js-card-text";
    STRAINDESCRIPTION = infoArr[0].desc;
    p2.textContent = STRAINDESCRIPTION;
    console.log(p2);
    console.log(infoArr[0]);

    let p3 = document.createElement('p');
    p3.className = ".js-card-text";
    STRAINEFFECTS = infoArr[1];
    p3.textContent = effectText(STRAINEFFECTS);
    console.log(p3);
    console.log(infoArr[1]);

    let p4 = document.createElement('p');
    p4.className = ".js-card-text";
    STRAINFLAVORS = infoArr[2]
    p4.textContent = flavorText(STRAINFLAVORS);
    console.log(p4);
    console.log(infoArr[2]);

}


// getAllOfRace('Sativa');
// getStrain(strainID);
getToken();

window.addEventListener('DOMContentLoaded', createRaceDOMs);

//reset button clicked here and then....
// clearCardDeck();
// createRaceDOMs();

// console.log(getStrainInfo(255));
