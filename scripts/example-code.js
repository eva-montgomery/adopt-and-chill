// Just random code snippets ///


// function for name input and weed recommendation

// let myButton = document.querySelector('button');
//   let myHeading = document.querySelector('h1');
  
//   function setUserName() {
//     let yourName = prompt('Please enter your name.');
//     if(!yourName || yourName === null) {
//       setUserName();
//     } else {
//       localStorage.setItem('name', yourName);
//       myHeading.textContent = 'Hi ' + yourName + ', we think based on your selection XXXX would be a great companion for you!';
//     }
//   }
  
//   if(!localStorage.getItem('name')) {
//     setUserName();
//   } else {
//     let storedName = localStorage.getItem('name');
//     myHeading.textContent = 'Hi ' + storedName + ', we think based on your selection XXXX would be a great companion for you!';
//   }
  
//   myButton.onclick = function() {
//     setUserName();
//   }

// function findYourPet(findPet) {}

// function for hybridWeed dropdown

// function hybridWeed() {
// const hybrids = ['France', 'UK', 'Spain','Belgium','Holland'],
// select = document.getElementById( 'hybrids' );

// for( hybrid in hybrids ) {
// select.add( new Option( hybrids[hybrid] ) );

// };
// }

const cityForm = document.querySelector('');

const API = ``;

function citySearchURL(cityName) {
    //return `${API}forecast?q=${cityName}&APPID=${weatherAPIKey}`    
}

// function getCity(cityName) {    
//     fetch(citySearchURL(cityName))
//         .then(r => r.json())
//         .then((obj) => {
//             console.log(obj);
//         });
// }

cityForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Don't send the form!!!
    const cityName = e.target.city.value;
    console.log(cityName);
    getCity(cityName)
});

