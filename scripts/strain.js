// global variables

let STRAINNAME;
let STRAINEFFECTS;
let LOCATION="30307";
let DOGCALLS;
let BREEDARRAY=[];
let cardDeck = document.querySelector(".card-z");
let barDeck = document.querySelector(".zipcode-button");
//change mode to chane use modes. mode = 1 for random strain, mode = 2 for list of a few random strains, mode = 3 for every strain of selected species.
let mode = 1;

//API URL creation functions.
function strainRaceURLGen(race){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/search/race/${race}`;
}

function strainURLGen(strainID, searchy){
    return `https://strainapi.evanbusse.com/${strainAPIKey}/strains/data/${searchy}/${strainID}`;
}

function DogURLGenerator(dogBreed){
    return `https://api.petfinder.com/v2/animals/?type=dog&breed=${dogBreed}&location=${LOCATION}&limit=100&status=adoptable`;
}

//Builds DOM elements for zipcode form and reset button, loads them into an array, and returns that array.
function formBuilder(){
    let domArr = [];

    let form = document.createElement("form");
    form.action="";
    form.className="js-form-container";

    let input1 = document.createElement("input");
    input1.className = "js-search-input";
    input1.type = "text";
    input1.placeholder = "Enter your Zip Code";

    let input2 = document.createElement("input");
    input2.className = "js-search-btn";
    input2.type = "submit";

    let reset = document.createElement("button");
    reset.className = "js-reset-btn reset-btn";
    reset.textContent = "Reset";
    reset.addEventListener("click", resetPage);

    form.appendChild(input1);
    form.appendChild(input2);
    form.addEventListener("submit", e =>{
        e.preventDefault(); //keeps the page from reloading on click
        LOCATION = e.target.elements[0].value; //sets global LOCATION variable to value entered into field.
        if(LOCATION.length != 5){ //checks to see if valid zipcode length, and if not, resets LOCATION to default zipcode.
            LOCATION = "30307";
            clearBarDeck();
        }
    });

    domArr.push(form);
    domArr.push(reset);
    return domArr;
}
// createLoadingDOM() creates a "Loading, please wait" card to be used while waiting on API calls.
function createLoadingDOM(){
    let card = document.createElement('div');
    card.className = "js-card-title";
    
    let img = document.createElement("img");
    img.src = "images/weed-eyes.png";
    img.className = "js-card-img-top";
    img.alt = "weed leaf";

    let p1 = document.createElement('p');
    p1.className = "js-card-text";
    p1.textContent = "LOADING!!! Please wait.";
    
    
    card.appendChild(img);
    card.appendChild(p1);
    return card;
}

//createRaceDOMs() creates a DOM element for each species, appends them to an array, and returns that array
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

//function called by event listener for the species cards, and triggers the beginning of the API call .then chain.
function raceClick(event){
    if (mode == 1){
        clearCardDeck();
        cardDeck.appendChild(loadingDom);
        fetch(strainRaceURLGen(event.currentTarget.race))
            .then(x => x.json())
            .then(selectRandomStrain)
            .then(getStrainInfo)
            .then(createSingleStrainDOM)
            .then(buildGoodDogArr)
            .then(createNewDog)
    } else if (mode == 2){
        clearCardDeck();
        cardDeck.appendChild(loadingDom);
        fetch(strainRaceURLGen(event.currentTarget.race))
            .then(x => x.json())
            .then(makeSomeStrains)
    } else if (mode == 3){
        clearCardDeck();
        cardDeck.appendChild(loadingDom);
        fetch(strainRaceURLGen(event.currentTarget.race))
            .then(x => x.json())
            .then(makeAllStrains)

    }

}

function makeAllStrains(strainArr){
    let strainDomArr = [];
    strainArr.map(newStrain =>{
        
        let card = document.createElement('div');
        card.className = "js-card-title";
        card.strainID = newStrain.id;
        card.strainName = newStrain.name;

        let img = document.createElement("img");
        img.src = "images/noun_Marijuana_2183514.png";
        img.className = "js-card-img-top";
        img.alt = "weed leaf";

        let p1 = document.createElement('p');
        p1.className = "js-card-text";
        p1.textContent = newStrain.name;
        
        card.appendChild(img);
        card.appendChild(p1);
        card.addEventListener('click', strainClick);
        strainDomArr.push(card);
    })
    strainDomArr.map(x => cardDeck.appendChild(x));
}

function makeSomeStrains(strainArr){
        let numStrains = 12;
        let strainDomArr = [];
        for (let x = 1; x < numStrains; x++){
            let rando = Math.floor(Math.random() * strainArr.length);
            let newStrain = strainArr[rando];
            strainArr.splice(rando, 1);
            
            let card = document.createElement('div');
            card.className = "js-card-title";
            card.strainID = newStrain.id;
            card.strainName = newStrain.name;
    
            let img = document.createElement("img");
            img.src = "images/noun_Marijuana_2183514.png";
            img.className = "js-card-img-top";
            img.alt = "weed leaf";

            let p1 = document.createElement('p');
            p1.className = "js-card-text";
            p1.textContent = newStrain.name;
            
            card.appendChild(img);
            card.appendChild(p1);
            card.addEventListener('click', strainClick);
            strainDomArr.push(card);
        }
        strainDomArr.map(x => cardDeck.appendChild(x));
}

function strainClick(event){
    clearCardDeck();
    cardDeck.appendChild(loadingDom);
    STRAINNAME = event.currentTarget.strainName;
    getStrainInfo(event.currentTarget.strainID)
        .then(createSingleStrainDOM)
        .then(buildGoodDogArr)
        .then(createNewDog)
}


//resetPage is triggered by an event listener on the reset button, it clears the HTML DIV containers, and runs main to restart from scratch
function resetPage(){
    BREEDARRAY = [];
    clearCardDeck();
    clearBarDeck();
    main();
}

function clearCardDeck(passThru){  //empties the primary container, so that it can be refilled.
    cardDeck.textContent = "";
    return passThru;
}
//clearBarDeck() resets zip bar to defaults
function clearBarDeck(){
    let textToReset = document.querySelector(".js-search-input");
    textToReset.value = "";
    LOCATION = "30307";
}

// selectRandomStrain(strainArr) takes in an array of strains from an API call, randomly selects one, sets global STRAINNAME variable, and returns the id of selected strain.
function selectRandomStrain(strainArr){
    let rando = Math.floor(Math.random() * strainArr.length);
    STRAINNAME = strainArr[rando].name;
    return strainArr[rando].id;
}

//getStrainInfo(strainID) takes a strain ID, creates an array of API URLs, and asyncronously calls them all, and returns an array of promises.
async function getStrainInfo(strainID){
    let URLArr = [strainURLGen(strainID,"desc"),strainURLGen(strainID,"effects"),strainURLGen(strainID,"flavors")]
    let values = await Promise.all(URLArr.map(url => fetch(url).then(r => r.json())));
    return values;
}

//createSingleStrainDOM(infoArr) takes an array of promises, creates a DOM card for a particular strain, and appends it to card stack.
function createSingleStrainDOM(infoArr){
    let card = document.createElement('div');
    card.className = "js-card-title";
    
    let h5 = document.createElement("h5");
    h5.className = "js-card-title";
    h5.textContent = "Your new Bud!";

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
    p3.innerHTML = effectText(STRAINEFFECTS);
    
    let p4 = document.createElement('p');
    p4.className = "js-card-text";
    p4.textContent = flavorText(infoArr[2]);
    
    card.appendChild(h5);
    card.appendChild(img);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(p3);
    card.appendChild(p4);
    return card;
}

//effectText returns a formatted string for the effects, for an HTML DOM element
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
    let effectString = `Effects <br> Positive: <br> ${posiEffects} <br> Negative: <br> ${negEffects} <br> Medical:<br> ${medEffects}`;
    // let effectString = "Effects \n Positive: \n" + posiEffects + "\n Negative \n" + negEffects + "\n Medical \n"+ medEffects;
    return effectString;
}

//flavorText returns a formatted string for the flavors, for an HTML DOM element
function flavorText(flavorObj){
    flavors = "";
    for (let flavor of flavorObj){
        flavors = flavors + flavor + " ";
    }
    let flavorString = `Flavor notes: ${flavors}`;
    return flavorString;
}

//buildGoodDogArr takes in an Object, of strain effects, and generates an array of dog breeds related to said effects
function buildGoodDogArr(passThru){
    let effArr = [];
    let newDogArr = [];
    let dogHisto = {};
    let dogArr = Object.keys(dogChars);
    let most = 0; //creates array of dog breeds
    //breaks down effect object into an array of effects
    for (let effCat of Object.keys(STRAINEFFECTS)){
        for (let eff of STRAINEFFECTS[effCat]){
            effArr.push(eff);
        }
    }
    //check to see if API returned no effects, and returns full array of dog breeds if no effects found
    if(effArr.length == 0){
        BREEDARRAY=dogArr;
        return passThru;
    }
    //creates histogram with dog breeds as keys, and the number of effects from given strain that matches as values.
    for (let dog of dogArr){
                for (let eff of effArr){
                        if(dogChars[dog].includes(eff)){
                            if(Object.keys(dogHisto).includes(dog)){
                                dogHisto[dog] += 1;    
                            } else {
                                dogHisto[dog] = 1;

                            }
                        if(dogHisto[dog] > most){
                            most = dogHisto[dog]
                        }
            }
        }
    }

//creates array of keys from dogHisto, sets global BREEDARRAY to that array, and returns that array (just for funsies)
    newDogArr = Object.entries(dogHisto).filter(x => x[1] >= most - 1).map(x => x[0]);
    BREEDARRAY=newDogArr;
    return passThru;
}

//randomBreedSelector takes in an array of dog breeds(or the default global array BREEDARRAY) and returns a randomly selected one.
function randomBreedSelector(breedArray = BREEDARRAY){
    return breedArray[Math.floor(Math.random() * breedArray.length)];
}

//createNewDog fetches an array of dogs of randomly selected breed, and then calls a DOM builder.
function createNewDog(strainDOM){
            requestData(DogURLGenerator(randomBreedSelector())) //requestData takes an API URL, adds token headers, and fetches.
            .then(r =>{
                if(DOGCALLS > 4){//if more than 4 API calls return no dogs, calls buildNoDogDOM to break the users heart
                    clearCardDeck();
                    cardDeck.appendChild(strainDOM);
                    buildNoDogDOM();
                } else if(!r.animals){ //if API call FAILS, calls buildNoDogDOM to break the users heart
                    clearCardDeck();
                    cardDeck.appendChild(strainDOM);
                    buildNoDogDOM();
                } else if(r.animals.length == 0){ //if API call returns no dogs, increases DOGCALLS tally, and recursively calls createNewDog.
                    DOGCALLS +=1;
                    createNewDog(strainDOM);
                } else{ //if nothing goes wrong, DOM builder for randomly selected dog in API array.
                    clearCardDeck();
                    cardDeck.appendChild(strainDOM);
                    buildDogDOM(selectRandDog(r));
                }
            }
        )
}    

//buildNoDogDOM creates a DOM card if no suitable dogs can be found, and appends it to the stack
function buildNoDogDOM(){
    DOGCALLS =0;
    let card = document.createElement('div');
    card.className = "js-card-title";
    
    let h5 = document.createElement("h5");
    h5.className = "js-card-title";
    h5.textContent = "We are so sorry but we can't find the right dog for you...";

    let img = document.createElement("img");
    img.src = "images/weed-eyes.png";
    img.className = "js-card-img-top";
    img.alt = "weed dog.";

    card.appendChild(h5);
    card.appendChild(img);
    cardDeck.appendChild(card);
}

//selectRandDog takes in an array of Dog objects, randomly selects one of them to use, and returns that dog Object.
function selectRandDog(dogArr){
    let dog = dogArr.animals[Math.floor(Math.random() * dogArr.animals.length)];
    return dog;
}

//buildDogDOM takes in a single dog Object, creates a DOM card for it, and appends it to card stack
function buildDogDOM(dogCard){
    DOGCALLS =0;
    let card = document.createElement('div');
    card.className = "js-card-title";
    
    let h5 = document.createElement("h5");
    h5.className = "js-card-title";
    h5.textContent = "Your new Best Bud!";

    let img = document.createElement("img");
    if(!dogCard.photos[0]){ //if petfinder API doesn't have any photos for dog, use default
        img.src = "images/weed-eyes.png";
    }else{
        img.src = dogCard.photos[0].full;
    }
    img.className = "js-card-img-top";
    img.alt = "your new best bud!";

    let p1 = document.createElement('p');
    p1.className = "js-card-text";
    p1.textContent = dogCard.name;
    
    let p2 = document.createElement('p');
    p2.className = "js-card-text";
    p2.textContent = dogCard.breeds.primary;
    
    let p3 = document.createElement('p');
    p3.className = "js-card-text";
    p3.textContent = dogCard.description;
    
    let a = document.createElement('a');
    a.className = "js-adopt-button";
    a.href = dogCard.url;
    a.target = "_blank";
    a.textContent = `Adopt Me`;
    
    card.appendChild(h5);
    card.appendChild(img);
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(p3);
    card.appendChild(a);
    cardDeck.appendChild(card);
}

//main runs the primary build of the main page, and sets/resets a counter.
function main(){
    DOGCALLS = 0;
    barArr.map(obj => barDeck.appendChild(obj));
    raceDomArr.map(card => cardDeck.appendChild(card));
}
//getToken creates token for petfinder API
getToken();

//creates main landing page DOM elements, and stores them in global variable (to avoid rebuilding them on reset)
const barArr = formBuilder();
const raceDomArr = createRaceDOMs();
const loadingDom = createLoadingDOM();

//waits for HTML page to finish loading, and then runs main, to build the landing page.
window.addEventListener('DOMContentLoaded', main);