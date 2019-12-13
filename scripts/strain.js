let strainName = '';
let strainID = 1758;
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
        .then(r => createStrainDOMs)
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

function createSingleStrainDOM(strainObj){
    
}

function getStrain(strainID){
    fetch(strainURLGen(strainID))
        .then(p => p.json())
        .then(lookInside)
        .then(strainToBreedConverter)
}

getAllOfRace('Sativa');

getStrain(strainID);

function strainToBreedConverter(strainObj){
    // some magic goes here.
    console.log(strainObj);
    return "Pomeranian";
}