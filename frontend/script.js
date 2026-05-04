let selectedGateway = 'CM_ORANGE';
let timerInterval = null;
let timeLeft = 120;


// =========================
// DROPDOWN
// =========================
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display =
        dropdown.style.display === 'flex' ? 'none' : 'flex';
}

function selectOption(value) {
    selectedGateway = value;

    document.getElementById('selected').innerText =
        value === 'CM_ORANGE' ? 'Orange Money' : 'MTN Money';

    document.getElementById('dropdown').style.display = 'none';
}

window.onclick = function (event) {
    if (!event.target.closest('.select-container')) {
        document.getElementById('dropdown').style.display = 'none';
    }
};

function cancelPayment() {
    document.getElementById('phone').value = '';
}

// =========================
// TIMER
// =========================
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function startTimer() {
    stopTimer();
    timeLeft = 120;

    timerInterval = setInterval(() => {
        timeLeft--;

        document.getElementById('modal-timer').innerText =
            formatTime(timeLeft);

        if (timeLeft <= 0) {
            stopTimer();
            openModal("Temps expiré, veuillez réessayer", false);
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// =========================
// MODAL
// =========================
function openModal(message, loading = true) {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-text').innerText = message;

    document.getElementById('modal-loader').style.display =
        loading ? 'block' : 'none';

    document.getElementById('modal-close').style.display =
        loading ? 'none' : 'inline-block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    stopTimer();
}

// =========================
// VALIDATION GATEWAY
// =========================
function validateGateway() {
    const valid = ['CM_ORANGE', 'CM_MTNMOMO'];

    if (!valid.includes(selectedGateway)) {
        return false;
    }
    return true;
}

// =========================
// PAIEMENT
// =========================
async function pay() {
    const phone = document.getElementById('phone').value.replace(/\s/g, '');

    // ❌ validation téléphone
    if (!phone || phone.length < 9) {
        openModal("Numéro invalide", false);
        return;
    }

    // ❌ validation gateway
    if (!validateGateway()) {
        openModal("Mode de paiement invalide", false);
        return;
    }

    openModal("Initialisation paiement...", true);
    startTimer();

    try {
        const res = await fetch('http://localhost:5000/api/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone,
                gateway: selectedGateway
            })
        });

        const data = await res.json();

        console.log("BACKEND RESPONSE:", data);

        if (!res.ok) {
            throw new Error(data.message || "Erreur paiement");
        }

        // 🔥 succès propre
        stopTimer();

        openModal(
            "Paiement lancé. Validez sur votre téléphone",
            false
        );

    } catch (err) {
        console.error(err);

        stopTimer();

        openModal(
            "Paiement échoué, vérifiez votre numéro ou solde",
            false
        );
    }
}