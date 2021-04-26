/** slider function for years of mortgage */
const rangeslider1 = document.getElementById('myRangeYears');
let output1 = document.getElementById('myYearsNumber');
output1.innerHTML = rangeslider1.value;

rangeslider1.oninput = function() {
    let value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background =
        'linear-gradient(to right, #2b2b2b 0%, #2b2b2b ' +
        value +
        '%, #bbbcbc ' +
        value +
        '%, #bbbcbc 100%)';
    output1.innerHTML = this.value;
};

/** slider function for rate of interest */
let rangeslider2 = document.getElementById('myRangeRate');
let output2 = document.getElementById('myRateNumber');
output2.innerHTML = rangeslider2.value;

rangeslider2.oninput = function() {
    let value = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.background = `linear-gradient(to right, #2b2b2b 0%, #2b2b2b ${value}%, #bbbcbc ${value}%, #bbbcbc 100%)`;
    output2.innerHTML = this.value;
};

function validateRequiredFields() {
    let passed = true;
    document.getElementById('requiredLoan').style.display = 'none';
    document.getElementById('requiredTax').style.display = 'none';
    document.getElementById('requiredIns').style.display = 'none';
    document
        .getElementById('requiredLoanBorder')
        .classList.remove('required-border');
    document
        .getElementById('requiredTaxBorder')
        .classList.remove('required-border');
    document
        .getElementById('requiredInsBorder')
        .classList.remove('required-border');

    /** loan input required notification */
    if (document.getElementById('myLoanNumber').value === '') {
        document
            .getElementById('requiredLoanBorder')
            .classList.add('required-border');
        document.getElementById('requiredLoan').style.display = 'block';
        passed = false;
    }

    /** tax input required notification */
    if (document.getElementById('myTaxNumber').value === '') {
        document
            .getElementById('requiredTaxBorder')
            .classList.add('required-border');
        document.getElementById('requiredTax').style.display = 'block';
        passed = false;
    }

    /** ins input required notification */
    if (document.getElementById('myInsuranceNumber').value === '') {
        document
            .getElementById('requiredInsBorder')
            .classList.add('required-border');
        document.getElementById('requiredIns').style.display = 'block';
        passed = false;
    }
    return passed;
}

/** calculating monthly mortgage payments */
function calculatePayment() {
    let validationPassed = true;
    validationPassed = validateRequiredFields();
    /** loan amt in years */
    if (validationPassed) {
        let myLoanNumber = parseFloat(
            document.getElementById('myLoanNumber').value
        );

        /** years of mortgage */
        let myRangeYears = parseFloat(
            document.getElementById('myRangeYears').value
        );

        /** interest rate */
        let myRangeRate = parseFloat(document.getElementById('myRangeRate').value);

        /** annual tax */
        let myTaxNumber = parseFloat(document.getElementById('myTaxNumber').value);

        /** annual insurance */
        let myInsuranceNumber = parseFloat(
            document.getElementById('myInsuranceNumber').value
        );

        /** mortgage years in months */
        let lengthOfLoan = 12 * myRangeYears;

        /** percentage rate */
        let percentageRate = myRangeRate / 1200;

        /** principle and interest for one month */
        let PIPayment =
            (myLoanNumber * percentageRate) /
            (1 - Math.pow(1 + percentageRate, lengthOfLoan * -1));

        /** annual tax for one month */
        let taxResult = myTaxNumber / 12;

        /** annual insurance for one month */
        let insResult = myInsuranceNumber / 12;

        /** total monthly payment */
        let TotalMonthlyPayment = PIPayment + taxResult + insResult;

        /** push p & i data to results down to cent */
        document.getElementById('myPIresult').value = PIPayment.toFixed(2);

        /** push tax data to results down to cent */
        document.getElementById('myTaxResult').value = taxResult.toFixed(2);

        /** push insurance data to results down to cent */
        document.getElementById('myInsResult').value = insResult.toFixed(2);

        /** push total monthly payment data to results */
        document.getElementById('myTMPResult').value = TotalMonthlyPayment.toFixed(
            2
        );

        /** show / hide calc and recalc btn */
        document.getElementById('calc-btn').style.display = 'none';
        document.getElementById('recalc-btn').style.display = 'block';
    }
}