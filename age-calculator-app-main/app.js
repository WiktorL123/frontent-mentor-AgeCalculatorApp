/*
* TODO:
*  1. Finish the displayError function.
*  2. Change the result display to only update the span showing days, not all spans.
* */

let stateOfValidation = {
    isValidDay: false,
    isValidMonth: false,
    isValidYear: false
};

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const validateYear = (year) => {
    return year > 0;
};

const validateMonth = (month) => {
    return month >= 1 && month <= 12;
};

const validateDay = (day, month, year) => {
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day > 0 && day <= daysInMonth[month - 1];
};

function validateInputs(year, month, day) {
    stateOfValidation.isValidDay = validateDay(day, month, year);
    stateOfValidation.isValidMonth = validateMonth(month);
    stateOfValidation.isValidYear = validateYear(year);
    return stateOfValidation;
}

function fetchInputValues() {
    return {
        year: parseInt(document.getElementById('year').value),
        month: parseInt(document.getElementById('month').value),
        day: parseInt(document.getElementById('day').value)
    };
}

function calculateDifference(dateFromInputs, currentDate) {

    let yearsDifference = currentDate.getFullYear() - dateFromInputs.getFullYear();


    let monthDifference = currentDate.getMonth() - dateFromInputs.getMonth();


    if (monthDifference < 0) {
        yearsDifference--;
        monthDifference += 12;
    }

    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    let daysDifference = currentDate.getDate() - dateFromInputs.getDate();


    if (daysDifference < 0) {
        monthDifference--;
        if (monthDifference < 0) {
            yearsDifference--;
            monthDifference += 12;
        }
        daysDifference += daysInMonth;
    }


    return { yearsDiff: yearsDifference, monthDiff: monthDifference, dayDiff: daysDifference };
}


const showFragmentOfDate = (element, value) => {
    element.textContent = `${value}`;
};

function displayValidResult(diff) {
    const daysSpan = document.querySelector('#answer-days');
    const monthsSpan = document.querySelector('#answer-months');
    const yearsSpan = document.querySelector('#answer-years');
    showFragmentOfDate(daysSpan, diff.dayDiff);
    showFragmentOfDate(monthsSpan, diff.monthDiff);
    showFragmentOfDate(yearsSpan, diff.yearsDiff);
}

function displayError() {

}

function checkResult(state, difference) {
    if (state.isValidDay && state.isValidMonth && state.isValidYear) {
        displayValidResult(difference);
    } else {
        displayError();
    }
}

function handleDateSubmission(e) {
    e.preventDefault();
    const { year, month, day } = fetchInputValues();
    let state = validateInputs(year, month, day);
    const dateFromInputs = new Date(year, month - 1, day);
    const currentDate = new Date();
    let difference = calculateDifference(dateFromInputs, currentDate);
    console.log(difference);
    checkResult(state, difference);
}

function main() {
    const button = document.querySelector('.form-button');
    button.addEventListener('click', handleDateSubmission);
}

main();
