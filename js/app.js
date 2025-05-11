// Data structures
const currentUser = {
    name: 'John Doe',
    email: 'john@example.com'
};

const requests = [
    {
        id: 1,
        description: 'Looking for a summer wedding outfit',
        date: '2024-03-15',
        status: 'pending'
    },
    {
        id: 2,
        description: 'Need a business casual wardrobe',
        date: '2024-03-10',
        status: 'completed'
    },
    {
        id: 3,
        description: 'Design a party outfit',
        date: '2024-03-05',
        status: 'completed'
    }
];

const designers = [
    {
        id: 1,
        name: "Sarah Smith",
        specialty: "Wedding Attire Specialist",
        thumbnail: "Pics/3135715.png",
        rating: 4.8,
        reviews: 156,
        canMatch: true,
        portfolio: [
            "Pics/1.webp",
            "Pics/2.webp",
            "Pics/3.jpg"
        ]
    },
    {
        id: 2,
        name: "Mike Johnson",
        specialty: "Business Wear Expert",
        thumbnail: "Pics/3135715.png",
        rating: 4.6,
        reviews: 98,
        canMatch: true,
        portfolio: [
            "Pics/1.webp",
            "Pics/2.webp",
            "Pics/3.jpg"
        ]
    },
    {
        id: 3,
        name: "Alex Brown",
        specialty: "Formal Wear Designer",
        thumbnail: "Pics/3135715.png",
        rating: 4.9,
        reviews: 203,
        canMatch: true,
        portfolio: [
            "Pics/1.webp",
            "Pics/2.webp",
            "Pics/3.jpg"
        ]
    }
];

// Navigation functions
function navigateTo(page) {
    window.location.href = page;
}

// Form handling
function handleLogin(event) {
    event.preventDefault();
    navigateTo('home.html');
}

function handleRequestSubmit(event) {
    event.preventDefault();
    const description = document.getElementById('requirements').value;
    const newRequest = {
        id: requests.length + 1,
        description,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
    };
    requests.unshift(newRequest);
    navigateTo('designers.html');
}

// Chat functions
function sendMessage(designerId) {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        const designer = designers.find(d => d.id === designerId);
        if (designer) {
            designer.messages.push({
                sender: 'user',
                text: message
            });
            displayMessages(designerId);
            input.value = '';
        }
    }
}

function displayMessages(designerId) {
    const designer = designers.find(d => d.id === designerId);
    const messagesContainer = document.getElementById('chat-messages');
    
    if (designer && messagesContainer) {
        messagesContainer.innerHTML = designer.messages.map(msg => `
            <div class="message ${msg.sender}">
                <p>${msg.text}</p>
            </div>
        `).join('');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Designer filtering
function getMatchingDesigners() {
    return designers.filter(designer => designer.canMatch);
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Login page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Request submission page
    const requestForm = document.getElementById('request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', handleRequestSubmit);
    }

    // Chat page
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        const designerId = parseInt(new URLSearchParams(window.location.search).get('designerId'));
        if (designerId) {
            displayMessages(designerId);
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                sendMessage(designerId);
            });
        }
    }
}); 