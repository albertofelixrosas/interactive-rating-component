const formCard = document.getElementById('form-card');
const ratingState = document.getElementById('rating-state');
const values = document.querySelectorAll('.card__element--hover');
const submitButton = document.getElementById('submit-button');
const youSelectedSpan = document.getElementById('you-selected');
let selectedValue = 1;

const refreshSelectedValue = () => {
    youSelectedSpan.innerHTML = selectedValue;
};

refreshSelectedValue();

values.forEach((button) => {
    button.addEventListener('click', (e) => {
        selectedValue = parseInt(e.target.value.trim());
        values.forEach((value) => {
            value.classList.remove('card__element--checked');
        });
        values.item(selectedValue - 1).classList.add('card__element--checked');
    });
});

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    refreshSelectedValue();
    submitButton.disabled = true;
    formCard.classList.add('card--animate-hidden');
    const animationTime =
        getComputedStyle(formCard).getPropertyValue('animation-duration');
    const numberValueAndTimeUnit = getNumberValueAndTimeUnit(animationTime);
    const timeToWaiting = convertTimeByTimeUnit(
        numberValueAndTimeUnit.numberValue,
        numberValueAndTimeUnit.timeUnit
    );
    setInterval(() => {
        formCard.remove();
        ratingState.classList.add('card--animate-appear');
        ratingState.classList.remove('card--hidden');
    }, timeToWaiting);
});

// Utils

function getNumberValueAndTimeUnit(timeString = '') {
    const matchArrayResult = timeString.match(/m?s/);
    const unit = matchArrayResult.length ? matchArrayResult[0] : '';
    const num = parseFloat(timeString);
    return { numberValue: num, timeUnit: unit };
}

function convertTimeByTimeUnit(numberValue = 0, timeUnit = '') {
    switch (timeUnit) {
        case 's':
            return numberValue * 1000;
        case 'ms':
            return numberValue;
        default:
            return numberValue;
    }
}
