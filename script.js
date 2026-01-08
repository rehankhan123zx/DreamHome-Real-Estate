// ==========================================
// 1. DATA: Property Array of Objects
// ==========================================
const properties = [
    {
        id: 1,
        title: "Modern Apartment",
        type: "Rent",
        location: "Downtown",
        price: "Rs. 45,000/mo",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Luxury Villa",
        type: "Buy",
        location: "Bahria Town",
        price: "Rs. 25,000,000",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Cozy Family House", // <--- Iski image ab House 1 style ki hai
        type: "Buy",
        location: "Gulberg",
        price: "Rs. 18,500,000",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80" 
    },
    {
        id: 4,
        title: "Commercial Office",
        type: "Rent",
        location: "Blue Area",
        price: "Rs. 150,000/mo",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Seaside Condo",
        type: "Buy",
        location: "Clifton",
        price: "Rs. 32,000,000",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Studio Apartment",
        type: "Rent",
        location: "DHA",
        price: "Rs. 35,000/mo",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
    }
];

// ==========================================
// 2. NAVIGATION LOGIC (SPA Feel)
// ==========================================
function showSection(sectionId) {
    // Hide all sections with class 'page-section'
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('d-none'); // Bootstrap utility to hide
    });

    // Show the targeted section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('d-none');
    }
    
    // Collapse mobile menu after click
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).hide();
    }
}

// ==========================================
// 3. PROPERTY RENDERING LOGIC
// ==========================================
function renderProperties(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content

    if (data.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted"><h5>No properties found matching your criteria.</h5></div>`;
        return;
    }

    data.forEach(prop => {
        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${prop.image}" class="card-img-top" alt="${prop.title}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-${prop.type === 'Rent' ? 'success' : 'primary'}">${prop.type}</span>
                            <small class="text-muted"><i class="fa-solid fa-location-dot"></i> ${prop.location}</small>
                        </div>
                        <h5 class="card-title">${prop.title}</h5>
                        <p class="card-text fw-bold text-primary">${prop.price}</p>
                    </div>
                    <div class="card-footer bg-white border-top-0">
                        <button class="btn btn-outline-primary w-100" onclick="inquireProperty('${prop.title}')">Details</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// Helper to pre-fill message in contact form
function inquireProperty(title) {
    showSection('contact');
    document.getElementById('message').value = `I am interested in the ${title}. Please contact me.`;
}

// ==========================================
// 4. SEARCH / FILTER LOGIC
// ==========================================
function filterProperties() {
    const typeValue = document.getElementById('typeFilter').value;
    const locationValue = document.getElementById('locationSearch').value.toLowerCase();

    const filtered = properties.filter(prop => {
        const matchesType = (typeValue === 'all') || (prop.type === typeValue);
        const matchesLocation = prop.location.toLowerCase().includes(locationValue);
        return matchesType && matchesLocation;
    });

    renderProperties(filtered, 'property-list');
}

// Add event listeners for real-time search (optional, or rely on button)
document.getElementById('typeFilter').addEventListener('change', filterProperties);
document.getElementById('locationSearch').addEventListener('keyup', filterProperties);

// ==========================================
// 5. FORM VALIDATION LOGIC
// ==========================================
const contactForm = document.getElementById('visitForm');
const formAlert = document.getElementById('formAlert');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset Alert
    formAlert.classList.add('d-none');
    formAlert.classList.remove('alert-success', 'alert-danger');

    // Validation Rules
    // 1. Name cannot be empty
    if (name === "") {
        showAlert("Please enter your full name.", "danger");
        return;
    }

    // 2. Phone must be numeric (simple check)
    // isNaN returns true if it is NOT a number. 
    if (phone === "" || isNaN(phone)) {
        showAlert("Please enter a valid numeric phone number.", "danger");
        return;
    }

    // 3. Message cannot be empty
    if (message === "") {
        showAlert("Please enter a message.", "danger");
        return;
    }

    // If all pass:
    showAlert("Visit Scheduled Successfully! We will contact you soon.", "success");
    contactForm.reset();
});

function showAlert(msg, type) {
    formAlert.textContent = msg;
    formAlert.classList.add(`alert-${type}`);
    formAlert.classList.remove('d-none');
}

// ==========================================
// 6. INITIALIZATION
// ==========================================
// Run on page load
window.onload = function() {
    // Load all properties into the main property page
    renderProperties(properties, 'property-list');
    
    // Load just the first 3 properties into the Home Featured section
    renderProperties(properties.slice(0, 3), 'featured-container');
};