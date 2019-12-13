const stainRaceObj = {};

function strainRaceURLGen(strain){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/search/name/${strain}`;
}


function getAllOfRace(strain){
    return fetch(strainRaceURLGen(strain))
        .then(p => p.json())
        .then(r => strainRaceObj = r);
}


getAllOfRace('Sativa');
console.log(strainRaceObj);













function strainToBreedConverter(strainObj){
    // some magic goes here.

    return "Pomeranian";
}