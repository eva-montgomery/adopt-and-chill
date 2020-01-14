## Adopt and Chill 

### Authors  
* Austin Dryden
* Aylor Brown
* Eva Montgomery 

## Project Description  
Adopt and Chill solves the serious problem of overcrowded animal shelters in a silly way. The user enters a zip code, clicks on an image representing their preferred marijuana species (Indica, Sativa, or Hybrid), and receives two recommendations - a marijuana strain and an available shelter dog with similar characteristics. 


![diagram](https://user-images.githubusercontent.com/56937602/71096338-18906900-217c-11ea-8f25-ad548be69500.jpg)

#### USER INPUT 

![userinput](https://user-images.githubusercontent.com/56937602/71096746-da477980-217c-11ea-907a-bb0478c66541.png)


![raceclick](https://user-images.githubusercontent.com/56937602/71096972-40340100-217d-11ea-9eaa-d33e5d2cbf52.png)


First, we create some clickable elements to populate the landing page. Once the user clicks, the `raceClick` function triggers the fetch.then chain.  

#### STRAIN API 

![straininfo](https://user-images.githubusercontent.com/56937602/71097302-cc462880-217d-11ea-9946-89487c807d0e.png)


`getStrainInfo` is an asynchronous function that takes in a marijuana strain ID number from the Strain API and builds an array of URLs to call to the API. The function asynchronously iterates through that array and does an API call for each, pauses until all three API calls return, then returns an array of promises. 

#### BRIDGE FUNCTIONS

![buildgooddog](https://user-images.githubusercontent.com/56937602/71102166-00bde280-2186-11ea-8a96-ffbe22bf9d5d.png)

`buildGoodDog` acts as a bridge between the two APIs. The function creates an array of all the dogs with the most attributes in common with the selected strain of marijuana, then sets that to the global variable `BREEDARRAY`.

#### PETFINDER API

![createnewdog](https://user-images.githubusercontent.com/56937602/71097867-bf760480-217e-11ea-92a8-26d76b4c17a9.png)


`createNewDog` fetches an array of adoptable dogs of the selected breed, randomly selects one dog of that breed, then calls the DOM element builder for that dog. 

#### SCREEN OUTPUT 

[![](https://user-images.githubusercontent.com/56937602/71106492-77aaa980-218d-11ea-85b6-451fa8a653bc.png)](https://www.youtube.com/watch?v=I0PX4Sw4m1M&feature=youtu.be)


### APIs USED 
* Petfinder API - https://www.petfinder.com/developers/api-docs
* The Strain Marijuana strains API - https://strains.evanbusse.com/

### What's Next
* Continue to add characteristics to the dog array to make the app more robust. 
* When you select a marijuana species, instead of randomly picking one, we pick 12 for you to pick from. 
* Add CSS hover animations on dog logos for better user experience. 
* Add vendor pre-fixes to optimize for more platforms/ devices. 



