// THERE IS NO TASK TO SOLVE IN THIS FILE
// EBBEN A FÁJLBAN NINCS MEGOLDANDÓ FELADAT

const wrapperDiv = document.querySelector("#success")
const titleElement = document.querySelector("#success h2")
const fillElement  = document.querySelector("#progress-bar-fill")

let lastFrameTime = performance.now()
let lastCompleteTransaction = Number.MIN_SAFE_INTEGER
let progress = undefined
let currentSpeed = undefined

const currencies = { '$' : 1.00, '€' : 0.96, '£' : 0.82, '¥' : 136, 'HUF ' : 382 }
const metals = [
    { name: 'gold', unit: 'g', usd_per_unit: 57.68 },
    { name: 'silver', unit: 'kg', usd_per_unit: 749.24 },
    { name: 'platinum', unit: 'g', usd_per_unit: 32.72 },
    { name: 'palladium', unit: 'g', usd_per_unit: 55.49 },
]

function amountInRandomCurrency(usd){
    const keys = Object.keys(currencies)
    const currency = keys[Math.floor(Math.random() * keys.length)]
    const exchange_rate = currencies[currency]
    return { currency, amount: (usd * exchange_rate).toFixed(exchange_rate < 100 ? 2 : 0) }
}

function next(){
    const now = performance.now()
    const dt  = now - lastFrameTime
    lastFrameTime = now
    if (now - lastCompleteTransaction >= 1000){
        progress = progress < 100 ? progress + (Math.random() * dt * currentSpeed) : 0
        if (progress >= 100) {
            lastCompleteTransaction = now
            titleElement.style.color = 'green';
            fillElement.style.backgroundColor = 'green';
        }
        if (!progress) {
            currentSpeed = Math.random() * (0.07 - 0.02) + 0.02
            const messageType = Math.random() 
            if (messageType < 0.3){
                const { currency, amount } = amountInRandomCurrency(200 + Math.random() * 1800)
                let account = String.fromCharCode(Math.floor(Math.random() * 26) + 65) + String.fromCharCode(Math.floor(Math.random() * 26) + 65)
                for (let i = 0; i < 16; i++) account += Math.floor(Math.random() * 10)
                titleElement.innerText = `Transferring ${currency}${amount} to ${account}`
            } else if (messageType < 0.7) {
                const usd = Math.random() * 2000
                const btc = (usd / 16792.30).toFixed(8)
                const { currency, amount } = amountInRandomCurrency(usd)
                titleElement.innerText = `Purchasing ${btc} BTC for ${currency}${amount}`
            } else {
                const { name, unit, usd_per_unit } = metals[Math.floor(Math.random() * metals.length)]
                const quantity = Math.random() * 20 + 2
                const { currency, amount } = amountInRandomCurrency(quantity * usd_per_unit)
                titleElement.innerText = `Buying ${quantity.toFixed(2)} ${unit} of ${name} for ${currency}${amount}`
            }
            titleElement.style.color = ''
            fillElement.style.backgroundColor = '';
        }
        fillElement.style.width = `${progress}%`
    }
    requestAnimationFrame(next)
}

if (wrapperDiv && titleElement && fillElement) requestAnimationFrame(next)