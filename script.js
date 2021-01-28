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
    try {
        let response = await fetch('https://api.ratesapi.io/api/latest?base=' + currency1Result + '&symbols=' + currency2Result);
        let data = await response.json();
        return data;
    } catch (err) {
        console.log(err.massage);
    }
}

async function getExchangeCurrencyForEnd() {
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

let currency1Result = 'RUB';
let currency2Result = 'USD';

currency1.forEach((item) => {
    item.addEventListener('click', (evt) => {
        currency1Result = evt.target.textContent;

        const converterStartCurrency = document.querySelector('.converter__start__currency');
        const withClass = converterStartCurrency.querySelector('.backgroundColorViolet')
        withClass.classList.remove('backgroundColorViolet');

        if(!item.classList.contains('backgroundColorViolet')) {
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

        if(!item.classList.contains('backgroundColorViolet')) {
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




