<template>
  <section>
    <template v-for="(event, i) in events">
      <EventListingItem :key="i" :data="event" />
    </template>
  </section>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
    section {
        width: 75%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        @media screen and (max-width: 992px) {
            width: 100%;
            padding: 0 15px;
            margin-top: 30px;
        }
    }
</style>
