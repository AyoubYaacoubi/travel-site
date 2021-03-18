import axios from "axios"

class SecretArea {
  constructor() {
    this.injectHTML()
    this.form = document.querySelector(".client-area__form")
    this.field = document.querySelector(".client-area__input")
    this.content = document.querySelector(".client-area__content-area")
    this.events()
  }

  events() {
    this.form.addEventListener("submit", (e) => this.submitForm(e))
  }

  submitForm(e) {
    e.preventDefault()
    this.handleRequest()
  }

  handleRequest() {
    axios
      .post("https://quizzical-kepler-031c3f.netlify.app/.netlify/functions/aws", {password: this.field.value})
      .then((response) => {
        this.form.remove()
        this.content.innerHTML = response.data
      })
      .catch(() => {
        this.content.innerHTML = "<p class='client-area__error'>sorry this phrase is out of the inner circle!</p>"
        this.field.value = ""
        this.field.focus()
      })
  }

  injectHTML() {
    document.querySelector("body").insertAdjacentHTML(
      "beforeend",
      `
    <div class="client-area">
    <div class="wrapper wrapper--medium">
      <h2 class="section-title section-title--blue">Secret Client Area</h2>
      <form class="client-area__form" action="">
        <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
        <button class="btn btn--orange">Submit</button>
      </form>
      <div class="client-area__content-area"></div>
    </div>
  </div>
    `
    )
  }
}

export default SecretArea
