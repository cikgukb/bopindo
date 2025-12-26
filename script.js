document.getElementById('leadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.innerText;

    // Change button state
    submitBtn.innerText = 'Memproses...';
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city')
    };

    // Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycby3NcssppO2N_32SOBDBD4Lx2r6qPki73TWoaEBWOItdm0FAaN41jnqyBV08dB168AO/exec';
    const whatsappLink = 'https://chat.whatsapp.com/IPGaiff27K6CypgOwGrKkL';

    // Log data (for testing purposes)
    console.log('Form data being sent:', data);

    // Send to Google Sheets using JSON
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log('Success response received');
            handleSuccess();
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.');
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        });

    function handleSuccess() {
        // 1. Show the Modal
        const modalOverlay = document.getElementById('modalOverlay');
        const modalContent = document.getElementById('modalContent');

        modalOverlay.style.display = 'flex';
        setTimeout(() => {
            modalContent.classList.add('show');
        }, 10);

        // 2. Automated Redirect to WhatsApp after 3 seconds
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
        }, 3000);

        // Reset button
        submitBtn.innerText = 'Sudah Terdaftar!';
    }
});

// Animation on scroll observer
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate');
    observer.observe(section);
});
