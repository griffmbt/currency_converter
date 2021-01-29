async function getExchangeStart() {
    try {
        let response = await fetch('https://api.ratesapi.io/api/latest?base=RUB&symbols=USD');
        let data = await response.json();
        return data;
    } catch (err) {
        console.log(err.massage);
    }
}
getExchangeStart()
    .then((data) => {
        let num1 = 1;
        let num2 = data.rates.USD;
        let result = num1 + ' RUB = ' + num2.toFixed(4) + ' USD';
        startNumbetExchange.textContent = result;
        endNumbetInput.value = startNumbetInput.value * num2.toFixed(4);
    })
    .catch((err) => {
        console.log(err.massage);
    })

async function getExchangeEnd() {
    try {
        let response = await fetch('https://api.ratesapi.io/api/latest?base=USD&symbols=RUB');
        let data = await response.json();
        return data;
    } catch (err) {
        console.log(err.massage);
    }
}
getExchangeEnd()
    .then((data) => {
        let num1 = 1;
        let num2 = data.rates.RUB;
        let result = num1 + ' USD = ' + num2.toFixed(4) + ' RUB';
        endNumbetExchange.textContent = result;
    })
    .catch((err) => {
        console.log(err.massage);
    })

async function getExchangeCurrency() {
    if (currency1Result === currency2Result) {
        return 'чтобы все работало, выберите разную валюту)';
    }

    try {
        let response = await fetch('https://api.ratesapi.io/api/latest?base=' + currency1Result + '&symbols=' + currency2Result);
        let data = await response.json();
        return data;
    } catch (err) {
        alert('что-то пошло не так...');
    }
}

async function getExchangeCurrencyForEnd() {
    if (currency1Result === currency2Result) {
        return 'чтобы все работало, выберите разную валюту)';
    }

    try {
        let response = await fetch('https://api.ratesapi.io/api/latest?base=' + currency2Result + '&symbols=' + currency1Result);
        let data = await response.json();
        return data;
    } catch (err) {
        console.log(err.massage);
    }
}

const rubStart = document.querySelector('.converter__start__currency__RUB');
const usdStart = document.querySelector('.converter__end__currency__USA');
const currency1 = document.querySelectorAll('.currency1');
const currency2 = document.querySelectorAll('.currency2');

const currency1Start = document.querySelectorAll('.currency1Start');
const currency2End = document.querySelectorAll('.currency2End');

const startNumbetExchange = document.querySelector('.converter__start__input__p');
const endNumbetExchange = document.querySelector('.converter__end__input__p');
const startNumbetInput = document.querySelector('.start__input');
const endNumbetInput = document.querySelector('.end__input');

const converterStartCurrency = document.querySelector('.converter__start__currency');
const converterEndCurrency = document.querySelector('.converter__end__currency');

const selectStart = document.querySelector('.converter__start__currency__select');
const selectEnd = document.querySelector('.converter__end__currency__select');

const toTradePlaces = document.querySelector('.converter__loading__img');

let currency1Result = 'RUB';
let currency2Result = 'USD';
let checkOfStartWindow = '';
let checkOfEndWindow = '';


currency1.forEach((item) => {
    item.addEventListener('click', (evt) => {
        currency1Result = evt.target.textContent;

        const converterStartCurrency = document.querySelector('.converter__start__currency');
        const withClass = converterStartCurrency.querySelector('.backgroundColorViolet')

        withClass.classList.remove('backgroundColorViolet');

        if (!item.classList.contains('backgroundColorViolet')) {
            checkOfStartWindow = evt.target;
            evt.target.classList.add('backgroundColorViolet');
        }

    })
})

currency1Start.forEach((item) => {
    item.addEventListener('click', () => {

        getExchangeCurrency()
            .then((data) => {
                startNumbetExchange.textContent = '1' + currency1Result + ' = ' + data.rates[currency2Result].toFixed(4) + ' ' + currency2Result;
                endNumbetInput.value = startNumbetInput.value * data.rates[currency2Result].toFixed(4);
            })
            .catch((err) => {
                console.log(err.massage);
            })

        getExchangeCurrencyForEnd()
            .then((data) => {
                endNumbetExchange.textContent = '1' + currency2Result + ' = ' + data.rates[currency1Result].toFixed(4) + ' ' + currency1Result;
            })
            .catch((err) => {
                console.log(err.massage);
            })
    })
})

currency2.forEach((item) => {
    item.addEventListener('click', (evt) => {
        currency2Result = evt.target.textContent;

        const converterEndCurrency = document.querySelector('.converter__end__currency');
        const withClass = converterEndCurrency.querySelector('.backgroundColorViolet')
        withClass.classList.remove('backgroundColorViolet');

        if (!item.classList.contains('backgroundColorViolet')) {
            checkOfEndWindow = evt.target;
            evt.target.classList.add('backgroundColorViolet');
        }
    })
})

currency2End.forEach((item) => {
    item.addEventListener('click', () => {

        getExchangeCurrency()
            .then((data) => {
                startNumbetExchange.textContent = '1' + currency1Result + ' = ' + data.rates[currency2Result].toFixed(4) + ' ' + currency2Result;
                endNumbetInput.value = startNumbetInput.value * data.rates[currency2Result].toFixed(4);
            })
            .catch((err) => {
                console.log(err.massage);
            })

        getExchangeCurrencyForEnd()
            .then((data) => {
                endNumbetExchange.textContent = '1' + currency2Result + ' = ' + data.rates[currency1Result].toFixed(4) + ' ' + currency1Result;
            })
            .catch((err) => {
                console.log(err.massage);
            })
    })
})

selectStart.addEventListener('change', () => {
    currency1Result = selectStart.value;
    getExchangeCurrency()
        .then((data) => {
            startNumbetExchange.textContent = '1' + currency1Result + ' = ' + data.rates[currency2Result].toFixed(4) + ' ' + currency2Result;
            endNumbetInput.value = startNumbetInput.value * data.rates[currency2Result].toFixed(4);
        })
        .catch((err) => {
            console.log(err.massage);
        })

    getExchangeCurrencyForEnd()
        .then((data) => {
            endNumbetExchange.textContent = '1' + currency2Result + ' = ' + data.rates[currency1Result].toFixed(4) + ' ' + currency1Result;
        })
        .catch((err) => {
            console.log(err.massage);
        })
})

selectEnd.addEventListener('change', () => {
    currency2Result = selectEnd.value;
    getExchangeCurrency()
        .then((data) => {
            startNumbetExchange.textContent = '1' + currency1Result + ' = ' + data.rates[currency2Result].toFixed(4) + ' ' + currency2Result;
            endNumbetInput.value = startNumbetInput.value * data.rates[currency2Result].toFixed(4);
        })
        .catch((err) => {
            console.log(err.massage);
        })

    getExchangeCurrencyForEnd()
        .then((data) => {
            endNumbetExchange.textContent = '1' + currency2Result + ' = ' + data.rates[currency1Result].toFixed(4) + ' ' + currency1Result;
        })
        .catch((err) => {
            console.log(err.massage);
        })
})

startNumbetInput.addEventListener('input', () => {
    getExchangeCurrency()
        .then((data) => {
            startNumbetExchange.textContent = '1' + currency1Result + ' = ' + data.rates[currency2Result].toFixed(4) + ' ' + currency2Result;
            endNumbetInput.value = startNumbetInput.value * data.rates[currency2Result].toFixed(4);
        })
        .catch((err) => {
            console.log(err.massage);
        })

    getExchangeCurrencyForEnd()
        .then((data) => {
            endNumbetExchange.textContent = '1' + currency2Result + ' = ' + data.rates[currency1Result].toFixed(4) + ' ' + currency1Result;
        })
        .catch((err) => {
            console.log(err.massage);
        })
})

toTradePlaces.addEventListener('click', (evt) => {
    let x = currency1Result;
    let y = currency2Result;
    currency1Result = y;
    currency2Result = x;

    const converterEndCurrency = document.querySelector('.converter__end__currency');
    const converterStartCurrency = document.querySelector('.converter__start__currency');

    const withClassEnd1 = converterEndCurrency.querySelector('.backgroundColorViolet');
    const withClassStart2 = converterStartCurrency.querySelector('.backgroundColorViolet');

    let withClassStart1;
    let withClassEnd2;

    let checkSelectValueStart = withClassStart2.value;

    if (!withClassEnd1.classList.contains('converter__end__currency__select')) {
        withClassStart1 = converterStartCurrency.querySelector(`.${withClassEnd1.textContent.toLowerCase()}`);
        withClassStart1.classList.add('backgroundColorViolet');
        withClassStart2.classList.remove('backgroundColorViolet');

    } else if (withClassEnd1.classList.contains('converter__end__currency__select')) {
        selectStart.value = withClassEnd1.value;

        if (!withClassStart2.classList.contains('converter__start__currency__select')) {
            withClassStart2.classList.remove('backgroundColorViolet');
            selectStart.classList.add('backgroundColorViolet');
            selectEnd.classList.remove('backgroundColorViolet');
        } 
    }

    if (!withClassStart2.classList.contains('converter__start__currency__select')) {
        withClassEnd2 = converterEndCurrency.querySelector(`.${withClassStart2.textContent.toLowerCase()}`);
        withClassEnd2.classList.add('backgroundColorViolet');
        withClassEnd1.classList.remove('backgroundColorViolet');

    } else if (withClassStart2.classList.contains('converter__start__currency__select')) {
        selectEnd.value = checkSelectValueStart;

        if (!withClassEnd1.classList.contains('converter__end__currency__select')) {
            withClassEnd1.classList.remove('backgroundColorViolet');
            selectEnd.classList.add('backgroundColorViolet');
            selectStart.classList.remove('backgroundColorViolet');
        } 
    }

    getExchangeCurrency()
        .then((data) => {
            startNumbetExchange.textContent = '1' + currency1Result + ' = ' + data.rates[currency2Result].toFixed(4) + ' ' + currency2Result;
            endNumbetInput.value = startNumbetInput.value * data.rates[currency2Result].toFixed(4);
        })
        .catch((err) => {
            console.log(err.massage)
        })

    getExchangeCurrencyForEnd()
        .then((data) => {
            endNumbetExchange.textContent = '1' + currency2Result + ' = ' + data.rates[currency1Result].toFixed(4) + ' ' + currency1Result;
        })
        .catch((err) => {
            console.log(err.massage);
        })
})