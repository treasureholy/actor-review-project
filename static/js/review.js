$(document).ready(function () {
  show_order();
});

document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelector('.mybtn button')
    .addEventListener('click', function () {
      var movieSelect = document.querySelector('#movie-select');
      var commentInput = document.querySelector('#comment');
      var starSelect = document.querySelector('#movie_star');
      var movie = movieSelect.value;
      var imageUrl;
      if (movie == '타짜')
        imageUrl =
          '//i.namu.wiki/i/T9YYhccJVawLId6z0jnP7css3LamSpQEtbKYJbOYvU-rqJT6noS94_kzsyH_v1Srd7GNxyo7R6V8Pk0P2w1fMC3AAw3EvOMIMrXrCuriUfv_yIq8qaBd_rjjgsAQJFGD8UGQkrsKIrxAb5fbbszg_A.webp';
      else if (movie == '도둑들')
        imageUrl =
          '//i.namu.wiki/i/Zt0G-mLo90kWtvblK0O8VN0zxYAv_tS83TmBR6rb85IxrVD5-ryqhJ3koEUO6ZtJ5NuHNK8NBUDNaM_xc7GX8PI3qyZC9y1LYtcdWgG9u0ofdNWypCGYXlphmKJSE6cTB_Kz-yj6m7fslIgvJLyj6Q.webp';
      else if (movie == '관상')
        imageUrl =
          '//i.namu.wiki/i/39_E9xy6oOrblvQ0FZ5bt2QLzLoTMveT8gA8MnpEDo5zsBD_LvJUxajJwa3GcvPJA9U4pzGVHoEFupkLq7-RQ56PEegcrWfwTStx0DbQdAJFkLS8K8W5RFjz4azij1ZOHNzGxZfONSzSqw6rrxVbdQ.webp';
      else if (movie == '굿바이 싱글')
        imageUrl =
          '//i.namu.wiki/i/IuuJznznBCTEi2va71kGl9Y1SOJ93AUA9iyp1gMKOMFocziCbZy_UpMGsOlwyCsntmIYtTIlzpJUHZf_bBjEO4l-r4qRGFRyBlpWEzdySVeqIXE8vWh9wcn1p4ijGVqFO2esYU6qf-ajuIp5u0HWoQ.webp';
      else if (movie == '시그널')
        imageUrl =
          '//i.namu.wiki/i/wO9WB_700GP1RT47OACsKsJxOE269g-tXfLl6AvC5hCLvfd2rNhGKZVyuW_Tpbs6uf1ClrReqagpOm0W0N3ikPlGZI15MWOEPLWfqVN4tydy5CFSwtrll62Xyrv5MDXSXEq-4-HTI0b2FvanuPUJcg.webp';
      else if (movie == '직장의 신')
        imageUrl =
          '//i.namu.wiki/i/-ISs8MwLTrkmlI12Gj16Mu7d8IQFmRZGhtetSbWOnJIWcURwPnWXEvF1yDRGHpMHL3PkaFh_kEu0MEmqdtQymdNcFLJnf-3kEJ34wG1mwFprU3nS3Cd-UjBDR7bGLgXqXedKeFDlrbVWOERo4AcMsA.webp';
      var comment = commentInput.value;
      var star = starSelect.value;

      fetch('/save_review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie: movie,
          comment: comment,
          star: star,
          imageUrl: imageUrl,
        }),
      })
        .then(function (response) {
          if (response.ok) {
            location.reload(); // 데이터 저장 후 페이지 새로고침
          } else {
            throw new Error('데이터를 저장하는 도중 오류가 발생했습니다.');
          }
        })
        .catch(function (error) {
          alert(error.message);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // 리뷰 데이터 가져오기
  fetch('/get_reviews')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('데이터를 가져오는 도중 오류가 발생했습니다.');
      }
    })
    .then(function (data) {
      // 가져온 데이터를 기반으로 리뷰 카드 생성
      var cardsBox = document.querySelector('#cards-box');
      $('#cards-box').empty();
      data.forEach(function (review) {
        var card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
          <div class="card h-100">
            <img src="${review.imageUrl}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${review.movie}</h5>
              <p>${getStarIcons(review.star)}</p>
              <p class="mycomment">${review.comment}</p>
            </div>
          </div>
        `;
        cardsBox.appendChild(card);
      });
    })
    .catch(function (error) {
      alert(error.message);
    });
});

// 별점 아이콘 생성 함수
function getStarIcons(star) {
  var starIcons = '';
  for (var i = 0; i < star; i++) {
    starIcons += '⭐';
  }
  return starIcons;
}
