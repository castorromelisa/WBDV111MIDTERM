/**
 * 1. WORKFLOW TRACKER
 * 0 = Select Diet Type (Plans page)
 * 1 = Choose Weekly Meals (Home page)
 * 2 = Enter Delivery
 * 3 = View Macros
 */

function updateWorkflowUI() {
    const workflowContainer = document.querySelector('.steps');
    if (!workflowContainer) return;

    // Get the current step from memory (default to 0)
    const currentStep = parseInt(sessionStorage.getItem('activeStep')) || 0;

    const steps = [
        "Select Diet Type",
        "Choose Weekly Meals",
        "Enter Delivery",
        "View Macros"
    ];

    // Map through the steps and wrap the current one in the 'active' span
    const htmlOutput = steps.map((text, index) => {
        return index === currentStep ? `<span class="active">${text}</span>` : text;
    }).join(" &rarr; ");

    workflowContainer.innerHTML = htmlOutput;
}

// Function to move the bar forward
function goToStep(stepNumber) {
    sessionStorage.setItem('activeStep', stepNumber);
    updateWorkflowUI();
}

/**
 * 2. PAGE ACTIONS
 */

// On plans.html
function processPurchase(planName, price) {
    const confirmPlan = confirm(`Activate the ${planName}?`);
    if (confirmPlan) {
        saveToBilling(planName, price);
        goToStep(1); // Move to 'Choose Weekly Meals'
        alert("Plan Activated! Let's choose your meals.");
        window.location.href = "home.html";
    }
}

// On home.html
function purchaseMeal(mealName) {
    alert(`${mealName} added to your box!`);
    
    // Move to 'Enter Delivery'
    goToStep(2);

    const address = prompt("Step 3: Enter Delivery Address:");
    if (address) {
        alert("Address saved!");
        // Move to 'View Macros'
        goToStep(3);
        
        // Show a final macro summary
        alert("Final Step: View Macros\nYour meals are balanced and ready for delivery!");
    }
}

/**
 * 3. BILLING & UI UTILITIES
 */

function saveToBilling(item, price) {
    const history = JSON.parse(localStorage.getItem('billingHistory')) || [];
    history.unshift({
        date: new Date().toLocaleDateString(),
        item: item,
        amount: `$${price.toFixed(2)}`,
        status: 'Paid'
    });
    localStorage.setItem('billingHistory', JSON.stringify(history));
}

function loadBillingTable() {
    const tableBody = document.getElementById('billing-body');
    if (!tableBody) return;

    const history = JSON.parse(localStorage.getItem('billingHistory')) || [];
    if (history.length > 0) {
        tableBody.innerHTML = ''; // Clear default
        history.forEach(data => {
            tableBody.innerHTML += `
                <tr>
                    <td>${data.date}</td>
                    <td>${data.item}</td>
                    <td>${data.amount}</td>
                    <td><span class="status-paid">${data.status}</span></td>
                </tr>`;
        });
    }
}

function toggleDrawer() {
    document.getElementById('drawer').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

// Initialize on every page load
window.onload = function() {
    updateWorkflowUI();
    loadBillingTable();
};