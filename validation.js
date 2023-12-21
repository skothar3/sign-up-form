const form = document.querySelector("form");
const inputs = form.elements;
const errors = document.querySelectorAll("span.error");
// console.log(inputs);
// console.log(errors);

for (let element of inputs) {
  if (element.name.match(/^phone|submit$/)) {
    console.log(element);
    element.addEventListener("input",(event) => {
      if (element.validity.valid) {

      }
    } )
  }
}
