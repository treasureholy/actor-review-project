const menuReview = () => {
  const wrapperLeft = document.querySelector('.wrapper__left');
  const wrapperRight = document.querySelector('.wrapper__right');

  wrapperLeft.style.display = 'none';
  wrapperRight.style.width = '100%';

  var reviewSrc = '/iframe/review';

  const contentFrame = document.getElementById('contentFrame');
  contentFrame.setAttribute('src', reviewSrc);
  document.getElementById('menuReview').style.color = 'black';
  document.getElementById('menuReview').style.backgroundColor = 'white';
  document.getElementById('menuHome').style.color = 'white';
  document.getElementById('menuHome').style.backgroundColor = '#298eb5';
};

const menuHome = () => {
  const wrapperLeft = document.querySelector('.wrapper__left');
  const wrapperRight = document.querySelector('.wrapper__right');

  wrapperLeft.style.display = 'flex';
  wrapperRight.style.width = '1000px';

  var homeSrc = '/iframe/home';

  const contentFrame = document.getElementById('contentFrame');
  contentFrame.setAttribute('src', homeSrc);
  document.getElementById('menuHome').style.color = 'black';
  document.getElementById('menuHome').style.backgroundColor = 'white';
  document.getElementById('menuReview').style.color = 'white';
  document.getElementById('menuReview').style.backgroundColor = '#298eb5';
};

// 초기값 설정
var todayCount = 0;
var totalCount = 0;

// 카운트 업데이트 함수
function updateCounters() {
  // 오늘 날짜 구하기
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + mm + dd;

  // localStorage에서 카운트 가져오기
  if (localStorage.getItem(today + '_count') !== null) {
    todayCount = parseInt(localStorage.getItem(today + '_count'));
  }
  if (localStorage.getItem('total_count') !== null) {
    totalCount = parseInt(localStorage.getItem('total_count'));
  }

  // 카운트 업데이트
  todayCount++;
  totalCount++;

  // localStorage에 카운트 저장
  localStorage.setItem(today + '_count', todayCount);
  localStorage.setItem('total_count', totalCount);

  // 카운트 표시
  document.getElementById('today_count').innerHTML = todayCount;
  document.getElementById('total_count').innerHTML = totalCount;
}

// 페이지 로딩시 실행
updateCounters();