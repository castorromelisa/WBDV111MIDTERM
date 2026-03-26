document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const sendBtn = document.getElementById('sendBtn');
    const cmdInput = document.getElementById('cmdInput');
    const chatDisplay = document.getElementById('chatDisplay');
    const openTicketBtn = document.getElementById('openTicketBtn');
    const ticketList = document.getElementById('ticketList');
    const fileInput = document.getElementById('fileInput');
    const categoryTag = document.getElementById('categoryTag');

    // --- 1. Terminal Logging Engine ---
    const addLog = (sender, message, type = 'normal') => {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = `> ${sender}: ${message.toUpperCase()}`;
        
        // Keep the cursor at the bottom
        const cursor = chatDisplay.querySelector('.cursor');
        chatDisplay.insertBefore(entry, cursor);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    };

    // --- 2. Message & File Execution ---
    const handleSend = () => {
        const message = cmdInput.value.trim();
        const tag = categoryTag.value;
        const file = fileInput.files[0];

        if (!message && !file) {
            addLog('SYSTEM', 'ERROR: EMPTY_INPUT_DETECTED', 'error');
            return;
        }

        // Handle Text
        if (message) {
            addLog('USER', `[${tag}] ${message}`);
        }

        // Handle File Upload Simulation
        if (file) {
            addLog('SYSTEM', `UPLOADING_DATA_PACKET: ${file.name}...`);
            setTimeout(() => {
                addLog('SYSTEM', `UPLOAD_COMPLETE: ${file.name} (CRC_VALID)`);
            }, 1000);
        }

        // Reset Inputs
        cmdInput.value = '';
        fileInput.value = '';
        cmdInput.focus();
    };

    // --- 3. Dynamic Ticket Management ---
    const createNewTicket = () => {
        const currentCount = ticketList.querySelectorAll('.ticket-item').length;
        const ticketID = (currentCount + 1).toString().padStart(3, '0');
        
        const newTicket = document.createElement('div');
        newTicket.className = 'ticket-item';
        newTicket.textContent = `#${ticketID} - OPEN`;
        
        // Left Click to View
        newTicket.onclick = () => {
            addLog('SYSTEM', `ACCESSING_ARCHIVE: TICKET_${ticketID}`);
        };

        // Right Click to Delete (Context Menu)
        newTicket.oncontextmenu = (e) => {
            e.preventDefault(); // Stop the default browser menu
            if (confirm(`PURGE TICKET #${ticketID} FROM DATABASE?`)) {
                newTicket.remove();
                addLog('SYSTEM', `DELETION_SUCCESSFUL: TICKET_${ticketID}`);
            }
        };

        ticketList.appendChild(newTicket);
        addLog('SYSTEM', `NEW_INSTANCE_CREATED: ID_${ticketID}`);
    };

    // --- 4. Event Listeners ---
    sendBtn.addEventListener('click', handleSend);

    cmdInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    openTicketBtn.addEventListener('click', createNewTicket);

    // Initial listener for the 3 static tickets in your HTML
    document.querySelectorAll('.ticket-item').forEach(item => {
        item.oncontextmenu = (e) => {
            e.preventDefault();
            if (confirm("DELETE THIS LOG?")) item.remove();
        };
    });
});