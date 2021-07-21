/* Variables */

const billAmount = document.getElementById('bill-amount');
const cashAmount = document.getElementById("cash-amount");
const message = document.createElement('p');
message.className = 'hidden';


const twoThousandNotes = document.querySelector('.two-thousand');
const fiveHundredNotes = document.querySelector('.five-hundred');
const hundredNotes = document.querySelector('.hundred');
const twentyNotes = document.querySelector('.twenty');
const tenNotes = document.querySelector('.ten');
const fiveNotes = document.querySelector('.five');
const oneCoin = document.querySelector('.one');


const sectionBillAmount = document.querySelector('.bill-amount-input');
const sectionCashAmountInput = document.querySelector('.cash-amount-input');
const sectionCashReturnOutput = document.querySelector('.cash-return-output');

const btnSubmit = document.querySelector('.btn-submit');
const btnCashSubmit = document.querySelector('.btn-submit-cash')

const notes = [2000, 500, 100, 20, 10, 5, 1];

btnSubmit.addEventListener('click', handleBillAmountSubmit);
function handleBillAmountSubmit(e) {
    const billAmountValue = billAmount.value;

    if(billAmountValue === ""  || billAmountValue === null) {
        displayErrorMessage(true, 'Please enter a valid bill amount', sectionBillAmount);
    }
    else {
        displayErrorMessage(false, "", sectionBillAmount);
        
        changeDisplay(btnSubmit, false);
        changeDisplay(sectionCashAmountInput, true);
    }
}


btnCashSubmit.addEventListener('click', handleCashSubmit);

function handleCashSubmit(e) {
    const cashAmountInput = cashAmount.value;
    const billAmountValue = billAmount.value;

    if (cashAmountInput === "" || billAmountValue === ""  || cashAmountInput === null || billAmountValue === null) {
        displaySuccessMessage(false, "", sectionCashAmountInput);

        displayErrorMessage(true, "Please enter a valid bill and cash amount to continue", sectionCashAmountInput);

        changeDisplay(sectionCashReturnOutput, false);
    } 
    else {
        displayErrorMessage(false, "", sectionCashAmountInput);
        changeDisplay(sectionCashReturnOutput, false);

        const bill = parseInt(Math.round(billAmountValue, 0));
        const cash = parseInt(Math.round(cashAmountInput, 0));

        console.log(bill, cash);

        if(cash < bill) {
            displaySuccessMessage(false, "", sectionCashAmountInput);

            displayErrorMessage(true, "Cash paid is less than bill. Please enter the right amount", sectionCashAmountInput);

            
        }
        else if(cash === bill) {
            displaySuccessMessage(true, "No amount should be returned.", sectionCashAmountInput);
        }
        else {
            displaySuccessMessage(false, "", sectionCashAmountInput);

            changeDisplay(sectionCashAmountInput, true);

            changeDisplay(sectionCashReturnOutput, true);

            let change = cash - bill;
            let numNotes = [];
            if(change >= 2000) {
                numNotes[0] = parseInt(change/2000);
                change-=(2000*numNotes[0]);
            }

            if(change >= 500) {
                numNotes[1] = parseInt(change / 500);
                change -= (500 * numNotes[1]);
            }

            if(change >= 100) {
                numNotes[2] = parseInt(change / 100);
                change -= (100 * numNotes[2]);
            }

            if(change >= 20) {
                numNotes[3] = parseInt(change / 20);
                change -= (20 * numNotes[3]);
            }

            if(change >= 10) {
                numNotes[4] = parseInt(change / 10);
                change -= (10 * numNotes[4]);
            }

            if(change >= 5) {
                numNotes[5] = parseInt(change / 5);
                change -= (5 * numNotes[5]);
            }

            if(change >= 1) {
                numNotes[6] = parseInt(change / 1);
                change -= (1 * numNotes[6]);
            }

            console.log(numNotes);

            twoThousandNotes.textContent = numNotes[0];
            fiveHundredNotes.textContent = numNotes[1];
            hundredNotes.textContent = numNotes[2];
            twentyNotes.textContent = numNotes[3];
            tenNotes.textContent = numNotes[4];
            fiveNotes.textContent = numNotes[5];
            oneCoin.textContent = numNotes[6];
        }
    }
}


function displayErrorMessage(display, messageText, section) {
    if(display) {
        message.classList.add('visible');
        message.classList.add("error-message");
        message.classList.remove('hidden');
        message.textContent = messageText;
        section.appendChild(message);
    }
    else {
        message.classList.add("hidden");
        message.classList.remove("error-message");
        message.classList.remove("visible");
        message.textContent = "";
        if(section.contains(message)){
            section.removeChild(message);
        }    
    }
}

function changeDisplay(element, display) {
    console.log(element, display);
    if(display) {
        element.classList.add('visible');
        element.classList.remove('hidden');
    }
    else {
        element.classList.remove("visible");
        element.classList.add("hidden");
    }
}

function displaySuccessMessage(display, messageText, section) {
    if (display) {
        message.classList.add("visible");
        message.classList.add("success-message");
        message.classList.remove("hidden");
        message.textContent = messageText;
        section.appendChild(message);
    } 
    else {
        message.classList.add("hidden");
        message.classList.remove("success-message");
        message.classList.remove("visible");
        message.textContent = "";
        if (section.contains(message)) {
            section.removeChild(message);
        }
    }
}