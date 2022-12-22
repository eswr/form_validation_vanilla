const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cnfpassword = document.getElementById("cnfpassword");
const dateOfBirth = document.getElementById("date1");
const image = document.getElementById("image");
const skillOneEl = document.getElementById("skill1");
const skillTwoEl = document.getElementById("skill2");
const skillThreeEl = document.getElementById("skill3");
const skillFourEl = document.getElementById("skill4");
const skillFiveEl = document.getElementById("skill5");
const skillSixEl = document.getElementById("skill6");

const serializeForm = form =>
  Array.from(new FormData(form), field =>
    field.map(encodeURIComponent).join('=')
  ).join('&');

const isDirty = (form) => cleanForm != serializeForm(form)
const isFormValid = (form) => {
  return isFormFieldValid(form.date1) &&
    isFormFieldValid(cnfpassword) &&
    isFormFieldValid(form.password) &&
    isFormFieldValid(form.email) &&
    isFormFieldValid(form.firstname) &&
    isFormFieldValid(form.lastname) &&  
    isPassingRadio(form.gender) &&
    isPassingRadio(form.skill) &&
    isPassingFile(form.image)
}
const applyFormValidation = (form) => {
  checkValidationForField(form.firstname)
  checkValidationForField(form.lastname)
  checkValidationForField(form.email)
  checkValidationForField(form.password)
  checkValidationForField(cnfpassword)
  checkValidationForField(form.date1)
  
  checkValidationForRadioField(
    form.gender,
    isPassingRadio(form.gender),
    errorMsg="Please select a gender",
    "genders"
  )
  checkValidationForRadioField(
    form.skill,
    isPassingRadio(form.skill),
    errorMsg="Please select at least skill",
    "skills-list"
  )
  checkValidationForField(form.image)
}
// const replaceByKeyInFormData = (formData, key, el) => {
//   const [files, value] = el;
//   formData.set(key, files[0].name);
//   console.log(value);
//   return formData
// }
const getFormData = (form) => new FormData(form) //replaceByKeyInFormData(new FormData(form), 'image', form.image)
const submitForm = (event) => {
  event.preventDefault();
  const form = event.target
  if (!isDirty(form)) {
    form.querySelector('button[type="submit"]').setAttribute('disabled','disabled');
    return
  } else {
    form.querySelector('button[type="submit"]').removeAttribute('disabled')
  }
  if (isFormValid(form)) {
    const data = Object.fromEntries(getFormData(form).entries());
    console.log(data);
  } else {
    applyFormValidation(form);
    form.querySelector('button[type="submit"]').removeAttribute('disabled')
  }
  // checkInputs();
}
let cleanForm;
(function (){
  cleanForm = serializeForm(form);
  form.addEventListener('submit', submitForm, false);

  form.firstname.addEventListener('blur', (e) => checkValidationForField(e.target))
  form.firstname.addEventListener('click', (e) => resetErrorFor(e.target))
  
  form.lastname.addEventListener('blur', (e) => checkValidationForField(e.target))
  form.lastname.addEventListener('click', (e) => resetErrorFor(e.target))

  form.email.addEventListener('blur', (e) => {
    checkValidationForField(e.target)
    if (isPassingRequired(e.target.value)) {
      checkValidationForField(
        e.target, isPassingEmail(e.target.value), emailErrorMsg()
      )  
    }
  })
  form.email.addEventListener('click', (e) => resetErrorFor(e.target))

  form.password.addEventListener('blur', (e) => checkValidationForField(e.target))
  form.password.addEventListener('click', (e) => resetErrorFor(e.target))
  
  cnfpassword.addEventListener('blur', (e) => checkValidationForField(
    e.target,
    isPassingRequired(e.target.value.trim()),
    requiredErrorMsg("Confirm Password")
  ))
  cnfpassword.addEventListener('click', (e) => resetErrorFor(e.target))

  form.date1.addEventListener('blur', (e) => checkValidationForField(
    e.target,
    isPassingRequired(e.target.value.trim()),
    requiredErrorMsg("Date of Birth")
  ))
  form.date1.addEventListener('click', (e) => resetErrorFor(e.target))

  Array.from(form.gender).map(radioOrChecked => radioOrChecked.addEventListener('click',
    (e) => checkValidationForField(e.target)))
  Array.from(form.skill).map(radioOrChecked => radioOrChecked.addEventListener('click',
    (e) => checkValidationForField(e.target)))

  form.image.addEventListener('change', (e) => checkValidationForField(e.target))
})();
const isFormFieldTest = (fieldValue, defaultValue) => fieldValue !== defaultValue
const isPassingRequired = (value) => isFormFieldTest(value, '')

const isPassingEmail = (value) => isEmail(value)

const isPassingRadio = field => Array.from(field).reduce((selected, radio) =>  selected || radio.checked, false)
const checkValidationForRadioField = (
  field,
  valid=isPassingRadio(field),
  errorMsg=requiredRadioErrorMsg(field.name),
  successClass="genders"
) => {
  debugger;
  isFormValid(form) && form.querySelector('button[type="submit"]').removeAttribute('disabled')
  !valid ? setErrorFor(field[0], errorMsg, "radio") : setSuccessFor(field[0], "radio", successClass)
}

const isPassingFile = (field) => field.value != ""

const requiredErrorMsg = (name) => name+" can not be blank"
const emailErrorMsg = () => "Not a valid email"

const isFormFieldValid = (field) => isPassingRequired(field.value.trim())
const checkValidationForField = (
  field,
  valid=isPassingRequired(field.value.trim()),
  errorMsg=requiredErrorMsg(field.name)
) => {
  isFormValid(form) && form.querySelector('button[type="submit"]').removeAttribute('disabled')
  !valid ? setErrorFor(field, errorMsg) : setSuccessFor(field)
}

// function checkInputs() {
//   const firstNameValue = firstName.value.trim();
//   const lastNameValue = lastName.value.trim();
//   const emailValue = email.value.trim();
//   const passwordValue = password.value.trim();
//   const cnfpasswordValue = cnfpassword.value.trim();
//   const dateOfBirthValue = dateOfBirth.value.trim();
//   const imageValue = image.value.trim();

//   if (firstNameValue === "") {
//     setErrorFor(firstName, "Firstname cannot be blank");
//   } else {
//     setSuccessFor(firstName);
//   }

//   if (imageValue === "") {
//     setErrorFor(image, "Please select an image");
//   } else {
//     setSuccessFor(image);
//   }

//   if (dateOfBirthValue === "") {
//     setErrorFor(dateOfBirth, "Please enter your Date Of Birth");
//   } else {
//     setSuccessFor(dateOfBirth);
//   }

//   if (lastNameValue === "") {
//     setErrorFor(lastName, "Lastname cannot be blank");
//   } else {
//     setSuccessFor(lastName);
//   }

//   if (emailValue === "") {
//     setErrorFor(email, "Email cannot be blank");
//   } else if (!isEmail(emailValue)) {
//     setErrorFor(email, "Not a valid email");
//   } else {
//     setSuccessFor(email);
//   }

//   if (passwordValue === "") {
//     setErrorFor(password, "Password cannot be blank");
//   } else {
//     setSuccessFor(password);
//   }

//   if (cnfpasswordValue === "") {
//     setErrorFor(cnfpassword, "Confirm Password cannot be blank");
//   } else if (passwordValue !== cnfpasswordValue) {
//     setErrorFor(cnfpassword, "Passwords does not match");
//   } else {
//     setSuccessFor(cnfpassword);
//   }

//   // For checkbox validation
//   if (
//     !skillOneEl.checked &&
//     !skillTwoEl.checked &&
//     !skillThreeEl.checked &&
//     !skillFourEl.checked &&
//     !skillFiveEl.checked &&
//     !skillSixEl.checked
//   ) {
//     setErrorFor(skillOneEl, "Please select atleast one skills", "checkbox");
//   } else {
//     setSuccessFor(skillOneEl, "checkbox", "skills-list");
//   }

//   // For Radio box validation
//   let valid = false;
//   const radioGroups = document.infoForm.gender;
//   const maleRadioEl = document.getElementById("male");
//   for (let i = 0; i < radioGroups.length; i++) {
//     if (radioGroups[i].checked) {
//       valid = true;
//       break;
//     }
//   }

//   if (!valid) {
//     setErrorFor(maleRadioEl, "Please select one gender", "radio");
//   } else {
//     setSuccessFor(maleRadioEl, "radio", "genders");
//   }

//   // Collecting all the forms elements value

//   // for checkboxes values
//   const skills = [];
//   if (skillOneEl.checked) {
//     skills.push(skillOneEl.value);
//   }
//   if (skillTwoEl.checked) {
//     skills.push(skillTwoEl.value);
//   }

//   if (skillThreeEl.checked) {
//     skills.push(skillThreeEl.value);
//   }
//   if (skillFourEl.checked) {
//     skills.push(skillFourEl.value);
//   }

//   if (skillFiveEl.checked) {
//     skills.push(skillFiveEl.value);
//   }

//   if (skillSixEl.checked) {
//     skills.push(skillSixEl.value);
//   }

//   // for radiobox values
//   const gender = document.querySelector('input[name="gender"]:checked').value;

//   const formValues = {
//     firstName: firstNameValue,
//     lastName: lastNameValue,
//     email: emailValue,
//     password: passwordValue,
//     confirmPassword: cnfpasswordValue,
//     dateOfBirth: dateOfBirthValue,
//     image: image.files[0],
//     skills,
//     gender,
//   };

//   console.log(formValues);
// }

function resetErrorFor(input, message="", type = "input") {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function setErrorFor(input, message, type = "input") {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  if (type === "input") {
    formControl.className = "form-control error";
  } else if (type === "checkbox") {
    formControl.className = "skills-list error";
  } else if (type === "radio") {
    formControl.className = "genders error";
  } else {
    formControl.className = "error";
  }
  small.innerText = message;
}

function setSuccessFor(input, type = "input", className = "") {
  const formControl = input.parentElement;
  if (type === "input") {
    formControl.className = "form-control success";
  } else {
    formControl.className = className;
  }
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
