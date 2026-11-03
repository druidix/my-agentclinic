// The datetime-local input has no time zone, so send its value as UTC in the hidden startsAt field.
function toLocalInput(date) {
  return new Date(date - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

function sync() {
  var input = document.getElementById('when')
  var hidden = document.getElementById('startsAt')
  var date = new Date(input.value)
  hidden.value = input.value && !isNaN(date) ? date.toISOString().replace('.000Z', 'Z') : ''
}

// Runs on load and after htmx swaps the form, which replaces the elements.
function init() {
  var input = document.getElementById('when')
  var hidden = document.getElementById('startsAt')
  if (!input || !hidden) return
  if (hidden.value) input.value = toLocalInput(new Date(hidden.value))
  input.min = toLocalInput(new Date())
}

document.addEventListener('input', function (event) {
  if (event.target.id === 'when') sync()
})
document.addEventListener('htmx:afterSettle', init)
init()
