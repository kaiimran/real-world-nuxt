import EventService from '@/services/EventService.js'

// state value should always be a function to avoid unwanted shared state on the server side
export const state = () => ({
  events: []
})
export const mutations = {
  SET_EVENTS (state, events) {
    state.events = events
  },

  SET_EVENT (state, event) {
    state.event = event
  }
}
export const actions = {
  fetchEvents ({ commit }) {
    return EventService.getEvents().then((response) => {
      commit('SET_EVENTS', response.data)
    })
  },

  fetchEvent ({ commit }, id) {
    return EventService.getEvent(id).then(function (response) {
      commit('SET_EVENT', response.data)
    })
  }
}
