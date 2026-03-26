const trackModal = document.getElementById('track-modal');
const trackNav = document.getElementById('track-nav');
const trackBtn = document.getElementById('track-btn');
const closeTrack = document.getElementById('close-track');
const trackingResult = document.getElementById('tracking-result');
const statusText = document.getElementById('status-text');

// Open Modal
trackNav.onclick = (e) => {
    e.preventDefault();
    trackModal.style.display = 'flex';
};

// Close Modal
closeTrack.onclick = () => {
    trackModal.style.display = 'none';
    trackingResult.style.display = 'none'; // Reset view
};

// Track Logic
trackBtn.onclick = () => {
    const input = document.getElementById('tracking-number').value;
    if(input.trim() !== "") {
        trackingResult.style.display = 'block';
        statusText.innerText = "Your order was prepared"; // SPECIFIC MESSAGE
    } else {
        alert("Please enter a tracking number.");
    }
};