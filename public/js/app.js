// ftionetch api and reprresenta
const Form = document.querySelector('form')
const search = document.querySelector('input')
const mssg1 = document.querySelector('#mssg1')
const mssg2 = document.querySelector('#mssg2')



Form.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    mssg1.textContent = 'Loading...'
    mssg2.textContent = ''
    const urL = 'http://localhost:3000/weather?address=' + location

    fetch(urL).then((response) => {
    response.json().then((data) => {
        if(data.error) {
          mssg1.textContent = data.error
          mssg2.textContent = ''
        } else {
            mssg1.textContent = data.location
            mssg2.textContent = data.forecast
        }
    })
  })
})

