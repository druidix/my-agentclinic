export type Section = {
  href: string
  label: string
  phase: number
  note: string
}

export type NavItem = {
  href: string
  label: string
}

export const sections: Section[] = [
  { href: '/dashboard', label: 'Dashboard', phase: 6, note: 'Staff overview of the clinic.' },
  { href: '/agents', label: 'Agents', phase: 8, note: 'Coming soon: the agent list arrives in phase 8.' },
  { href: '/ailments', label: 'Ailments', phase: 9, note: 'Coming soon: ailments arrive in phase 9.' },
  { href: '/therapies', label: 'Therapies', phase: 10, note: 'Coming soon: therapies arrive in phase 10.' },
  { href: '/appointments', label: 'Appointments', phase: 11, note: 'Coming soon: scheduled appointments arrive in phase 11.' },
]

export const nav: NavItem[] = [
  { href: '/', label: 'Home' },
  ...sections.map(({ href, label }) => ({ href, label })),
]

// Lowercase and strip trailing slashes so /Dashboard/ matches /dashboard.
export function normalizePath(path: string): string {
  return path.toLowerCase().replace(/\/+$/, '') || '/'
}

// The nav link for a path: its own page, or a nested page such as /agents/3. Home matches only itself.
export function activeHref(path: string): string | undefined {
  const current = normalizePath(path)
  return nav.find(({ href }) => (href === '/' ? current === '/' : current === href || current.startsWith(`${href}/`)))?.href
}
