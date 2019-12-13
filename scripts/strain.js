let strainRaceObj = {};

function strainRaceURLGen(race){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/search/race/${race}`;
}

function strainURLGen(strainName){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/search/name/${strainName}`;
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

function createStrainDOMs(strainsObj){
    strainsArr = Object.keys(strainsObj);
    //iterates thru all the strains of a race and creates a clickable DOM DIV for each, style TBD.
}

function getStrain(strainName){
    fetch(strainURLGen(strainName))
        .then(p => p.json())
        .then(lookInside)
        .then(strainToBreedConverter)
}


getAllOfRace('Sativa');

getStrain(`Jamacian`);













function strainToBreedConverter(strainObj){
    // some magic goes here.
    console.log(strainObj);
    return "Pomeranian";
}