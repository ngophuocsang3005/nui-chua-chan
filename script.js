document.addEventListener('DOMContentLoaded', function() {
    // Tìm nút Bắt đầu khám phá
    const btn = document.querySelector('a[href="#stations"]');
    
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Chặn hành vi nhảy trang mặc định
            
            const targetSection = document.getElementById('stations');
            if (targetSection) {
                // Cuộn mượt xuống vị trí 5 trạm
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});