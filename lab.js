/**
 * Electrical Circuit Laws - Interactive Educational Application
 * 
 * This application provides interactive calculators for:
 * - Ohm's Law (I = V / R)
 * - Kirchhoff's Current Law (KCL)
 * - Kirchhoff's Voltage Law (KVL)
 * 
 * The code is structured to be easily expandable for future additions.
 */

// ============================================================================
// NAVIGATION SYSTEM
// ============================================================================

/**
 * Initialize navigation system
 * Handles switching between different sections of the application
 */
function initNavigation() {
    // Get all navigation buttons and content sections
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    // Check if elements exist
    if (navButtons.length === 0) {
        console.error('Navigation buttons not found!');
        return;
    }

    if (contentSections.length === 0) {
        console.error('Content sections not found!');
        return;
    }

    // Add click event listeners to each navigation button
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            if (!targetSection) {
                console.error('No data-section attribute found on button');
                return;
            }

            const targetElement = document.getElementById(targetSection);
            
            if (!targetElement) {
                console.error('Target section not found:', targetSection);
                return;
            }

            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            button.classList.add('active');
            targetElement.classList.add('active');
        });
    });
}

// ============================================================================
// OHM'S LAW CALCULATOR
// ============================================================================

/**
 * Calculate current using Ohm's Law: I = V / R
 * @param {number} voltage - Voltage in volts (V)
 * @param {number} resistance - Resistance in ohms (Ω)
 * @returns {number} Current in amperes (A)
 */
function calculateOhmsLaw(voltage, resistance) {
    // Prevent division by zero
    if (resistance === 0) {
        return 0;
    }
    // Calculate and return current
    return voltage / resistance;
}

/**
 * Initialize Ohm's Law calculator
 * Sets up event listeners for voltage and resistance sliders
 */
function initOhmsLaw() {
    // Get DOM elements
    const voltageSlider = document.getElementById('voltage');
    const resistanceSlider = document.getElementById('resistance');
    const voltageDisplay = document.getElementById('voltage-value');
    const resistanceDisplay = document.getElementById('resistance-value');
    const currentDisplay = document.getElementById('current-value');

    // Check if all elements exist
    if (!voltageSlider || !resistanceSlider || !voltageDisplay || 
        !resistanceDisplay || !currentDisplay) {
        console.warn('Ohm\'s Law elements not found, skipping initialization');
        return;
    }

    /**
     * Update voltage display and recalculate current
     */
    function updateVoltage() {
        const voltage = parseFloat(voltageSlider.value);
        voltageDisplay.textContent = voltage.toFixed(1) + ' V';
        updateOhmsLawCurrent();
    }

    /**
     * Update resistance display and recalculate current
     */
    function updateResistance() {
        const resistance = parseFloat(resistanceSlider.value);
        resistanceDisplay.textContent = resistance.toFixed(1) + ' Ω';
        updateOhmsLawCurrent();
    }

    /**
     * Calculate and update current display
     */
    function updateOhmsLawCurrent() {
        const voltage = parseFloat(voltageSlider.value);
        const resistance = parseFloat(resistanceSlider.value);
        const current = calculateOhmsLaw(voltage, resistance);
        currentDisplay.textContent = current.toFixed(2) + ' A';
    }

    // Add event listeners for real-time updates
    voltageSlider.addEventListener('input', updateVoltage);
    resistanceSlider.addEventListener('input', updateResistance);

    // Initialize display with default values
    updateVoltage();
    updateResistance();
    updateOhmsLawCurrent();
}

// ============================================================================
// KIRCHHOFF'S CURRENT LAW (KCL) CALCULATOR
// ============================================================================

/**
 * Calculate outgoing current using KCL: I3 = I1 + I2
 * @param {number} i1 - First incoming current in amperes (A)
 * @param {number} i2 - Second incoming current in amperes (A)
 * @returns {number} Outgoing current in amperes (A)
 */
function calculateKCL(i1, i2) {
    // Sum of incoming currents equals outgoing current
    return i1 + i2;
}

/**
 * Initialize KCL calculator
 * Sets up event listeners for incoming current sliders
 */
function initKCL() {
    // Get DOM elements
    const i1Slider = document.getElementById('i1');
    const i2Slider = document.getElementById('i2');
    const i1Display = document.getElementById('i1-value');
    const i2Display = document.getElementById('i2-value');
    const i3Display = document.getElementById('i3-value');

    // Check if all elements exist
    if (!i1Slider || !i2Slider || !i1Display || !i2Display || !i3Display) {
        console.warn('KCL elements not found, skipping initialization');
        return;
    }

    /**
     * Update I1 display and recalculate outgoing current
     */
    function updateI1() {
        const i1 = parseFloat(i1Slider.value);
        i1Display.textContent = i1.toFixed(1) + ' A';
        updateKCLCurrent();
    }

    /**
     * Update I2 display and recalculate outgoing current
     */
    function updateI2() {
        const i2 = parseFloat(i2Slider.value);
        i2Display.textContent = i2.toFixed(1) + ' A';
        updateKCLCurrent();
    }

    /**
     * Calculate and update outgoing current display
     */
    function updateKCLCurrent() {
        const i1 = parseFloat(i1Slider.value);
        const i2 = parseFloat(i2Slider.value);
        const i3 = calculateKCL(i1, i2);
        i3Display.textContent = i3.toFixed(2) + ' A';
    }

    // Add event listeners for real-time updates
    i1Slider.addEventListener('input', updateI1);
    i2Slider.addEventListener('input', updateI2);

    // Initialize display with default values
    updateI1();
    updateI2();
    updateKCLCurrent();
}

// ============================================================================
// KIRCHHOFF'S VOLTAGE LAW (KVL) CALCULATOR
// ============================================================================

/**
 * Calculate sum of voltage drops: V = V1 + V2
 * @param {number} v1 - First voltage drop in volts (V)
 * @param {number} v2 - Second voltage drop in volts (V)
 * @returns {number} Sum of voltage drops in volts (V)
 */
function calculateKVL(v1, v2) {
    // Sum of voltage drops
    return v1 + v2;
}

/**
 * Check if KVL equation is balanced
 * @param {number} sourceVoltage - Source voltage in volts (V)
 * @param {number} voltageSum - Sum of voltage drops in volts (V)
 * @returns {boolean} True if equation is balanced (within tolerance)
 */
function isKVLBalanced(sourceVoltage, voltageSum) {
    // Allow small floating point tolerance (0.01V)
    const tolerance = 0.01;
    return Math.abs(sourceVoltage - voltageSum) < tolerance;
}

/**
 * Initialize KVL calculator
 * Sets up event listeners for source voltage and voltage drop sliders
 */
function initKVL() {
    // Get DOM elements
    const sourceVoltageSlider = document.getElementById('source-voltage');
    const v1Slider = document.getElementById('v1');
    const v2Slider = document.getElementById('v2');
    const sourceVoltageDisplay = document.getElementById('source-voltage-value');
    const v1Display = document.getElementById('v1-value');
    const v2Display = document.getElementById('v2-value');
    const voltageSumDisplay = document.getElementById('voltage-sum-value');
    const validationDisplay = document.getElementById('kvl-validation');

    // Check if all elements exist
    if (!sourceVoltageSlider || !v1Slider || !v2Slider || 
        !sourceVoltageDisplay || !v1Display || !v2Display || 
        !voltageSumDisplay || !validationDisplay) {
        console.warn('KVL elements not found, skipping initialization');
        return;
    }

    /**
     * Update source voltage display and validate KVL
     */
    function updateSourceVoltage() {
        const sourceVoltage = parseFloat(sourceVoltageSlider.value);
        sourceVoltageDisplay.textContent = sourceVoltage.toFixed(1) + ' V';
        validateKVL();
    }

    /**
     * Update V1 display and validate KVL
     */
    function updateV1() {
        const v1 = parseFloat(v1Slider.value);
        v1Display.textContent = v1.toFixed(1) + ' V';
        validateKVL();
    }

    /**
     * Update V2 display and validate KVL
     */
    function updateV2() {
        const v2 = parseFloat(v2Slider.value);
        v2Display.textContent = v2.toFixed(1) + ' V';
        validateKVL();
    }

    /**
     * Calculate voltage sum and validate KVL equation
     */
    function validateKVL() {
        const sourceVoltage = parseFloat(sourceVoltageSlider.value);
        const v1 = parseFloat(v1Slider.value);
        const v2 = parseFloat(v2Slider.value);
        const voltageSum = calculateKVL(v1, v2);
        
        // Update display
        voltageSumDisplay.textContent = voltageSum.toFixed(2) + ' V';
        
        // Check if equation is balanced and update validation message
        if (isKVLBalanced(sourceVoltage, voltageSum)) {
            validationDisplay.textContent = '✓ Equation is balanced';
            validationDisplay.style.color = '#4ade80';
        } else {
            const difference = Math.abs(sourceVoltage - voltageSum);
            validationDisplay.textContent = `⚠ Difference: ${difference.toFixed(2)} V`;
            validationDisplay.style.color = '#fbbf24';
        }
    }

    // Add event listeners for real-time updates
    sourceVoltageSlider.addEventListener('input', updateSourceVoltage);
    v1Slider.addEventListener('input', updateV1);
    v2Slider.addEventListener('input', updateV2);

    // Initialize display with default values
    updateSourceVoltage();
    updateV1();
    updateV2();
    validateKVL();
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

// ============================================================================
// BASIC ELEMENTS TABS SYSTEM
// ============================================================================

/**
 * Initialize element tabs system for Basic Elements section
 * Handles switching between different element panels
 */
function initElementTabs() {
    // Get all element tab buttons and panels
    const elementTabs = document.querySelectorAll('.element-tab');
    const elementPanels = document.querySelectorAll('.element-panel');

    // Check if elements exist
    if (elementTabs.length === 0 || elementPanels.length === 0) {
        return; // Elements tabs not present, skip initialization
    }

    // Add click event listeners to each element tab
    elementTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetElement = tab.getAttribute('data-element');
            
            if (!targetElement) {
                console.error('No data-element attribute found on tab');
                return;
            }

            const targetPanel = document.getElementById(targetElement + '-panel');
            
            if (!targetPanel) {
                console.error('Target panel not found:', targetElement);
                return;
            }

            // Remove active class from all tabs and panels
            elementTabs.forEach(t => t.classList.remove('active'));
            elementPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            targetPanel.classList.add('active');
        });
    });
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

/**
 * Initialize the entire application
 * This function sets up all calculators and navigation
 */
function initApp() {
    // Initialize navigation system
    initNavigation();
    
    // Initialize element tabs system
    initElementTabs();
    
    // Initialize all calculators
    initOhmsLaw();
    initKCL();
    initKVL();
    
    console.log('Electrical Circuit Laws application initialized successfully!');
}

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// ============================================================================
// FUTURE EXPANSION GUIDE
// ============================================================================
/*
 * To add a new section (e.g., Power Law, Series/Parallel circuits):
 * 
 * 1. Add a new button in index.html nav-bar:
 *    <button class="nav-btn" data-section="new-section">New Section</button>
 * 
 * 2. Add a new content section in index.html:
 *    <section id="new-section" class="content-section">...</section>
 * 
 * 3. Create a new calculation function:
 *    function calculateNewLaw(param1, param2) { ... }
 * 
 * 4. Create an initialization function:
 *    function initNewSection() { ... }
 * 
 * 5. Call the init function in initApp():
 *    initNewSection();
 * 
 * The navigation system will automatically handle the new section!
 */
