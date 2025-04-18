document.getElementById("btn").addEventListener("click", () => {
  fetch("http://localhost:4000/data")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("result").innerText = data;
    })
    .catch((err) => {
      document.getElementById("result").innerText = "에러 발생: " + err;
    });
});
