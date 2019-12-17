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

