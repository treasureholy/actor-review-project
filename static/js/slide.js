var slides = document.querySelector('.slides'),
  slide = document.querySelectorAll('.slides li'),
  currentIdx = 0,
  slideCount = slide.length,
  prevBtn = document.querySelector('.prev'),
  slideWidth = 104.7,
  slideMargin = 10,
  nextBtn = document.querySelector('.next');

slides.style.width = (slideWidth + slideMargin) * slideCount + 'px';

function moveSlide(num) {
  slides.style.left = -num * 114.7 + 'px';
  currentIdx = num;
}

function enlargeButton(button) {
  button.style.transform = 'scale(1.2)';
  button.style.color = '#fff';
}

function resetButton(button) {
  button.style.transform = 'scale(1)';
  button.style.color = '#ccc';
}

nextBtn.addEventListener('mouseover', function () {
  enlargeButton(nextBtn);
});

nextBtn.addEventListener('mouseout', function () {
  resetButton(nextBtn);
});

prevBtn.addEventListener('mouseover', function () {
  enlargeButton(prevBtn);
});

prevBtn.addEventListener('mouseout', function () {
  resetButton(prevBtn);
});

nextBtn.addEventListener('click', function () {
  if (currentIdx < slideCount - 4) {
    moveSlide(currentIdx + 1);
  } else {
    moveSlide(0);
  }
});

prevBtn.addEventListener('click', function () {
  if (currentIdx > 0) {
    moveSlide(currentIdx - 1);
  } else {
    moveSlide(slideCount - 4);
  }
});

var slideWrapper = document.querySelector('.slide_wrapper');
var slideImages = document.querySelectorAll('.slides img');
var controls = document.querySelector('.controls');
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');

slideWrapper.addEventListener('mouseover', function (event) {
  var target = event.target;
  if (
    target.tagName === 'IMG' ||
    target.closest('.slides img') ||
    target.closest('.controls')
  ) {
    if (!target.closest('.controls')) {
      target.style.transform = 'scale(1.1)';
    }
    controls.style.pointerEvents = 'none';
    prevBtn.style.pointerEvents = 'auto';
    nextBtn.style.pointerEvents = 'auto';
  }
});

slideWrapper.addEventListener('mouseout', function (event) {
  var target = event.target;
  if (
    target.tagName === 'IMG' ||
    target.closest('.slides img') ||
    target.closest('.controls')
  ) {
    if (!target.closest('.controls')) {
      target.style.transform = 'scale(1)';
    }
    controls.style.pointerEvents = 'auto';
    prevBtn.style.pointerEvents = 'none';
    nextBtn.style.pointerEvents = 'none';
  }
});

slideImages.forEach(function (image) {
  image.addEventListener('click', function () {
    var caption = image.getAttribute('data-caption');
    createModal(caption);
  });
});

function createModal(caption) {
  var modal = document.createElement('div');
  modal.classList.add('modal');

  var modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.textContent = caption;

  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  modal.addEventListener('click', function () {
    modal.remove();
  });
}

