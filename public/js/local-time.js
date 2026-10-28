// Show each <time datetime="…Z"> in the viewer's system time zone. Storage stays UTC.
document.querySelectorAll('time[datetime]').forEach(function (el) {
  var date = new Date(el.getAttribute('datetime'))
  if (!isNaN(date)) el.textContent = date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
})
