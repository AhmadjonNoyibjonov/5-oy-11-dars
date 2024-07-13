const form = document.querySelector(".form");
const usurname = document.querySelector("#usurname");
const password = document.querySelector("#password");

function validate() {
  if (usurname.value < 3) {
    alert("Usurname eng kamida 3 ta belgidan iborat bo'lishi kerak");
    usurname.style.outlineColor = "red";
    usurname.focus();
    return false;
  }

  if (password.value < 8) {
    alert("Password eng kamida 8 ta belgidan iborat bo'lishi kerak");
    password.style.outlineColor = "red";
    password.focus();
    return false;
  }

  return true;
}

form &&
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const isValide = validate();
    if (!isValide) {
      return;
    }

    const user = {
      usurname: usurname.value,
      password: password.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
          window.location.assign("http://127.0.0.1:5500/index.html");
        }

        if (data.message == "User Not found.") {
          alert(data.message);
          usurname.focus();
          usurname.style.outlineColor = "red";
        }
        if (data.message == "Invalid Password!") {
          alert(data.message);
          password.focus();
          password.style.outlineColor = "red";
        }

        if (data.message == "User registered successfully!") {
          window.location.assign("http://127.0.0.1:5500/pages/login.html");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        form.reset();
      });
  });
