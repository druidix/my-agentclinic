// Runs after htmx loads. No eval keeps the CSP unchanged, and 422 (form errors) is swapped in like a success.
htmx.config.allowEval = false
htmx.config.responseHandling = [
  { code: '204', swap: false },
  { code: '422', swap: true, error: false },
  { code: '[23]..', swap: true },
  { code: '[45]..', swap: false, error: true },
  { code: '...', swap: true },
]
