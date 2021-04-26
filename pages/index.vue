<template>
  <div>
    <h1>Events</h1>
    <EventCard
      v-for="(event, index) in events"
      :key="index"
      :event="event"
      :data-index="index"
    />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex' // <--- To map event

export default {
  components: {
    EventCard
  },

  // fetch page component hook works on the client & server-side to fill the store before rendering the page.
  // Unlike asyncData this doesn’t have a return value that merges with component data, which we don’t need anymore
  async fetch ({ store, error }) {
    try {
      await store.dispatch('events/fetchEvents')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch events events at this time'
      })
    }
  },

  head () { // property used by vue-meta, metaInfo
    return {
      title: 'Event Listing',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Where you can find all the events taking place nearest you'
        }
      ]
    }
  },

  computed: mapState({
    events: state => state.events.events
  })

  // Promise (without vuex & without API call from EventService)
  // asyncData ({ $axios, error }) {
  //   return $axios
  //     .get('http://localhost:3000/events')
  //     .then((response) => {
  //       return {
  //         events: response.data
  //       }
  //     }).catch((e) => {
  //       error({ statusCode: 503, message: 'Unable to fetch events at this time, please try again' })
  //     })
  // },

  // Async await (without vuex)
  // async asyncData ({ error }) {
  //   try {
  //     const { data } = await EventService.getEvents()
  //     return {
  //       events: data
  //     }
  //   } catch (e) {
  //     error({
  //       statusCode: 503,
  //       message: 'Unable to fetch events events at this time'
  //     })
  //   }
  // },
}
</script>
