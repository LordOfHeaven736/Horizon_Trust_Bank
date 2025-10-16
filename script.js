document.addEventListener('DOMContentLoaded', () => {

    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // --- Utility Functions (Currency, Clock) ---

    // 1. Currency Formatter (Used by Calculator)
    const formatCurrency = (amount) => {
        return `₹ ${new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }).format(amount)}`;
    };

    // 2. Real-Time Clock
    function updateClock() {
        const now = new Date();
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const display = document.getElementById('current-time-display');
        if (display) {
            display.textContent = now.toLocaleDateString('en-IN', options);
        }
    }
    // Set a recurring interval to update the clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call

    // 3. Simulated Exchange Rate Fetch
    function loadExchangeRates() {
        // Mocking a fetch request delay
        setTimeout(() => {
            const rates = [
                { currency: 'USD', rate: 83.50, trend: 'up' },
                { currency: 'EUR', rate: 89.25, trend: 'down' },
                { currency: 'GBP', rate: 102.15, trend: 'up' },
                { currency: 'JPY', rate: 0.552, trend: 'down' },
            ];

            const ratesList = document.getElementById('rates-list');
            const timestamp = document.getElementById('rates-timestamp');
            
            if (ratesList && timestamp) {
                ratesList.innerHTML = rates.map(r => `
                    <div class="rate-item">
                        <h5>1 ${r.currency} to INR</h5>
                        <p class="rate-value">${formatCurrency(r.rate)} 
                            <i class="fas fa-caret-${r.trend === 'up' ? 'up' : 'down'}" style="color: ${r.trend === 'up' ? '#28a745' : '#dc3545'}; font-size: 0.7em;"></i>
                        </p>
                    </div>
                `).join('');

                timestamp.textContent = new Date().toLocaleTimeString('en-IN');
            }
        }, 500); // Simulate network delay
    }

    // --- Core Dynamic Functionalities ---

    // 4. Accordion/FAQ Initializer
    function initializeAccordion() {
        const headers = document.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                
                // Toggle active class on header
                this.classList.toggle('active');
                
                // Toggle content visibility
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    content.style.padding = '0 15px'; // Collapse
                } else {
                    // Set max-height to the actual scroll height + padding for smooth animation
                    content.style.maxHeight = content.scrollHeight + 30 + "px";
                    content.style.padding = '0 15px 15px 15px'; // Expand
                }
                
                // Optional: Close other open accordions
                headers.forEach(otherHeader => {
                    if (otherHeader !== this && otherHeader.classList.contains('active')) {
                        otherHeader.classList.remove('active');
                        otherHeader.nextElementSibling.style.maxHeight = null;
                        otherHeader.nextElementSibling.style.padding = '0 15px';
                    }
                });
            });
        });

        // Add handler for the Call Customer Care button
        const callButton = document.querySelector('.content-right .login-btn');
        if (callButton) {
            callButton.addEventListener('click', () => {
                alert("Calling Horizon Trust Customer Care Hotline: 1800-200-HTB. Please wait for connection...");
            });
        }
    }


    // 5. EMI Calculator Logic
    function initializeEMICalculator() {
        const amountInput = document.getElementById('loan-amount');
        const rateInput = document.getElementById('interest-rate');
        const termInput = document.getElementById('loan-term');
        const calculateBtn = document.getElementById('calculate-emi-btn');

        const emiResultSpan = document.getElementById('emi-result');
        const principalSpan = document.getElementById('principal-amount');
        const totalInterestSpan = document.getElementById('total-interest');
        const totalPaymentSpan = document.getElementById('total-payment');

        if (!calculateBtn) return; // Stop if not on the home page

        function calculateEMI() {
            const P = parseFloat(amountInput.value);
            const annualRate = parseFloat(rateInput.value);
            const years = parseFloat(termInput.value);

            if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
                emiResultSpan.textContent = 'Invalid Input';
                principalSpan.textContent = 'N/A';
                totalInterestSpan.textContent = 'N/A';
                totalPaymentSpan.textContent = 'N/A';
                return;
            }

            const R = (annualRate / 100) / 12; // Monthly interest rate
            const N = years * 12;              // Total number of payments

            const powerFactor = Math.pow((1 + R), N);
            // EMI Formula: [P * R * (1 + R)^N] / [(1 + R)^N – 1]
            const EMI = P * R * powerFactor / (powerFactor - 1);

            const totalPayment = EMI * N;
            const totalInterest = totalPayment - P;

            emiResultSpan.textContent = formatCurrency(EMI);
            principalSpan.textContent = formatCurrency(P);
            totalInterestSpan.textContent = formatCurrency(totalInterest);
            totalPaymentSpan.textContent = formatCurrency(totalPayment);
        }
        
        calculateBtn.addEventListener('click', calculateEMI);
        [amountInput, rateInput, termInput].forEach(input => {
            input.addEventListener('input', calculateEMI);
        });

        calculateEMI();
    }
    
    // 6. Service Detail Modal Initializer
    function initializeModals() {
        const modal = document.getElementById('service-modal');
        const closeBtn = document.querySelector('.close-btn');
        const tileCards = document.querySelectorAll('.tile-card');
        const modalTitle = document.getElementById('modal-service-title');
        const modalDesc = document.getElementById('modal-service-description');
        const modalActionBtn = document.querySelector('.modal-action-btn');

        if (!modal) return;

        tileCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceName = card.getAttribute('data-service');
                const serviceDesc = card.getAttribute('data-desc');
                modalTitle.textContent = serviceName;
                modalDesc.textContent = serviceDesc;
                modalActionBtn.textContent = `Learn More about ${serviceName}`;
                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // --- NEW: Account View Functionality ---

    // 8. Dynamic Account View Data
    const ACCOUNT_DATA = {
        checking: {
            title: "Checking Account",
            balance: 154500.75,
            status: "Active",
            statusClass: "status-active",
            details: [
                { label: "Recent Transaction", value: "Amazon - ₹ 1,200.00" },
                { label: "Account Type", value: "Standard Checking" },
                { label: "Monthly Transfer Limit", value: "₹ 5,00,000" }
            ]
        },
        savings: {
            title: "High-Interest Savings",
            balance: 550000.00,
            status: "Locked",
            statusClass: "status-locked",
            details: [
                { label: "Interest Rate", value: "5.5% p.a." },
                { label: "Next Interest Date", value: "1st Nov 2025" },
                { label: "Minimum Balance", value: "₹ 5,000" }
            ]
        },
        credit: {
            title: "Platinum Credit Card",
            balance: 3500.00, // Amount Due
            status: "Due",
            statusClass: "status-credit",
            details: [
                { label: "Credit Limit", value: "₹ 1,50,000" },
                { label: "Available Credit", value: "₹ 1,46,500.00" },
                { label: "Payment Due Date", value: "25th Oct 2025" }
            ]
        }
    };

    // 9. Account Switcher Logic
    function initializeAccountSwitcher() {
        const selector = document.getElementById('account-select');
        const displayDiv = document.getElementById('account-details-display');

        if (!selector || !displayDiv) return;

        function renderAccountDetails(accountKey) {
            const data = ACCOUNT_DATA[accountKey];
            if (!data) return;

            // Generate HTML for details
            const detailHTML = data.details.map(item => `
                <div class="account-detail-item">
                    <span>${item.label}</span>
                    <span>${item.value}</span>
                </div>
            `).join('');

            // Generate main content HTML
            const content = `
                <h3>${data.title}</h3>
                <div class="account-detail-item">
                    <span>Current Balance / Amount Due:</span>
                    <span class="result-value">${formatCurrency(data.balance)}</span>
                </div>
                <div class="account-detail-item">
                    <span>Account Status:</span>
                    <span class="status-tag ${data.statusClass}">${data.status}</span>
                </div>
                ${detailHTML}
                <button class="login-btn" style="width: 100%; margin-top: 20px;">View Full Statement</button>
            `;

            displayDiv.innerHTML = content;
        }

        // Event listener for the dropdown change
        selector.addEventListener('change', (e) => {
            renderAccountDetails(e.target.value);
        });
        
        // Load the default account (Checking) on initialization
        renderAccountDetails(selector.value);
    }

    // 7. Client-Side Router - UPDATED to call new function
    function navigateTo(pageName) {
        // NOTE: PAGE_TEMPLATES must be defined in pages.js and loaded before this script.
        const getTemplate = PAGE_TEMPLATES[pageName] || PAGE_TEMPLATES['home'];
        appContent.innerHTML = getTemplate();

        // Run post-load initialization scripts based on the page
        if (pageName === 'home') {
            initializeAccountSwitcher(); // <--- NEW CALL
            initializeEMICalculator();
            loadExchangeRates();
            initializeModals();
            initializeAccordion(); 
        } else if (pageName === 'pay' || pageName === 'invest') {
            // Placeholder for other page specific functions
        }

        // Update active navigation link state
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active-link');
            }
        });
        
        document.getElementById('main-nav-menu').classList.remove('active');
        window.history.pushState({}, pageName, `#${pageName}`);
        window.scrollTo(0, 0);
    }

    // --- Event Listeners and Initial Load ---
    
    // Event listener for all main navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.getAttribute('data-page');
            navigateTo(page);
        });
    });

    // Handle initial load and back/forward browser buttons
    window.addEventListener('hashchange', () => {
        const page = window.location.hash.substring(1) || 'home';
        navigateTo(page);
    });
    
    // Perform initial page load
    const initialPage = window.location.hash.substring(1) || 'home';
    navigateTo(initialPage);
    
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavContent = document.getElementById('main-nav-menu');

    if (menuToggle && mainNavContent) {
        menuToggle.addEventListener('click', () => {
            mainNavContent.classList.toggle('active');
        });
    }

    // 10. Search Bar & Login Actions (Simulated)
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn'); 
    const loginButton = document.querySelector('.login-btn');

    // Function to perform the simulated search
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching Horizon Trust for: "${query}".`);
            searchInput.value = '';
        } else {
            alert('Please enter a search query.');
        }
    };
    
    // Attach event listener to the new Search Button
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Keep Enter key functionality on the input field
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            alert('Redirecting to the secure online banking login portal...');
        });
    }
});