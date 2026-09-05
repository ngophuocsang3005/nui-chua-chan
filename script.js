document.addEventListener('DOMContentLoaded', function() {

    // 1. CUỘN MƯỢT NÚT KHÁM PHÁ
    const btn = document.querySelector('a[href="#stations"]');
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('stations');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2. THANH TIẾN TRÌNH ĐỌC (READING PROGRESS BAR)
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = progress + '%';
        }
    });

    // 3. NÚT BACK TO TOP
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('title', 'Cuộn lên đầu trang');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. HIỆU ỨNG TRỒI LÊN KHI CUỘN (SCROLL REVEAL)
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    const revealElements = document.querySelectorAll('.station, .section, .quiz, .stations-heading, .stat-card');
    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
    });

    // 5. HIỆU ỨNG NHẢY SỐ TỰ ĐỘNG (STATS COUNTER)
    let hasAnimatedStats = false;

    function animateStats() {
        if (hasAnimatedStats) return;
        hasAnimatedStats = true;

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-target') || 0;
            const suffix = num.getAttribute('data-suffix') || '';
            let count = 0;
            const step = Math.max(1, Math.ceil(target / 35));

            const timer = setInterval(() => {
                count += step;
                if (count >= target) {
                    num.innerText = target + suffix;
                    clearInterval(timer);
                } else {
                    num.innerText = count + suffix;
                }
            }, 30);
        });
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                animateStats();
            }
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    }

    // 6. PARALLAX EFFECT FOR HERO
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            let scrollPos = window.scrollY;
            hero.style.backgroundPositionY = (scrollPos * 0.35) + 'px';
        }
    });
});

/* =========================================
   BỔ SUNG: HIỆU ỨNG ĐẾM SỐ CHO BẢNG THỐNG KÊ
========================================= */
document.addEventListener("DOMContentLoaded", function () {
    const statNumbers = document.querySelectorAll(".stat-number");
    if (!statNumbers.length) return;

    const startCounter = (el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        if (isNaN(target)) return;
        
        const suffix = el.getAttribute("data-suffix") || "";
        let count = 0;
        const duration = 1500;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                el.innerText = target + suffix;
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(count) + suffix;
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll(".stat-number");
                numbers.forEach((num) => startCounter(num));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
// HỖ TRỢ BẤM LINK ẨN TRÊN CẢ ĐIỆN THOẠI VÀ MÁY TÍNH
document.addEventListener("DOMContentLoaded", function () {
    const creditBox = document.querySelector(".coder-credit");
    if (creditBox) {
        const goToSecretPage = function (e) {
            e.preventDefault();
            window.location.href = "bimat.html";
        };

        // Nhận cả lệnh click (PC) lẫn touch (Điện thoại)
        creditBox.addEventListener("click", goToSecretPage);
    }
});