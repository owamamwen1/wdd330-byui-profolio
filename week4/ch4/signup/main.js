let form = document.querySelector("form");
let userName = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let conPassword = document.querySelector("#confirmpassword");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  elementInput();
  if(userName.value != ""){
    display();
  }
});

function elementInput() {
  let userNameValue = userName.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();
  let conPasswordValue = conPassword.value.trim();

  if (userNameValue === "") {
    setError(userName, "Username empty");
  } else {
    setSuccess(userName);
  }

  if (emailValue === "") {
    setError(email, "Email empty");
  } else if (!isEmail(emailValue)) {
    setError(email, "Email is not valid");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password empty");
  } else if (passwordValue.length < 7 || passwordValue.length > 28) {
    setError(password, "Password length should be between 7 and 28");
  } else {
    setSuccess(password);
  }

  if (conPasswordValue === "") {
    setError(conPassword, "Confirm password empty");
  } else if (conPasswordValue !== passwordValue) {
    setError(conPassword, "Confirm password not matched with password");
  } else {
    setSuccess(conPassword);
  }
}

function display(){
  alert(`\n ___________________ \n INFORMATION \n ___________________ \n UserName: ${userName.value} \n Email: ${email.value} \n Password: ${password.value} \n Confirm Password: ${conPassword.value}`);
}

function setError(input, mg) {
  let formControl = input.parentElement;
  formControl.className = "form-control error";
  let elementSmall = formControl.querySelector("small");
  elementSmall.innerText = mg;
}

function setSuccess(input) {
  let formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(mail) {
  const regu = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regu.test(String(mail).toLowerCase());
}
