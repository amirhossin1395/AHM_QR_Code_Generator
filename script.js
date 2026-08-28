// ============================================================
// 🌟 کیو آر کد ساز AHM - اسکریپت کامل
// ============================================================

let currentQRCode = null;
let currentIcon = null;

// ============================================================
// 🖼️ مدیریت آیکون
// ============================================================

document.getElementById('iconInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            currentIcon = event.target.result;
            document.getElementById('iconPreviewImg').src = currentIcon;
            document.getElementById('iconPreview').style.display = 'flex';
            document.getElementById('iconLabel').textContent = '✅ ' + file.name;
        };
        reader.readAsDataURL(file);
    }
});

function removeIcon() {
    currentIcon = null;
    document.getElementById('iconInput').value = '';
    document.getElementById('iconPreview').style.display = 'none';
    document.getElementById('iconLabel').textContent = '📂 انتخاب تصویر (PNG با پس‌زمینه شفاف)';
}

// ============================================================
// 🚀 ساخت QR
// ============================================================

function generateQR() {
    const link = document.getElementById('linkInput').value.trim();
    if (!link) {
        alert('❌ لطفاً لینک مقصد را وارد کنید!');
        return;
    }

    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';

    if (currentQRCode) {
        currentQRCode.clear();
        currentQRCode = null;
    }

    currentQRCode = new QRCode(qrContainer, {
        text: link,
        width: 220,
        height: 220,
        colorDark: '#0a0a1a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    if (currentIcon) {
        setTimeout(() => {
            addIconToQR(currentIcon);
        }, 150);
    }

    document.getElementById('qrOutput').classList.add('active');
}

// ============================================================
// 🖼️ اضافه کردن آیکون وسط QR
// ============================================================

function addIconToQR(iconSrc) {
    const qrContainer = document.getElementById('qrcode');
    const canvas = qrContainer.querySelector('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const iconSize = size * 0.2;
    const x = (size - iconSize) / 2;
    const y = (size - iconSize) / 2;

    const img = new Image();
    img.onload = function() {
        ctx.clearRect(x, y, iconSize, iconSize);
        ctx.drawImage(img, x, y, iconSize, iconSize);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + iconSize / 2, y + iconSize / 2, iconSize / 2 + 1, 0, Math.PI * 2);
        ctx.stroke();
    };
    img.src = iconSrc;
}

// ============================================================
// 📥 دانلود QR
// ============================================================

function downloadQR(format) {
    const qrContainer = document.getElementById('qrcode');
    const canvas = qrContainer.querySelector('canvas');
    if (!canvas) {
        alert('❌ ابتدا یک کیو آر کد بسازید!');
        return;
    }

    if (currentIcon) {
        addIconToQR(currentIcon);
    }

    const link = document.createElement('a');
    link.download = `qrcode_ahm.${format === 'png' ? 'png' : 'jpg'}`;
    link.href = canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', 1.0);
    link.click();
}

// ============================================================
// 📋 کپی لینک
// ============================================================

function copyLink() {
    const link = document.getElementById('linkInput').value.trim();
    if (!link) return;

    navigator.clipboard.writeText(link).then(() => {
        alert('✅ لینک کپی شد!');
    }).catch(() => {
        alert('❌ کپی نشد. لطفاً دستی کپی کنید.');
    });
}

// ============================================================
// 🚀 اجرای اولیه
// ============================================================

window.onload = function() {
    setTimeout(() => {
        generateQR();
    }, 400);
};

console.log('🌟 کیو آر کد ساز AHM فعال شد!');
console.log('🚀 ساخته شده توسط امیرحسین حاجی مرادخانی');
console.log('📂 سورس کد: github.com/amirhossin1395/AHM_QR_Code_Generator');