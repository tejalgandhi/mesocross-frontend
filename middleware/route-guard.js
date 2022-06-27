// middleware/route-guard.js
export default function ({ store }) {
  const { search } = store.state
  if (search) {
    store.dispatch('setSearch')
  }
}
