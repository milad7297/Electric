/**
 * Electrical Circuits - Professional Educational Platform
 * Navigation and Interactive Features
 */

// ============================================================================
// MAIN NAVIGATION SYSTEM
// ============================================================================

function initMainNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link and corresponding section
            link.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// ============================================================================
// DATA SUBSECTION NAVIGATION
// ============================================================================

function initDataNavigation() {
    const dataNavButtons = document.querySelectorAll('.data-nav-btn');
    const dataSubsections = document.querySelectorAll('.data-subsection');

    dataNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSubsection = button.getAttribute('data-subsection');

            // Remove active class from all buttons and subsections
            dataNavButtons.forEach(btn => btn.classList.remove('active'));
            dataSubsections.forEach(sub => sub.classList.remove('active'));

            // Add active class to clicked button and corresponding subsection
            button.classList.add('active');
            const targetElement = document.getElementById(targetSubsection + '-subsection');
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// ============================================================================
// ELEMENT TABS SYSTEM
// ============================================================================

function initElementTabs() {
    const elementTabs = document.querySelectorAll('.element-tab');
    const elementPanels = document.querySelectorAll('.element-panel');

    elementTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetElement = tab.getAttribute('data-element');

            if (!targetElement) return;

            const targetPanel = document.getElementById(targetElement + '-panel');
            if (!targetPanel) return;

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
// OHM'S LAW CALCULATOR
// ============================================================================

function calculateOhmsLaw(voltage, resistance) {
    if (resistance === 0) return 0;
    return voltage / resistance;
}

function initOhmsLaw() {
    const voltageSlider = document.getElementById('voltage');
    const resistanceSlider = document.getElementById('resistance');
    const voltageDisplay = document.getElementById('voltage-value');
    const resistanceDisplay = document.getElementById('resistance-value');
    const currentDisplay = document.getElementById('current-value');

    if (!voltageSlider || !resistanceSlider || !voltageDisplay || 
        !resistanceDisplay || !currentDisplay) {
        return;
    }

    function updateVoltage() {
        const voltage = parseFloat(voltageSlider.value);
        voltageDisplay.textContent = voltage.toFixed(1) + ' V';
        updateCurrent();
    }

    function updateResistance() {
        const resistance = parseFloat(resistanceSlider.value);
        resistanceDisplay.textContent = resistance.toFixed(1) + ' Ω';
        updateCurrent();
    }

    function updateCurrent() {
        const voltage = parseFloat(voltageSlider.value);
        const resistance = parseFloat(resistanceSlider.value);
        const current = calculateOhmsLaw(voltage, resistance);
        currentDisplay.textContent = current.toFixed(2) + ' A';
    }

    voltageSlider.addEventListener('input', updateVoltage);
    resistanceSlider.addEventListener('input', updateResistance);

    updateVoltage();
    updateResistance();
    updateCurrent();
}

// ============================================================================
// KCL CALCULATOR
// ============================================================================

function calculateKCL(i1, i2) {
    return i1 + i2;
}

function initKCL() {
    const i1Slider = document.getElementById('i1');
    const i2Slider = document.getElementById('i2');
    const i1Display = document.getElementById('i1-value');
    const i2Display = document.getElementById('i2-value');
    const i3Display = document.getElementById('i3-value');

    if (!i1Slider || !i2Slider || !i1Display || !i2Display || !i3Display) {
        return;
    }

    function updateI1() {
        const i1 = parseFloat(i1Slider.value);
        i1Display.textContent = i1.toFixed(1) + ' A';
        updateKCLCurrent();
    }

    function updateI2() {
        const i2 = parseFloat(i2Slider.value);
        i2Display.textContent = i2.toFixed(1) + ' A';
        updateKCLCurrent();
    }

    function updateKCLCurrent() {
        const i1 = parseFloat(i1Slider.value);
        const i2 = parseFloat(i2Slider.value);
        const i3 = calculateKCL(i1, i2);
        i3Display.textContent = i3.toFixed(2) + ' A';
    }

    i1Slider.addEventListener('input', updateI1);
    i2Slider.addEventListener('input', updateI2);

    updateI1();
    updateI2();
    updateKCLCurrent();
}

// ============================================================================
// KVL CALCULATOR
// ============================================================================

function calculateKVL(v1, v2) {
    return v1 + v2;
}

function isKVLBalanced(sourceVoltage, voltageSum) {
    const tolerance = 0.01;
    return Math.abs(sourceVoltage - voltageSum) < tolerance;
}

function initKVL() {
    const sourceVoltageSlider = document.getElementById('source-voltage');
    const v1Slider = document.getElementById('v1');
    const v2Slider = document.getElementById('v2');
    const sourceVoltageDisplay = document.getElementById('source-voltage-value');
    const v1Display = document.getElementById('v1-value');
    const v2Display = document.getElementById('v2-value');
    const voltageSumDisplay = document.getElementById('voltage-sum-value');
    const validationDisplay = document.getElementById('kvl-validation');

    if (!sourceVoltageSlider || !v1Slider || !v2Slider || 
        !sourceVoltageDisplay || !v1Display || !v2Display || 
        !voltageSumDisplay || !validationDisplay) {
        return;
    }

    function updateSourceVoltage() {
        const sourceVoltage = parseFloat(sourceVoltageSlider.value);
        sourceVoltageDisplay.textContent = sourceVoltage.toFixed(1) + ' V';
        validateKVL();
    }

    function updateV1() {
        const v1 = parseFloat(v1Slider.value);
        v1Display.textContent = v1.toFixed(1) + ' V';
        validateKVL();
    }

    function updateV2() {
        const v2 = parseFloat(v2Slider.value);
        v2Display.textContent = v2.toFixed(1) + ' V';
        validateKVL();
    }

    function validateKVL() {
        const sourceVoltage = parseFloat(sourceVoltageSlider.value);
        const v1 = parseFloat(v1Slider.value);
        const v2 = parseFloat(v2Slider.value);
        const voltageSum = calculateKVL(v1, v2);
        
        voltageSumDisplay.textContent = voltageSum.toFixed(2) + ' V';
        
        if (isKVLBalanced(sourceVoltage, voltageSum)) {
            validationDisplay.textContent = '✓ معادله متعادل است';
            validationDisplay.style.color = '#4ade80';
        } else {
            const difference = Math.abs(sourceVoltage - voltageSum);
            validationDisplay.textContent = `⚠ تفاوت: ${difference.toFixed(2)} V`;
            validationDisplay.style.color = '#fbbf24';
        }
    }

    sourceVoltageSlider.addEventListener('input', updateSourceVoltage);
    v1Slider.addEventListener('input', updateV1);
    v2Slider.addEventListener('input', updateV2);

    updateSourceVoltage();
    updateV1();
    updateV2();
    validateKVL();
}

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================

function initApp() {
    // Initialize navigation systems
    initMainNavigation();
    initDataNavigation();
    initElementTabs();
    
    // Initialize calculators
    initOhmsLaw();
    initKCL();
    initKVL();
    
    console.log('Electrical Circuits platform initialized successfully!');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
