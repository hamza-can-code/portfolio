//scripts.js
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const container = document.querySelector('.carousel-track-container');

let currentIndex = 0;
let startX = 0;
let isDragging = false;

// Position slides
slides.forEach((slide, idx) => {
  slide.style.left = `${idx * 100}%`;
});
function moveToSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Button clicks
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(currentIndex);
});
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
});

// Touch/swipe support
container.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});
container.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;
  // you could add track.style.transform = `translateX(${deltaX}px)` for drag effect
});
container.addEventListener('touchend', e => {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if (diff > 50) {
    // swipe right → prev
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(currentIndex);
  } else if (diff < -50) {
    // swipe left → next
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  }
  isDragging = false;
});

window.addEventListener('resize', () => moveToSlide(currentIndex));
