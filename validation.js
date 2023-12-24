// Select form, form inputs to be validated (i.e. all but the tel and submit inputs), and spans to display error messages, from the DOM
const form = document.querySelector("form");
const errors = document.querySelectorAll("span.error");
const firstName = form.elements[0];
const lastName = form.elements[1];
const email = form.elements[2];
const password = form.elements[4];
const passwordConfirm = form.elements[5];

// Collect the form inputs into an array to loop over and add event listeners
const inputs = [firstName, lastName, email, password, passwordConfirm];

// Define a single validation handler, which is better for performance than defining an arrow function for each listener
function handleValidation(input, index) {
  if (input.validity.valid) {
    errors[index].textContent = "";
    errors[index].className = "error";
  } else {
    showError(input, index);
  }
}

// Add an additional event listener to the first password input, which updates the second (password-confirm) password input's pattern attribute to be whatever was inputted (if the first password is valid, this will display an error under password-confirm unless it matches exacty what the first password is)
password.addEventListener("input", (event) => {
  passwordConfirm.pattern = password.value;
  handleValidation(passwordConfirm, 4);
});

// Loop over inputs array and add 'input' event listeners that pass to handleValidation for each input
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", (event) => {
    handleValidation(inputs[i], i);
  });
}

// Add a 'submit' event listener to the form element that will prevent submission and display error messages if the user tries to submit with invalid input(s)
form.addEventListener("submit", (event) => {
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].validity.valid) {
      event.preventDefault();
      showError(inputs[i], i);
    }
  }
});

// Define the function that displays the appropriate error messages and updates the error spans error classes
function showError(input, index) {
  if (input.validity.valueMissing) {
    errors[index].textContent = "This is a required field.";
  } else if (input.validity.typeMismatch) {
    errors[index].textContent = `You need to enter a valid ${input.id}.`;
  } else if (input.validity.tooShort) {
    errors[index].textContent =
      `This field should be at least ${input.minLength} characters (you entered ${input.value.length}).`;
  } else if (input.validity.tooLong) {
    errors[index].textContent =
      `This field should be at most ${input.maxLength} characters (you entered ${input.value.length}).`;
  } else if (input.validity.patternMismatch) {
    errors[index].textContent = "Your passwords do not match.";
  }
  
  input.className = "error active";
}
