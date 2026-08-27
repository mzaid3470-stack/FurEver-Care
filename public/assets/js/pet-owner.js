/**
 * FurEver Care — Pet Owner & Pet Journal Dashboard Controller
 * Onboarding Form, LocalStorage Persistence, Interactive Pet Journal, Feeding & Health Trackers
 */

const DEFAULT_PET = {
  name: "Gaston de Rose",
  species: "Dog",
  breed: "French Bulldog",
  age: "2.5 Years",
  gender: "Male",
  vaccination: "Up to Date (DHPP, Rabies, Bordetella)",
  weight: "12.4 kg",
  microchip: "985141002934812",
  diet: "Salmon & Sweet Potato Atelier Feast (2 meals / day)",
  nextVaccine: "November 14, 2026",
  nextGrooming: "Saturday, 10:30 AM",
  allergies: "Poultry by-products (Mild)"
};

function getActivePetData() {
  const custom = typeof getRegisteredPet === 'function' ? getRegisteredPet() : null;
  return custom || DEFAULT_PET;
}

function renderPetDashboard() {
  const pet = getActivePetData();
  const user = typeof getUserProfile === 'function' ? getUserProfile() : null;

  // Header and Greeting
  const nameDisplay = document.getElementById('dashboard-pet-name');
  const breedDisplay = document.getElementById('dashboard-pet-breed');
  const ownerDisplay = document.getElementById('dashboard-owner-name');

  if (nameDisplay) nameDisplay.textContent = pet.name;
  if (breedDisplay) breedDisplay.textContent = `${pet.species} • ${pet.breed} • ${pet.age}`;
  if (ownerDisplay) ownerDisplay.textContent = user ? user.name : "Devoted Companion";

  // Stat Strip
  const statAge = document.getElementById('stat-pet-age');
  const statWeight = document.getElementById('stat-pet-weight');
  const statVaccine = document.getElementById('stat-pet-vaccine');
  const statGrooming = document.getElementById('stat-pet-grooming');

  if (statAge) statAge.textContent = pet.age;
  if (statWeight) statWeight.textContent = pet.weight || "12.4 kg";
  if (statVaccine) statVaccine.textContent = pet.nextVaccine || "Nov 2026";
  if (statGrooming) statGrooming.textContent = pet.nextGrooming || "In 4 Days";

  // Details Tab/List
  const detailSpecies = document.getElementById('detail-species');
  const detailBreed = document.getElementById('detail-breed');
  const detailGender = document.getElementById('detail-gender');
  const detailVax = document.getElementById('detail-vax');
  const detailChip = document.getElementById('detail-chip');
  const detailDiet = document.getElementById('detail-diet');

  if (detailSpecies) detailSpecies.textContent = pet.species;
  if (detailBreed) detailBreed.textContent = pet.breed;
  if (detailGender) detailGender.textContent = pet.gender;
  if (detailVax) detailVax.textContent = pet.vaccination;
  if (detailChip) detailChip.textContent = pet.microchip || "985141002934812";
  if (detailDiet) detailDiet.textContent = pet.diet || "Salmon & Sweet Potato (2x daily)";
}

function handlePetRegistrationForm(e) {
  e.preventDefault();
  const name = document.getElementById('reg-pet-name')?.value || 'Beloved Pet';
  const species = document.getElementById('reg-pet-species')?.value || 'Dog';
  const breed = document.getElementById('reg-pet-breed')?.value || 'Mixed Heritage';
  const age = document.getElementById('reg-pet-age')?.value || '1 Year';
  const gender = document.getElementById('reg-pet-gender')?.value || 'Female';
  const vaccination = document.getElementById('reg-pet-vax')?.value || 'Up to date';
  const weight = document.getElementById('reg-pet-weight')?.value || '8.5 kg';
  const diet = document.getElementById('reg-pet-diet')?.value || 'Organic Whole Nutrition';

  const newPet = {
    name,
    species,
    breed,
    age,
    gender,
    vaccination,
    weight,
    diet,
    microchip: `98514100${Math.floor(Math.random() * 899999 + 100000)}`,
    nextVaccine: "Scheduled in 6 Months",
    nextGrooming: "This Coming Weekend",
    allergies: "None Reported"
  };

  if (typeof setRegisteredPet === 'function') {
    setRegisteredPet(newPet);
  }

  if (typeof showToast === 'function') {
    showToast(`Pet journal created for ${name}! Redirecting to journal...`);
  }

  setTimeout(() => {
    window.location.href = 'pet-profile.html';
  }, 1000);
}

// Interactive Journal Quick Log
function logJournalEntry(entryType) {
  const pet = getActivePetData();
  const messages = {
    'meal': `Logged nutritional meal for ${pet.name}. Digestion normal.`,
    'walk': `Recorded 45-min sensory promenade for ${pet.name}.`,
    'groom': `Brushing & coat conditioning completed for ${pet.name}.`,
    'meds': `Daily botanical supplement administered to ${pet.name}.`
  };

  if (typeof showToast === 'function') {
    showToast(messages[entryType] || `Journal updated for ${pet.name}.`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Registration Form
  const regForm = document.getElementById('pet-registration-form');
  if (regForm) {
    regForm.addEventListener('submit', handlePetRegistrationForm);
  }

  // Dashboard Renderer
  if (document.getElementById('dashboard-pet-name')) {
    renderPetDashboard();
  }
});
