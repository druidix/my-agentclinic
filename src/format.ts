// Format a UTC ISO 8601 string in the server's system time zone. This is the no-JavaScript
// fallback; public/js/local-time.js re-renders the same text in the viewer's zone.
export function formatLocal(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
}
