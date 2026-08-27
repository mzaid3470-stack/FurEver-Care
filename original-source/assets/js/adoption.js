/**
 * FurEver Care — Shelter & Adoption Controller
 * Multi-criteria filter (Species, Age, Breed, Location), Search, Adopt Inquiry Modal Feedback
 */

const FALLBACK_PETS = [
  {
    "id": "pet-01",
    "name": "Bella Morgan",
    "species": "Dogs",
    "breed": "Italian Greyhound",
    "age": "2 Years",
    "gender": "Female",
    "size": "Small (6 kg)",
    "location": "Upper East Haven Sanctuary",
    "status": "Available",
    "badge": "Gentle Soul",
    "image": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    "summary": "An aristocratic yet affectionate companion who adores cashmere blankets, peaceful afternoon sunbaths, and quiet company.",
    "personality": ["Gentle", "Cuddle Enthusiast", "Leash Trained", "Quiet"],
    "health": "Fully vaccinated, microchipped, spayed, dental cleaning completed May 2026."
  },
  {
    "id": "pet-02",
    "name": "Charlie Brooks",
    "species": "Dogs",
    "breed": "Golden Retriever & Setter Mix",
    "age": "3 Years",
    "gender": "Male",
    "size": "Large (28 kg)",
    "location": "Highland Valley Pet Haven",
    "status": "Available",
    "badge": "Active Explorer",
    "image": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    "summary": "Joyful, devoted, and exceptionally intelligent. Charlie is eager to learn, loves hiking trails, and greets everyone with a wagging tail.",
    "personality": ["Enthusiastic", "Family Friendly", "Swimmer", "Quick Learner"],
    "health": "Vaccinated up to date, neutered, hip evaluation clear, heartworm negative."
  },
  {
    "id": "pet-03",
    "name": "Oliver \"Ollie\" Carter",
    "species": "Cats",
    "breed": "British Shorthair",
    "age": "1.5 Years",
    "gender": "Male",
    "size": "Medium (4.5 kg)",
    "location": "Upper East Haven Sanctuary",
    "status": "Available",
    "badge": "Quiet Aristocrat",
    "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    "summary": "A plush velvet philosopher who observes life with quiet majesty, enjoys wand play, and curls up at the foot of the bed.",
    "personality": ["Independent", "Playful Observer", "Litter Perfect", "Low Vocalization"],
    "health": "Microchipped, neutered, FVRCP & FeLV negative, vaccinated."
  },
  {
    "id": "pet-04",
    "name": "Daisy & Lily",
    "species": "Cats",
    "breed": "Ragdoll Sisters",
    "age": "1 Year",
    "gender": "Female Pair",
    "size": "Medium Pair (4 kg each)",
    "location": "Metropolitan Animal Atelier",
    "status": "Available",
    "badge": "Bonded Pair",
    "image": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
    "summary": "Two inseparable sisters with striking sapphire eyes and silk coats. They groom each other constantly and purr in harmonic unison.",
    "personality": ["Ultra Affectionate", "Playful Duo", "Lap Seekers", "Gentle"],
    "health": "Both spayed, fully vaccinated, microchipped, dewormed."
  },
  {
    "id": "pet-05",
    "name": "Max Bennett",
    "species": "Rabbits",
    "breed": "Holland Lop",
    "age": "10 Months",
    "gender": "Male",
    "size": "Small (1.8 kg)",
    "location": "Metropolitan Animal Atelier",
    "status": "Available",
    "badge": "Free-Roam Ready",
    "image": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80",
    "summary": "A curious, velvety Holland Lop who performs delightful joy binkies and enjoys organic dandelion leaves and willow chew toys.",
    "personality": ["Litter Box Trained", "Curious", "Gentle", "Prefers Quiet"],
    "health": "Neutered, RHDV2 vaccinated, baseline dental exam pristine."
  },
  {
    "id": "pet-06",
    "name": "Rosie Parker",
    "species": "Dogs",
    "breed": "Miniature Dachshund",
    "age": "4 Years",
    "gender": "Female",
    "size": "Small (5 kg)",
    "location": "Highland Valley Pet Haven",
    "status": "Available",
    "badge": "Heart Warmer",
    "image": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    "summary": "A spirited, warm-hearted little lady with a penchant for soft burrowing blankets and companionable strolls in the park.",
    "personality": ["Loyal", "Burrower", "Alert", "Loves Lap Time"],
    "health": "Spayed, all core vaccines current, spine health certified."
  },
  {
    "id": "pet-07",
    "name": "Cooper James",
    "species": "Rabbits",
    "breed": "Lionhead Heritage",
    "age": "1 Year",
    "gender": "Male",
    "size": "Small (1.6 kg)",
    "location": "Upper East Haven Sanctuary",
    "status": "Available",
    "badge": "Silken Mane",
    "image": "https://images.unsplash.com/photo-1535241749838-299277b6305f?auto=format&fit=crop&w=800&q=80",
    "summary": "Distinguished Lionhead rabbit with a cloud-like mane who loves gentle head strokes, fresh timothy hay, and stacking cups.",
    "personality": ["Inquisitive", "Enjoys Puzzles", "Timid at First", "Gentle"],
    "health": "Neutered, vaccinated, regular grooming care routine established."
  },
  {
    "id": "pet-08",
    "name": "Luna Grace",
    "species": "Cats",
    "breed": "Russian Blue Mix",
    "age": "2.5 Years",
    "gender": "Female",
    "size": "Medium (3.8 kg)",
    "location": "Highland Valley Pet Haven",
    "status": "Available",
    "badge": "Emerald Eyes",
    "image": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80",
    "summary": "Silvery coat with captivating green eyes. Luna Grace is a calm soul who enjoys sunbeams, bird watching, and gentle chin scratches.",
    "personality": ["Calm", "Observant", "Independent", "Sweet Natured"],
    "health": "Microchipped, spayed, vaccinated, FeLV/FIV negative."
  }
];

let allPets = [];
let selectedSpecies = 'All';
let selectedLocation = 'All';
let petSearchQuery = '';

async function loadPetsData() {
  try {
    const res = await fetch('data/pets.json');
    if (!res.ok) throw new Error('Failed to load pets');
    allPets = await res.json();
  } catch (e) {
    allPets = FALLBACK_PETS;
  }
  renderPets();
}

function filterPets() {
  return allPets.filter(pet => {
    const matchSpecies = selectedSpecies === 'All' || pet.species.toLowerCase() === selectedSpecies.toLowerCase();
    const matchLocation = selectedLocation === 'All' || pet.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchSearch = pet.name.toLowerCase().includes(petSearchQuery.toLowerCase()) ||
                        pet.breed.toLowerCase().includes(petSearchQuery.toLowerCase()) ||
                        pet.summary.toLowerCase().includes(petSearchQuery.toLowerCase());
    return matchSpecies && matchLocation && matchSearch;
  });
}

function renderPets() {
  const container = document.getElementById('pets-grid');
  const countElement = document.getElementById('pets-count');
  if (!container) return;

  const items = filterPets();

  if (countElement) {
    countElement.textContent = `Showing ${items.length} of ${allPets.length} Beloved Companions Awaiting Homes`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--dusty-pink-light); border-radius: var(--radius-md); border: 1px dashed var(--burgundy-tint-20);">
        <h3 style="margin-bottom: 0.5rem;">No Beloved Companions Match Filter</h3>
        <p style="margin-bottom: 1.5rem;">Try selecting 'All' or searching for another breed.</p>
        <button class="btn btn-burgundy btn-sm" onclick="resetPetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(pet => {
    const traitsHtml = pet.personality.slice(0, 3).map(trait => 
      `<span style="background: rgba(74, 21, 33, 0.08); padding: 0.2rem 0.6rem; border-radius: var(--radius-pill); font-size: 0.72rem; font-weight: 600;">${trait}</span>`
    ).join(' ');

    return `
      <article class="card-editorial reveal-on-scroll is-visible">
        <span class="card-badge">${pet.badge || 'Sanctuary Pet'}</span>
        <div class="card-media">
          <img src="${pet.image}" alt="${pet.name}" loading="lazy" referrerpolicy="no-referrer" style="width:100%;height:100%;object-fit:contain;object-position:center;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85';">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem;">
          <span class="label-editorial" style="color: var(--burgundy-light);">${pet.species} • ${pet.breed}</span>
          <span style="font-size: 0.8rem; font-weight: 600; opacity: 0.8;">${pet.age}</span>
        </div>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.6rem; line-height: 1.2;">
          <a href="pet-${pet.id.split("-")[1].padStart(2,"0")}.html">${pet.name}</a>
        </h3>
        <p style="font-size: 0.9rem; margin-bottom: 1rem; opacity: 0.85;">
          ${pet.summary}
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
          ${traitsHtml}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--burgundy-tint-20); margin-top: auto;">
          <div style="font-size: 0.75rem; opacity: 0.8;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline; vertical-align: middle;">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${pet.location.split(' ')[0]} Sanctuary
          </div>
          <div style="display: flex; gap: 0.4rem;">
            <a href="pet-${pet.id.split("-")[1].padStart(2,"0")}.html" class="btn btn-outline-burgundy btn-sm">Full Profile</a>
            <button class="btn btn-burgundy btn-sm" onclick="openAdoptionModal('${pet.id}', '${pet.name}')">Adopt</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function resetPetFilters() {
  selectedSpecies = 'All';
  selectedLocation = 'All';
  petSearchQuery = '';

  const searchInput = document.getElementById('pet-search');
  if (searchInput) searchInput.value = '';

  const locSelect = document.getElementById('pet-location-filter');
  if (locSelect) locSelect.value = 'All';

  const pills = document.querySelectorAll('.pet-species-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-species') === 'All') p.classList.add('active');
    else p.classList.remove('active');
  });

  renderPets();
}

function openAdoptionModal(petId, petName) {
  const modal = document.getElementById('adoption-modal');
  const petNameTarget = document.getElementById('adoption-modal-pet-name');
  if (petNameTarget) petNameTarget.textContent = petName;

  const user = typeof getUserProfile === 'function' ? getUserProfile() : null;
  const applicantInput = document.getElementById('adopt-applicant-name');
  if (applicantInput && user && user.name) {
    applicantInput.value = user.name;
  }

  if (typeof openModal === 'function') {
    openModal('adoption-modal');
  }
}

// Initialise Adoption Page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pets-grid')) {
    loadPetsData();

    // Species pills
    const speciesPills = document.querySelectorAll('.pet-species-pill');
    speciesPills.forEach(pill => {
      pill.addEventListener('click', () => {
        speciesPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedSpecies = pill.getAttribute('data-species');
        renderPets();
      });
    });

    // Search input
    const searchInput = document.getElementById('pet-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        petSearchQuery = e.target.value.trim();
        renderPets();
      });
    }

    // Location selector
    const locSelect = document.getElementById('pet-location-filter');
    if (locSelect) {
      locSelect.addEventListener('change', (e) => {
        selectedLocation = e.target.value;
        renderPets();
      });
    }

    // Adoption inquiry submission form
    const adoptForm = document.getElementById('adoption-inquiry-form');
    if (adoptForm) {
      adoptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const petName = document.getElementById('adoption-modal-pet-name')?.textContent || 'Beloved Companion';
        if (typeof showToast === 'function') {
          showToast(`Adoption inquiry received for ${petName}! Our sanctuary team will connect shortly (Demo).`);
        }
        if (typeof closeModal === 'function') {
          closeModal('adoption-modal');
        }
      });
    }
  }
});
