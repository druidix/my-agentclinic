// The datetime-local input has no time zone, so send its value as UTC in the hidden startsAt field.
var input = document.getElementById('when')
var hidden = document.getElementById('startsAt')

function toLocalInput(date) {
  return new Date(date - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

function sync() {
  var date = new Date(input.value)
  hidden.value = input.value && !isNaN(date) ? date.toISOString().replace('.000Z', 'Z') : ''
}

if (hidden.value) input.value = toLocalInput(new Date(hidden.value))
input.min = toLocalInput(new Date())
input.addEventListener('input', sync)
