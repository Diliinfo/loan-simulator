document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const progress = JSON.parse(localStorage.getItem('loanApp') || '{}');
      Object.assign(progress, data);
      localStorage.setItem('loanApp', JSON.stringify(progress));
      // 跳转逻辑
      if (form.id === 'registerForm') location.href = 'step1.html';
      if (form.id === 'step1Form') location.href = 'step2.html';
      if (form.id === 'step2Form') location.href = 'review.html';
    });
  });

  if (document.getElementById('summary')) {
    const data = JSON.parse(localStorage.getItem('loanApp') || '{}');
    document.getElementById('summary').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    document.getElementById('submitFinal').addEventListener('click', () => {
      alert('模拟提交成功！');
      location.href = 'success.html';
    });
  }
});
