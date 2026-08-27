document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('vet-profile-container');
  const vetId = document.body.dataset.vetId;
  if (!container || !vetId) return;

  const fallbackData = {
    "vet-01": { image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces" },
    "vet-02": { image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces" },
    "vet-03": { image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces" },
    "vet-04": { image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&h=1100&q=85&crop=faces" }
  };

  try {
    const response = await fetch('../data/vets.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Unable to load veterinary data.');
    const vets = await response.json();
    const vet = vets.find(item => item.id === vetId);
    if (!vet) throw new Error('Veterinarian profile not found.');
    renderVetProfile(vet, container, fallbackData[vetId]?.image);
  } catch (error) {
    container.innerHTML = `<div class="vet-profile-panel vet-profile-error"><h3>Profile unavailable</h3><p>We could not load this specialist profile. Please return to the Veterinary Specialists directory.</p><a class="btn btn-outline-burgundy btn-sm" href="veterinarian.html">Back to Specialists</a></div>`;
  }
});

function renderVetProfile(vet, container, fallbackImage) {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slots = (vet.slots || []).map(slot => {
    const cls = String(slot.status || '').toLowerCase().replace(/\s+/g, '-');
    return `<span class="slot-pill ${cls}">${esc(slot.time)} • ${esc(slot.status)}</span>`;
  }).join('');
  const focuses = (vet.focusAreas || []).map(item => `<li class="vet-focus-item">${esc(item)}</li>`).join('');
  const cases = (vet.medicalCases || []).map(item => `
    <div class="vet-case"><strong>${esc(item.condition)}</strong><span>${esc(item.pet)} · ${esc(item.date)} · ${esc(item.status)}</span><span>${esc(item.treatment)}</span></div>`).join('');
  const safeFallback = esc(fallbackImage || vet.image);

  container.innerHTML = `
    <div class="vet-profile-layout">
      <div class="vet-profile-visual vet-fade">
        <div class="vet-profile-photo">
          <img src="${esc(vet.image)}" alt="Portrait of ${esc(vet.name)}" loading="eager" referrerpolicy="no-referrer"
               onerror="this.onerror=null;this.src='${safeFallback}';">
          <div class="vet-photo-caption"><span>${esc(vet.profileTitle || vet.specialization)}</span><span>FurEver Care Specialist</span></div>
        </div>
        <div class="vet-profile-contact vet-fade delay-1">
          <h4>Clinic &amp; Direct Contact</h4>
          <p><strong>${esc(vet.clinic)}</strong><br>${esc(vet.location)}<br><br><strong>Direct:</strong> ${esc(vet.contact)}<br><strong>Consultation Desk:</strong> ${esc(vet.email)}</p>
        </div>
      </div>
      <div>
        <div class="vet-fade delay-1">
          <div class="vet-profile-badges"><span class="card-badge card-badge-dusty">${esc(vet.experience)}</span><span class="vet-profile-status">Specialist Profile</span></div>
          <span class="label-editorial vet-profile-kicker">${esc(vet.specialization)}</span>
          <h1 class="vet-profile-name">${esc(vet.name)}</h1>
          <div class="vet-profile-credentials">${esc(vet.educationDetail || vet.credentials)}</div>
          <p class="vet-profile-lead">${esc(vet.bioLong || vet.bio)}</p>
        </div>
        <div class="vet-profile-panel vet-fade delay-2"><h3>Clinical Approach</h3><p>${esc(vet.approach || vet.bio)}</p></div>
        <div class="vet-profile-panel vet-fade delay-2"><h3>Areas of Focus</h3><ul class="vet-focus-grid">${focuses}</ul></div>
        <div class="vet-profile-panel vet-fade delay-3"><h3>Clinical Case Experience</h3>${cases || '<p>Clinical case details are available during consultation.</p>'}</div>
        <div class="vet-profile-panel vet-fade delay-3">
          <div class="vet-slot-heading">Today’s Clinical &amp; Telehealth Slots · Display Only</div>
          <div class="slot-badge-grid">${slots}</div>
          <div class="vet-availability">Regular availability: ${esc(vet.availability)}</div>
        </div>
        <div class="vet-profile-actions vet-fade delay-3">
          <a href="appointments.html?vet=${encodeURIComponent(vet.name)}" class="btn btn-burgundy btn-lg">Schedule Consultation</a>
          <a href="veterinarian.html" class="btn btn-outline-burgundy btn-lg">Back to Specialists</a>
        </div>
      </div>
    </div>`;
}
