let energy = 100;
let isTapping = false;
let tapInterval;
let restoreInterval;

function startTapping() {
    if (!isTapping) {
        isTapping = true;
        tapInterval = setInterval(updateBalance, 1000);  // Tapping every second
        restoreEnergy();  // Start restoring energy when not tapping
    }
}

function stopTapping() {
    isTapping = false;
    clearInterval(tapInterval);
}

function updateBalance() {
    if (energy > 0) {
        const btcAmountElement = document.querySelector('.btc-amount');
        let currentBalance = parseFloat(btcAmountElement.textContent);
        currentBalance += 0.00004478 / 25 / 60;  // Increment balance
        btcAmountElement.textContent = currentBalance.toFixed(8);

        energy -= 4;  // Reduce energy (e.g., 4% per second)
        updateEnergyBar();
    } else {
        stopTapping();
    }
}

function updateEnergyBar() {
    const energyElement = document.querySelector('.energy');
    const progressElement = document.querySelector('.progress');
    energyElement.textContent = `Energy: ${energy}%`;
    progressElement.style.width = `${energy}%`;

    if (energy <= 0) {
        stopTapping();
    }
}

function restoreEnergy() {
    clearInterval(restoreInterval);
    restoreInterval = setInterval(() => {
        if (!isTapping && energy < 100) {
            energy += 1;  // Restore 1% energy per second
            updateEnergyBar();
        } else if (energy >= 100) {
            clearInterval(restoreInterval);
        }
    }, 1000);
}

function inviteFriends() {
    alert('Invitation link generated!');
}

function addReferral(name, amount) {
    const referrals = document.getElementById('referrals');
    const referral = document.createElement('div');
    referral.className = 'referral';
    referral.innerHTML = `<span>${name}</span><span>${amount} BTC</span>`;
    referrals.appendChild(referral);
    referrals.classList.remove('hidden');
}

addReferral('User123', '0.00000896');

// Event listener to stop tapping when mouse button is released
document.querySelector('.btc-logo').addEventListener('mousedown', startTapping);
document.querySelector('.btc-logo').addEventListener('mouseup', stopTapping);
document.querySelector('.btc-logo').addEventListener('mouseleave', stopTapping);
