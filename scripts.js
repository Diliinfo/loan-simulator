document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const current = JSON.parse(localStorage.getItem("loanApp") || '{}');
      Object.assign(current, data);
      localStorage.setItem("loanApp", JSON.stringify(current));

      // 页面跳转
      if (form.id === "registerForm") location.href = "step1.html";
      if (form.id === "step1Form") location.href = "step2.html";
      if (form.id === "step2Form") location.href = "review.html";
    });
  });

  // 显示预览
  if (document.getElementById("preview")) {
    const inputs = document.querySelectorAll('input[type="file"]');
    inputs.forEach(input => {
      input.addEventListener("change", e => {
        const file = e.target.files[0];
        if (file) {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(file);
          img.style.maxWidth = "100%";
          img.style.marginBottom = "10px";
          document.getElementById("preview").appendChild(img);
        }
      });
    });
  }

  // 显示总结
  if (document.getElementById("summary")) {
    const data = JSON.parse(localStorage.getItem("loanApp") || "{}");
    document.getElementById("summary").innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
    document.getElementById("submitFinal").addEventListener("click", () => {
      alert("Solicitud enviada correctamente.");
      location.href = "success.html";
    });
  }
});
