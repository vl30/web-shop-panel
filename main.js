function createParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 15 + 's';
        document.body.appendChild(particle);
    }
}

createParticles();

function showPayment(ram, price) {
    const modal = document.getElementById('paymentModal');
    const orderDetails = document.getElementById('orderDetails');
    const contactOwner = document.getElementById('contactOwner');
    
    orderDetails.innerHTML = `<strong><i class="fas fa-shopping-cart"></i> Detail Pesanan:</strong><br>
                            Panel ${ram} - Rp ${price.toLocaleString()}`;
    contactOwner.href = `https://wa.me/085765326564?text=bang%20gw%20udah%20bayar%20panel%20yang%20${ram}%20harga%20${price}k%20bg`;
    
    modal.style.display = 'flex';
    modal.querySelector('.modal-content').classList.add('animate__animated', 'animate__zoomIn');
}

function closeModal() {
    const modal = document.getElementById('paymentModal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.classList.remove('animate__zoomIn');
    modalContent.classList.add('animate__zoomOut');
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.classList.remove('animate__zoomOut');
    }, 300);
}

window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        closeModal();
    }
}

window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.product-card, .trust-badge, .testimonial-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

const starRating = document.getElementById('starRating');
let currentRating = 0;

starRating.addEventListener('mouseover', (e) => {
if (e.target.tagName === 'SPAN') {
const rating = parseInt(e.target.dataset.rating);
highlightStars(rating);
}
});

starRating.addEventListener('click', (e) => {
if (e.target.tagName === 'SPAN') {
currentRating = parseInt(e.target.dataset.rating);
highlightStars(currentRating);
}
});

starRating.addEventListener('mouseleave', () => {
highlightStars(currentRating);
});

function highlightStars(rating) {
const stars = starRating.children;
for (let i = 0; i < stars.length; i++) {
stars[i].classList.toggle('active', i < rating);
}
}


const testimonials = [
{
name: "fajri",
rating: 5,
package: "5GB",
review: "mantap kapan lagi panel bergaransi saat di rusuh",
date: "2024-01-03"
},
];


function submitTestimonial(event) {
event.preventDefault();

if (currentRating === 0) {
alert('Silakan berikan rating terlebih dahulu');
return;
}

const newTestimonial = {
name: document.getElementById('name').value,
rating: currentRating,
package: document.getElementById('packageType').value,
review: document.getElementById('review').value,
date: new Date().toISOString().split('T')[0]
};

testimonials.unshift(newTestimonial);
displayTestimonials('all');


const successMessage = document.getElementById('successMessage');
successMessage.style.display = 'block';

// Reset form
event.target.reset();
currentRating = 0;
highlightStars(0);


setTimeout(() => {
successMessage.style.display = 'none';
}, 3000);
}


function displayTestimonials(filter = 'all') {
const container = document.getElementById('testimonialsList');
container.innerHTML = '';

const filteredTestimonials = testimonials.filter(t => 
filter === 'all' || t.rating === parseInt(filter)
);

filteredTestimonials.forEach(t => {
const testimonialCard = document.createElement('div');
testimonialCard.className = 'testimonial-card animate__animated animate__fadeIn';
testimonialCard.innerHTML = `
    <div class="customer-info">
        <div class="customer-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div>
            <h3>${t.name}</h3>
            <div class="rating">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
            <small>Paket: ${t.package}</small>
        </div>
    </div>
    <p>${t.review}</p>
    <small class="text-muted">Diposting pada: ${t.date}</small>
`;
container.appendChild(testimonialCard);
});
}


displayTestimonials();


document.querySelectorAll('.filter-btn').forEach(btn => {
btn.addEventListener('click', (e) => {
document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
e.target.classList.add('active');
displayTestimonials(e.target.dataset.rating);
});
});
