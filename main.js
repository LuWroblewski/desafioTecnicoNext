const plantsList = document.getElementById('plants-list');
const sunSelect = document.getElementById('sun');
const waterSelect = document.getElementById('water');
const toxicitySelect = document.getElementById('toxicity');
const noResults = document.getElementById('noResults');

let filteredPlants = [];

fetch('plants.json')
  .then(response => response.json())
  .then(plants => {
    filteredPlants = plants;
    renderPlants(filteredPlants);
  });

function renderPlants(plants) {
  plantsList.innerHTML = '';

  plants.map(plant => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = plant.url;
    img.alt = plant.name;

    const nameP = document.createElement('p');
    nameP.textContent = plant.name;
    nameP.classList.add('name');

    const priceP = document.createElement('p');
    priceP.textContent = `$${plant.price.toFixed(2)}`;
    priceP.classList.add('price');

    li.appendChild(img);
    li.appendChild(nameP);
    li.appendChild(priceP);

    plantsList.appendChild(li);
  });

  if (plants.length === 0) {
    noResults.style.display = "block";
  }
  if (plants.length !== 0) {
    noResults.style.display = "none";
  }

}

function filterPlants() {
  let filtered = [];
  const sunValue = sunSelect.value;
  const waterValue = waterSelect.value;
  const toxicityValue = toxicitySelect.value;

  filtered = filteredPlants.filter(plant => {
    let matches = true;

    if (sunValue && plant.sun !== sunValue) {
      matches = false;
    }

    if (waterValue && plant.water !== waterValue) {
      matches = false;
    }

    if (toxicityValue && plant.toxicity !== (toxicityValue === 'true')) {
      matches = false;
    }

    return matches;
  });

  renderPlants(filtered);
}

sunSelect.addEventListener('change', filterPlants);
waterSelect.addEventListener('change', filterPlants);
toxicitySelect.addEventListener('change', filterPlants);
