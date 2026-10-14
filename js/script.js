document.addEventListener("DOMContentLoaded", () => {
    const fadeElems = document.querySelectorAll('.fade-in, .fade-in-bounce');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // ticket-circle は順番に遅延する
                if (
                    entry.target.classList.contains('fade-in-bounce') &&
                    entry.target.parentNode.classList.contains('ticket-info-wrapper')
                ) {
                    const circles = entry.target.parentNode.querySelectorAll('.fade-in-bounce');
                    circles.forEach((circle, index) => {
                        setTimeout(() => {
                            circle.classList.add('show');
                        }, index * 200);
                    });

                } else {
                    entry.target.classList.add('show');
                }
            }
        });
    }, { threshold: 0.2 });

    fadeElems.forEach(elem => observer.observe(elem));
});

let percent = 0;
const percentText = document.getElementById("loading-percent");
const curtain = document.querySelector("#loading-curtain img");
const loadingScreen = document.getElementById("loading-screen");

let fakeLoading = setInterval(() => {
    percent += Math.floor(Math.random() * 5) + 2; // 進み方にランダム感を出す
    if (percent > 100) percent = 100;

    percentText.textContent = percent + "%";

    if (percent === 100) {
        clearInterval(fakeLoading);

        // ローディングをフェードアウト
        loadingScreen.style.transition = "opacity 0.6s";
        loadingScreen.style.opacity = 0;

        setTimeout(() => {
            loadingScreen.style.display = "none";

            // 幕を上げるアニメーション開始
            curtain.style.animation = "curtainUp 1.8s ease forwards";
        }, 600);
    }
}, 70);

const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  // スムーズスクロール
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
// ヘッダーのスクロール時少し透明化
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
// カルーセルの番号表示を更新する関数
function setupCarouselIndicator(carouselId) {
    const carouselEl = document.getElementById(carouselId);
    if (!carouselEl) return;

    const indicator = carouselEl.querySelector('.num-indicator');
    const items = carouselEl.querySelectorAll('.carousel-item');
    const total = items.length;

    
    indicator.textContent = `1 / ${total}`;

    
    carouselEl.addEventListener('slide.bs.carousel', function (event) {
        
        const nextIndex = event.to + 1;
        indicator.textContent = `${nextIndex} / ${total}`;
    });
}


document.addEventListener('DOMContentLoaded', function () {
    setupCarouselIndicator('carousel2025');
    setupCarouselIndicator('carouselPast');
});