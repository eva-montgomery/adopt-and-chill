const petContainer = document.querySelector(".js-pet-search");

const CLIENT_ID = `xi41f7K4a2LHql9AsVZGfKZirIExwg53z95Z3D0k8swMJZYkxx`;
const CLIENT_SECRET = `GSze3y0VmWP8Pima9MKNztp26l1UjY76F0X5ErhG`;

let token;

function extractToken(payload) {
    return payload.access_token;
}

function getToken() {
    const params = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    const authURL = `https://api.petfinder.com/v2/oauth2/token`;    
    return fetch(authURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    })
    .then(r => r.json())
    .then(extractToken)
    .then(t => token = t)
}

function requestData(URL="https://api.petfinder.com/v2/animals") {
    if (token) {
        return fetch(URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }            
        })
        .then(r => r.json())    
    } else {
        console.error(`You must call getToken() first!`);
    }
}



const pets = {
    "animals": [
        {
            "id": 120,
            "organization_id": "NJ333",
            "url": "https://www.petfinder.com/dog/spot-120/nj/jersey-city/nj333-petfinder-test-account/?referrer_id=d7e3700b-2e07-11e9-b3f3-0800275f82b1",
            "type": "Dog",
            "species": "Dog",
            "breeds": {
                "primary": "Akita",
                "secondary": null,
                "mixed": false,
                "unknown": false
            },
            "colors": {
                "primary": null,
                "secondary": null,
                "tertiary": null
            },
            "age": "Young",
            "gender": "Male",
            "size": "Medium",
            "coat": null,
            "attributes": {
                "spayed_neutered": false,
                "house_trained": true,
                "declawed": null,
                "special_needs": true,
                "shots_current": false
            },
            "environment": {
                "children": false,
                "dogs": false,
                "cats": false
            },
            "tags": [
                "Cute",
                "Intelligent",
                "Large",
                "Playful",
                "Happy",
                "Affectionate"
            ],
            "name": "Spot",
            "description": "Spot is an amazing dog",
            "photos": [
                {
                    "small": "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=100",
                    "medium": "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=300",
                    "large": "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081&width=600",
                    "full": "https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081"
                }
            ],
            "status": "adoptable",
            "published_at": "2018-12-22T20:31:32+0000",
            "contact": {
                "email": "petfindertechsupport@gmail.com",
                "phone": "111-333-5555, 222-333-5555, 333-333-5353, 111-333-2222",
                "address": {
                    "address1": "Test address 1",
                    "address2": "Test address 2",
                    "city": "Jersey City",
                    "state": "NJ",
                    "postcode": "07097",
                    "country": "US"
                }
            },
            "_links": {
                "self": {
                    "href": "/v2/animals/120"
                },
                "type": {
                    "href": "/v2/types/dog"
                },
                "organization": {
                    "href": "/v2/organizations/nj333"
                }
            }
        }
    ],
    "pagination": {
        "count_per_page": 20,
        "total_count": 1,
        "current_page": 1,
        "total_pages": 1,
        "_links": {
            "previous": {
                "href": "/v2/animals?type=dog&page=1"
            },
            "next": {
                "href": "/v2/animals?type=dog&page=3"
            }
        }
    }
}

// Functions


// create individual functions for information that should get extracted

function getPetTypes(obj) {
    return obj.animals[0].type;
}

function getPetBreed(obj) {
    return obj.animals[0].breeds.primary;
}

function getPetGender(obj) {
    return obj.animals[0].gender;
}

function getPetImage(obj) {
    return obj.animals[0].photos[0].medium;
}

function getPetAge(obj) {
    return obj.animals[0].age;
}

function getPetSize(obj) {
    return obj.animals[0].size;
}

function getPetDescription(obj) {
    return obj.animals[0].description;
}

// need function for link to adoption site

// create functions to display extracted data

function renderPetType(type, container) {
    const renderType = document.createElement('p');
    renderType.textContent = type;
    container.appendChild(renderType);
}

function renderPetBreed(breed, container) {
    const renderBreed = document.createElement('p');
    renderBreed.textContent = breed;
    container.appendChild(renderBreed);
}

function renderPetGender(gender, container) {
    const renderGender = document.createElement('p');
    renderGender.textContent = gender;
    container.appendChild(renderGender);
}

function renderPetImage(photos, container) {
    const renderImage = document.createElement('img');
    renderImage.src = photos;
    container.appendChild(renderImage);
}

function renderPetAge(age, container) {
    const renderAge = document.createElement('p');
    renderAge.textContent = age;
    container.appendChild(renderAge);
}

function renderPetSize(size, container) {
    const renderSize = document.createElement('p');
    renderSize.textContent = size;
    container.appendChild(renderSize);
}

function renderPetDescription(description, container) {
    const renderDes = document.createElement('p');
    renderDes.textContent = description;
    container.appendChild(renderDes); 
}

function renderPet(obj) {
    const div = document.createElement('div');

    const type = getPetTypes(obj);
    const getTypes = renderPetType(type, div);
    
    const breed = getPetBreed(obj);
    const getBreed = renderPetBreed(breed, div);

    const gender = getPetGender(obj);
    const getGender = renderPetGender(gender, div);    

    const photo = getPetImage(obj);
    const petImage = renderPetImage(photo, div);

    const age = getPetAge(obj);
    const petAge = renderPetAge(age, div);

    const size = getPetSize(obj);
    const petSize = renderPetSize(size, div);

    const description = getPetDescription(obj);
    const petDescription = renderPetDescription(description, div);

    document.body.appendChild(div);

}
// return renderPet(obj);

