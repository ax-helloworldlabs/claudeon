// AX 레시피 교육 안내 — 스크립트가 없어도 페이지는 모두 읽을 수 있습니다.
(function () {
  var address = '경기도 수원시 권선구 서부로 1433-28 2층 대회의실';

  // 주소 복사
  var copyBtn = document.getElementById('copy-address');
  var status = document.getElementById('copy-status');
  if (copyBtn && status) {
    copyBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(function () {
          status.textContent = '교육장 주소를 복사했습니다.';
        }, function () {
          status.textContent = address;
        });
      } else {
        status.textContent = address;
      }
    });
  }

  // 커리큘럼: 같은 날짜 안에서 하나를 열면 나머지는 닫힘
  document.querySelectorAll('.modules').forEach(function (group) {
    var items = group.querySelectorAll('details.module');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open || document.body.classList.contains('printing')) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  });

  // 인쇄 시 모든 커리큘럼 펼치기
  var closedForPrint = [];
  window.addEventListener('beforeprint', function () {
    document.body.classList.add('printing');
    closedForPrint = Array.prototype.slice.call(document.querySelectorAll('details:not([open])'));
    closedForPrint.forEach(function (d) { d.open = true; });
  });
  window.addEventListener('afterprint', function () {
    closedForPrint.forEach(function (d) { d.open = false; });
    closedForPrint = [];
    setTimeout(function () { document.body.classList.remove('printing'); }, 0);
  });
  var printBtn = document.getElementById('print-page');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
})();
