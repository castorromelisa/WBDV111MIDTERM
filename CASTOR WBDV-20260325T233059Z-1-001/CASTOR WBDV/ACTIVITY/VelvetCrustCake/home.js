
let orderData = {
    cake: "",
    flavor: "",
    date: ""
};

function selectCake(name) {
    orderData.cake = name;
    document.getElementById('selected-cake-name').innerText = name;
    nextStep(2);
}

function nextStep(stepNumber) {
    document.querySelectorAll('.step-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    document.querySelectorAll('.step').forEach(step => {
        const stepIdx = parseInt(step.getAttribute('data-step'));
        if (stepIdx <= stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}