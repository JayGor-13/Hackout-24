function validate() {
    var first_name = document.signup_form.first_name.value;
    var last_name = document.signup_form.last_name.value;
    var address = document.signup_form.address.value;
    var email = document.signup_form.email.value;
    var number = document.signup_form.number.value;
    var output = true;
  
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  
    // Removing previous changes
    var warn_texts = document.getElementsByClassName("warning");
    // Checking for empty fields
    for (var text of warn_texts) {
      text.innerText = "";
    }
  
    var fields = document.getElementsByTagName("input");
    for (var field of fields) {
      field.style.outlineColor = "rgb(212, 213, 217)";
    }
  
    if (first_name == null || first_name == "") {
      document.getElementById("first_name_warn").innerText =
        "First Name can't be empty!";
      document.getElementById("first_name").style.outlineColor = "red";
      output = false;
    }
    if (last_name == null || last_name == "") {
      document.getElementById("last_name_warn").innerText =
        "Last Name can't be empty!";
      document.getElementById("last_name").style.outlineColor = "red";
      output = false;
    }
    if (address == null || address == "") {
      document.getElementById("address_warn").innerText =
        "Address can't be empty!";
      document.getElementById("address").style.outlineColor = "red";
      output = false;
    }
    if (email == null || email == "") {
      document.getElementById("email_warn").innerText =
        "E-Mail ID can't be empty!";
      document.getElementById("email").style.outlineColor = "red";
      output = false;
    } else if (!email.match(emailRegex)) {
      document.getElementById("email_warn").innerText = "Invalid E-Mail ID";
      document.getElementById("email").style.outlineColor = "red";
      output = false;
    }
    if (number == null || number == "") {
      document.getElementById("number_warn").innerText =
        "Mobile Number can't be empty!";
      document.getElementById("number").style.outlineColor = "red";
      output = false;
    } else if (isNaN(number) || Math.ceil(Math.log10(number + 1)) != 11) {
      document.getElementById("number_warn").innerText =
        "Number must be 10 digits long!";
      document.getElementById("number").style.outlineColor = "red";
      output = false;
    }
  
    return output;
  }
  
  function login_validate() {
    var username = document.login_form.username.value;
    var password = document.login_form.password.value;
    console.log(password);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var output = true;
  
    // Removing previous changes
    var warn_texts = document.getElementsByClassName("warning");
    // Checking for empty fields
    for (var text of warn_texts) {
      text.innerText = "";
      text.style.display = "none";
    }
    var fields = document.getElementsByTagName("input");
    for (var field of fields) {
      field.style.outlineColor = "rgb(212, 213, 217)";
    }
  
    if (username == null || username == "") {
      document.getElementById("username_warn").style.display = "inline-block";
      document.getElementById("username_warn").innerText =
        "Username can't be empty!";
      document.getElementById("username").style.outlineColor = "red";
      output = false;
    }
    if (password == null || password == "") {
      document.getElementById("password_warn").style.display = "inline-block";
      document.getElementById("password_warn").innerText =
        "Password can't be empty!";
      document.getElementById("password").style.outlineColor = "red";
      output = false;
    } else if (!password.match(passwordRegex)) {
      document.getElementById("password_warn").style.display = "inline-block";
      document.getElementById("password_warn").innerText =
        "Invalid Password";
      document.getElementById("password").style.outlineColor = "red";
      output = false;
    }
  
    return output;
  }
  