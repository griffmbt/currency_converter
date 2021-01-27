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

const startNumbetExchange = document.querySelector('.converter__start__input__p');
const endNumbetExchange = document.querySelector('.converter__end__input__p');
const startNumbetInput = document.querySelector('.start__input');
const endNumbetInput = document.querySelector('.end__input');

let currency1Result;
let currency2Result;

currency1.forEach((item) => {
    item.addEventListener('click', (evt) => {
        currency1Result = evt.target.textContent;
        rubStart.classList.remove('backgroundColorViolet');
        if(!item.classList.contains('backgroundColorViolet')) {
            evt.target.classList.add('backgroundColorViolet');
        } else if(item.classList.contains('backgroundColorViolet')) {
            evt.target.classList.remove('backgroundColorViolet');
        }

    })
})
currency2.forEach((item) => {
    item.addEventListener('click', (evt) => {
        currency2Result = evt.target.textContent;
        usdStart.classList.remove('backgroundColorViolet');
        if(!item.classList.contains('backgroundColorViolet')) {
            evt.target.classList.add('backgroundColorViolet');
        } else if(item.classList.contains('backgroundColorViolet')) {
            evt.target.classList.remove('backgroundColorViolet');
        }

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

