document.getElementById('leadForm').addEventListener('submit', function(e) {
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
        phone: formData.get('phone'),
        city: formData.get('city'),
        timestamp: new Date().toLocaleString('id-ID')
    };

    // Google Apps Script Web App URL (User needs to replace this)
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
    const whatsappLink = 'https://chat.whatsapp.com/IPGaiff27K6CypgOwGrKkL';

    // Log data (for testing purposes)
    console.log('Form data being sent:', data);

    // Simulate sending to Google Sheets (Replace with actual fetch if URL is provided)
    // fetch(scriptURL, {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     cache: 'no-cache',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
    // .then(response => {
    //     handleSuccess();
    // })
    // .catch(error => {
    //     console.error('Error!', error.message);
    //     alert('Terjadi kesalahan. Silakan coba lagi atau hubungi via WhatsApp.');
    //     submitBtn.disabled = false;
    //     submitBtn.innerText = originalBtnText;
    // });

    // For now, let's proceed directly to the success flow to show functionality
    setTimeout(() => {
        handleSuccess();
    }, 1500);

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
const observerOptions = {
    threshold: 0.1
};

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
