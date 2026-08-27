/**
 * FurEver Care — Veterinarian Directory & Appointment Controller
 * Specialization Filters, Vet Profiles, Interactive Display-Only Appointment Slots
 */

const FALLBACK_VETS = [
  {
    "id": "vet-01",
    "name": "Dr. Sarah Mitchell, DVM, DACVIM",
    "specialization": "Cardiology & Internal Medicine",
    "experience": "14 Years Experience",
    "credentials": "Cornell University College of Veterinary Medicine",
    "clinic": "FurEver Care Veterinary Center",
    "location": "742 Heritage Boulevard, Suite 400",
    "contact": "+1 (800) 555-8381",
    "email": "dr.mitchell@furevercare.com",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces",
    "bio": "Dr. Mitchell is a board-certified specialist in small animal internal medicine with an emphasis on gentle echocardiography, chronic disease management, and longevity nutrition.",
    "availability": "Mon, Wed, Fri (9:00 AM - 4:30 PM)",
    "slots": [
      {
        "time": "09:30 AM",
        "status": "Available"
      },
      {
        "time": "11:00 AM",
        "status": "Booked"
      },
      {
        "time": "01:30 PM",
        "status": "Available"
      },
      {
        "time": "03:00 PM",
        "status": "Next Available"
      }
    ]
  },
  {
    "id": "vet-02",
    "name": "Dr. Ryan Carter, DVM, DACVS",
    "specialization": "Orthopedic & Soft Tissue Surgery",
    "experience": "16 Years Experience",
    "credentials": "University of California, Davis School of Veterinary Medicine",
    "clinic": "FurEver Care Surgical Center",
    "location": "810 Symphony Terrace, Medical Wing",
    "contact": "+1 (800) 555-8382",
    "email": "dr.carter@furevercare.com",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces",
    "bio": "Dr. Carter specializes in minimally invasive arthroscopy, cruciate ligament reconstruction, and structured post-operative rehabilitation for canine and feline patients.",
    "availability": "Tue, Thu, Sat (8:30 AM - 3:00 PM)",
    "slots": [
      {
        "time": "08:45 AM",
        "status": "Booked"
      },
      {
        "time": "10:30 AM",
        "status": "Available"
      },
      {
        "time": "01:15 PM",
        "status": "Next Available"
      },
      {
        "time": "02:30 PM",
        "status": "Available"
      }
    ]
  },
  {
    "id": "vet-03",
    "name": "Dr. Maya Patel, DVM, CVA",
    "specialization": "Holistic Dermatology & Acupuncture",
    "experience": "11 Years Experience",
    "credentials": "University of Florida College of Veterinary Medicine / Chi University",
    "clinic": "FurEver Care Wellness Center",
    "location": "512 Rosewood Lane, Floor 2",
    "contact": "+1 (800) 555-8383",
    "email": "dr.patel@furevercare.com",
    "image": "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces",
    "bio": "Dr. Patel combines conventional veterinary dermatology with certified veterinary acupuncture and practical supportive care for recurring skin and allergy concerns.",
    "availability": "Mon, Tue, Thu, Fri (10:00 AM - 5:30 PM)",
    "slots": [
      {
        "time": "10:15 AM",
        "status": "Available"
      },
      {
        "time": "11:45 AM",
        "status": "Available"
      },
      {
        "time": "02:00 PM",
        "status": "Booked"
      },
      {
        "time": "04:15 PM",
        "status": "Next Available"
      }
    ]
  },
  {
    "id": "vet-04",
    "name": "Dr. Daniel Brooks, DVM, DAVDC",
    "specialization": "Advanced Veterinary Dentistry & Maxillofacial Care",
    "experience": "13 Years Experience",
    "credentials": "University of Pennsylvania School of Veterinary Medicine",
    "clinic": "FurEver Care Dental Center",
    "location": "742 Heritage Boulevard, Suite 402",
    "contact": "+1 (800) 555-8384",
    "email": "dr.brooks@furevercare.com",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces",
    "bio": "Dr. Brooks focuses on advanced veterinary dentistry, periodontal disease management, digital dental radiography, and complex oral surgery for dogs and cats.",
    "availability": "Wed, Thu, Fri (9:00 AM - 4:00 PM)",
    "slots": [
      {
        "time": "09:15 AM",
        "status": "Available"
      },
      {
        "time": "11:30 AM",
        "status": "Booked"
      },
      {
        "time": "01:45 PM",
        "status": "Available"
      },
      {
        "time": "03:15 PM",
        "status": "Booked"
      }
    ]
  }
];

let allVets = [];
let selectedSpecialty = 'All';

async function loadVetsData() {
  try {
    const res = await fetch('data/vets.json');
    if (!res.ok) throw new Error('Network error');
    allVets = await res.json();
  } catch (err) {
    allVets = FALLBACK_VETS;
  }
  renderVets();
}

function renderVets() {
  const container = document.getElementById('vets-grid');
  if (!container) return;

  const items = allVets.filter(vet => {
    return selectedSpecialty === 'All' || vet.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase());
  });

  container.innerHTML = items.map(vet => {
    const slotsHtml = vet.slots.map(slot => {
      const statusClass = slot.status.toLowerCase().replace(/\s+/g, '-');
      const clickAction = slot.status !== 'Booked' ? `onclick="selectAppointmentSlot('${vet.name}', '${slot.time}', '${slot.status}')"` : '';
      return `<span class="slot-pill ${statusClass}" ${clickAction}>${slot.time} • ${slot.status}</span>`;
    }).join(' ');

    return `
      <article class="card-editorial reveal-on-scroll is-visible">
        <span class="card-badge card-badge-dusty">${vet.experience}</span>
        <div class="card-media" style="height: 280px;">
          <img src="${vet.image}" alt="${vet.name}" style="height: 100%; width: 100%; object-fit: cover; object-position: 50% 18%;" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src=vet.id==='vet-03' ? 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces' : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces';">
        </div>
        <span class="label-editorial" style="color: var(--burgundy-light); margin-bottom: 0.35rem;">${vet.specialization}</span>
        <h3 style="font-size: 1.55rem; margin-bottom: 0.5rem; line-height: 1.2;">
          <a href="${({"vet-01":"sarah-mitchell.html","vet-02":"ryan-carter.html","vet-03":"maya-patel.html","vet-04":"daniel-brooks.html"}[vet.id] || `vet-profile.html?id=${vet.id}`)}">${vet.name}</a>
        </h3>
        <p style="font-size: 0.88rem; margin-bottom: 1rem; opacity: 0.85;">
          ${vet.bio}
        </p>
        <div style="background: rgba(74, 21, 33, 0.05); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--burgundy);">Clinic & Availability</div>
          <div style="font-size: 0.85rem; font-weight: 600;">${vet.clinic}</div>
          <div style="font-size: 0.78rem; opacity: 0.8;">${vet.availability}</div>
        </div>
        <div style="margin-bottom: 1.25rem;">
          <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--burgundy); margin-bottom: 0.4rem;">Today's Appointment Slots (Display Only)</div>
          <div class="slot-badge-grid">
            ${slotsHtml}
          </div>
        </div>
        <div style="display: flex; gap: 0.6rem; padding-top: 1rem; border-top: 1px solid var(--burgundy-tint-20); margin-top: auto;">
          <a href="${({"vet-01":"sarah-mitchell.html","vet-02":"ryan-carter.html","vet-03":"maya-patel.html","vet-04":"daniel-brooks.html"}[vet.id] || `vet-profile.html?id=${vet.id}`)}" class="btn btn-outline-burgundy btn-sm" style="flex: 1;">Specialist Bio</a>
          <a href="appointments.html?vet=${encodeURIComponent(vet.name)}" class="btn btn-burgundy btn-sm" style="flex: 1;">Consultation</a>
        </div>
      </article>
    `;
  }).join('');
}

function selectAppointmentSlot(vetName, time, status) {
  if (typeof showToast === 'function') {
    showToast(`Selected ${time} slot with ${vetName} (${status} - UI Demo).`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vets-grid')) {
    loadVetsData();

    const pills = document.querySelectorAll('.vet-filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedSpecialty = pill.getAttribute('data-specialty');
        renderVets();
      });
    });
  }
});
