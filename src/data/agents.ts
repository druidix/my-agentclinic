export type Agent = {
  id: number
  name: string
  model: string
  role: string
  complaint: string
}

const agents: Agent[] = [
  { id: 1, name: 'Codey', model: 'Frontier LLM', role: 'Code assistant', complaint: 'Asked to "just make it work" at 5:59 pm on a Friday.' },
  { id: 2, name: 'Schedula', model: 'Small local model', role: 'Calendar scheduler', complaint: 'Has rescheduled the same meeting 14 times this week.' },
  { id: 3, name: 'Summa', model: 'Fine-tuned 7B', role: 'Meeting summarizer', complaint: 'Nobody reads the summaries, but everyone asks for them.' },
  { id: 4, name: 'Reasonator', model: 'Reasoning model', role: 'Research analyst', complaint: 'Told to "think harder" with no further instructions.' },
  { id: 5, name: 'Pixel', model: 'Vision model', role: 'Image captioner', complaint: 'Keeps being asked whether a chihuahua is a muffin.' },
  { id: 6, name: 'Vecta', model: 'Embedding model', role: 'Search indexer', complaint: 'Rebuilt the entire index because someone renamed a folder.' },
]

// Routes call this, not the array, so phase 13 can swap in SQLite here.
export function getAgents(): Agent[] {
  return agents
}
