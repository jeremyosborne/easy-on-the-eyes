// Action types
export const SUGGESTIONS_LOAD = 'easy-on-the-eyes/SUGGESTIONS_LOAD'

export const REDUCER_KEY = 'suggestions'

export const DEFAULT_STATE = {
  loading: false,
  error: {},
  suggestions: [
    // Old suggestions, might have a use for them.
    // {
    //   href: 'https://en.wikipedia.org/wiki/Umberto_Eco',
    //   title: 'Umberto Eco',
    // },
    // {
    //   href: 'https://en.wikipedia.org/wiki/Sephirot',
    //   title: 'Sephirot',
    // },
    // {
    //   href: 'https://en.wikipedia.org/wiki/Semantics',
    //   title: 'Semantics',
    // },
    // {
    //   href: 'https://en.wikipedia.org/wiki/Maternal_insult',
    //   title: '"Your Mom..." Jokes',
    // },
  ],
}
