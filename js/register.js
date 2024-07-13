const form = document.querySelector(".form");
const usurname = document.querySelector("#usurname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

function validate() {
  if (usurname.value < 3) {
    alert("Usurname eng kamida 3 ta belgidan iborat bo'lishi kerak");
    usurname.style.outlineColor = "red";
    usurname.focus();
    return false;
  }

  if (email.value < 13) {
    alert("Email eng kamida 13 ta belgidan iborat bo'lishi kerak");
    email.style.outlineColor = "red";
    email.focus();
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
      email: email.value,
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
        if (data.message == "Failed! Username is already in use!") {
          alert("Bunday username mavjud");
        }

        if (data.message == "Failed! email is already in use!") {
          alert("Bunday email mavjud");
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
