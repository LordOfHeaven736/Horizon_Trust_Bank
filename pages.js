// Function to generate the Home Page content, including the EMI calculator and widgets.
// Function to generate the Home Page content, including the EMI calculator and widgets.
const getHomePageTemplate = () => `
    
    <section class="section account-overview-section">
        <h2 class="section-title">Your Account Overview 🏦</h2>
        <div class="account-selector-bar">
            <label for="account-select">View Account:</label>
            <select id="account-select">
                <option value="checking">Checking Account (A/C: **** 1234)</option>
                <option value="savings">Savings Account (A/C: **** 5678)</option>
                <option value="credit">Credit Card (Card: **** 9012)</option>
            </select>
        </div>
        <div id="account-details-display" class="account-details-card">
            <p>Select an account to view details.</p>
        </div>
    </section>
    
    <hr>
    
    <section class="section">
        <h2 class="section-title">Insta Customer Services</h2>
        <div class="card-grid">
            <div class="card">
                <div class="icon-placeholder"><i class="fas fa-credit-card"></i></div>
                <h3>Debit Card Instant Pin Re-generation</h3>
                <p>Set Debit Card PIN instantly</p>
            </div>
            <div class="card">
                <div class="icon-placeholder"><i class="fas fa-home"></i></div>
                <h3>Address Change</h3>
                <p>Update mailing or permanent or both the address</p>
            </div>
            <div class="card">
                <div class="icon-placeholder"><i class="fas fa-exchange-alt"></i></div>
                <h3>Account Transfer</h3>
                <p>Bank Account Transfer from one Branch to another</p>
            </div>
            <div class="card">
                <div class="icon-placeholder"><i class="fas fa-id-card-alt"></i></div>
                <h3>Update KYC</h3>
                <p>Update KYC digitally with ease</p>
            </div>
        </div>
    </section>

    <hr>

    <section class="section split-content">
        <div class="content-left">
            <h2 class="section-title">Loan EMI Calculator</h2>
            
            <div class="calculator-form">
                <div class="form-group">
                    <label for="loan-amount">Loan Amount (₹)</label>
                    <input type="number" id="loan-amount" value="500000" min="10000" step="1000">
                </div>
                <div class="form-group">
                    <label for="interest-rate">Annual Interest Rate (%)</label>
                    <input type="number" id="interest-rate" value="10.5" min="1" max="30" step="0.1">
                </div>
                <div class="form-group">
                    <label for="loan-term">Loan Term (Years)</label>
                    <input type="number" id="loan-term" value="5" min="1" max="30" step="1">
                </div>
                
                <button id="calculate-emi-btn" class="login-btn" style="width: 100%; margin-left: 0;">Calculate EMI</button>
                
                <div class="calculator-results">
                    <h4>Monthly EMI: <span id="emi-result" class="result-value">₹ 0.00</span></h4>
                    <p>Principal Amount: <span id="principal-amount">₹ 500,000</span></p>
                    <p>Total Interest Payable: <span id="total-interest">₹ 0.00</span></p>
                    <p>Total Payment (P+I): <span id="total-payment">₹ 0.00</span></p>
                </div>
            </div>

        </div>
        <div class="content-right">
            <h2 class="section-title">Quick Answers & Support</h2>
            
            <div class="faq-accordion" id="help-accordion">
                <div class="accordion-item">
                    <button class="accordion-header">
                        How do I reset my Net Banking password?
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="accordion-content">
                        <p>Go to the Login page, click 'Forgot Password,' and follow the steps. You will need your Debit Card details and registered mobile number for instant reset.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <button class="accordion-header">
                        Where can I find the IFSC code?
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="accordion-content">
                        <p>The IFSC code is printed on your cheque book. You can also find it on the bottom of your passbook or by using the 'Locate Us' link in the top navigation bar.</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <button class="accordion-header">
                        How do I report a lost/stolen card?
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="accordion-content">
                        <p>Call our 24/7 hotline immediately at 1800-200-HTB to block your card. You can also block it via Mobile Banking or WhatsApp Banking instantly.</p>
                    </div>
                </div>
            </div>

            <button class="login-btn" style="width: 100%; margin-top: 20px; background-color: #f7931e;">
                <i class="fas fa-phone-alt"></i> Call Customer Care
            </button>
        </div>
    </section>

    <hr>
    
    <section class="section exchange-rates-widget">
        <h2 class="section-title">Global Exchange Rates (Indicative)</h2>
        <div class="rates-list" id="rates-list">
            <p>Loading real-time rates...</p>
        </div>
        <p class="mt-4 text-xs text-center text-gray-500">Last updated: <span id="rates-timestamp">N/A</span></p>
    </section>
    
    <hr>

    <section class="section">
        <h2 class="section-title">Ways to Bank</h2>
        <div class="card-grid ways-to-bank-grid">
            <div class="tile-card" data-service="WhatsApp Banking" data-desc="Interact with us instantly on WhatsApp. Start a chat with 'Hi' to access services like balance check, statement request, and much more, available 24/7.">
                <div class="icon-placeholder"><i class="fab fa-whatsapp"></i></div>
                <h4>WhatsApp Banking</h4>
                <p>Text Hi on 7000000000. Enjoy 200+ Banking Services</p>
            </div>
            <div class="tile-card" data-service="PayApp" data-desc="Our new mobile payment application! Seamless, secure, and smart. Manage all your bills, transfers, and online payments with exciting new offers and a cleaner interface.">
                <div class="icon-placeholder"><i class="fas fa-mobile-alt"></i></div>
                <h4>PayApp</h4>
                <p>All New PayApp For Online Payments. All New Offers!</p>
            </div>
            <div class="tile-card" data-service="Mobile Banking" data-desc="The comprehensive mobile application that puts the entire bank at your fingertips. Perform over 250+ banking services, from opening an FD to applying for a loan, wherever you are.">
                <div class="icon-placeholder"><i class="fas fa-hand-holding-usd"></i></div>
                <h4>MobileBanking</h4>
                <p>Get over 250+ banking products and services at your fingertips.</p>
            </div>
            <div class="tile-card premier" data-service="Premier Banking" data-desc="Exclusive banking services designed for discerning clients. Benefit from dedicated relationship managers, preferential rates, and curated financial products to suit a premier lifestyle.">
                <div class="icon-placeholder"><i class="fas fa-user-tie"></i></div>
                <h4>Premier</h4>
                <p>Premier Banking to suit every life style</p>
            </div>
        </div>
    </section>
`;
// ... (Other PAGE_TEMPLATES remain the same) ...
// Template for the "PAY" page
const getPayPageTemplate = () => `
    <section class="section dynamic-page">
        <h2 class="section-title">Seamless Payments & Transfers</h2>
        <p class="text-lg">This page handles all payment options: UPI, NEFT, RTGS, Bill Pay, and Wallet Management.</p>
        <div class="card-grid" style="margin-top: 30px;">
            <div class="card" style="cursor: default;">
                <div class="icon-placeholder"><i class="fas fa-money-check-alt"></i></div>
                <h3>One-Click Bill Pay</h3>
                <p>Pay electricity, gas, and mobile bills instantly.</p>
            </div>
            <div class="card" style="cursor: default;">
                <div class="icon-placeholder"><i class="fas fa-qrcode"></i></div>
                <h3>UPI Scanner</h3>
                <p>Scan & Pay directly from your bank account.</p>
            </div>
            <div class="card" style="cursor: default;">
                <div class="icon-placeholder"><i class="fas fa-exchange-alt"></i></div>
                <h3>Fund Transfer</h3>
                <p>NEFT/RTGS transfers available 24/7.</p>
            </div>
        </div>
        <button class="login-btn" style="margin-top: 20px;">Start a New Payment</button>
    </section>
`;

// Template for the "INVEST" page
const getInvestPageTemplate = () => `
    <section class="section dynamic-page">
        <h2 class="section-title">Grow Your Wealth with Horizon Trust</h2>
        <p class="text-lg">Explore our range of investment products designed for every goal and risk appetite.</p>
        <div class="card-grid" style="margin-top: 30px;">
            <div class="card" style="cursor: default;">
                <div class="icon-placeholder"><i class="fas fa-chart-line"></i></div>
                <h3>Mutual Funds</h3>
                <p>Invest in top-rated funds instantly.</p>
            </div>
            <div class="card" style="cursor: default;">
                <div class="icon-placeholder"><i class="fas fa-piggy-bank"></i></div>
                <h3>Fixed Deposits</h3>
                <p>High-interest FDs with flexible tenure.</p>
            </div>
            <div class="card" style="cursor: default;">
                <div class="icon-placeholder"><i class="fas fa-dollar-sign"></i></div>
                <h3>Stock Trading</h3>
                <p>Integrated brokerage for stocks and ETFs.</p>
            </div>
        </div>
        <button class="login-btn" style="margin-top: 20px; background-color: #28a745;">Explore Investment Options</button>
    </section>
`;

// Central map of all templates
const PAGE_TEMPLATES = {
    home: getHomePageTemplate,
    pay: getPayPageTemplate,
    invest: getInvestPageTemplate,
    save: () => `<section class="dynamic-page"><h2>Saving & Deposits</h2><p>Find the best recurring and fixed deposit schemes here.</p></section>`,
    borrow: () => `<section class="dynamic-page"><h2>Loans & Credit</h2><p>Apply for a Personal, Home, or Car loan in minutes.</p></section>`,
    insure: () => `<section class="dynamic-page"><h2>Insurance Services</h2><p>Protect your future with our life and health insurance plans.</p></section>`,
    offers: () => `<section class="dynamic-page"><h2>Exclusive Bank Offers</h2><p>Check out the latest discounts and cashback offers on cards and loans.</p></section>`,
};