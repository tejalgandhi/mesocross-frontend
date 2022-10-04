<template>
  <section v-if="loaded && !isCreating">
    <div v-if="cards.length" class="cards">
      <template v-for="(card, i) in cards">
        <UiDashboardPaymentsCard :key="i" :data="card" />
      </template>
    </div>
    <span v-else>{{ $t('no_cards_created') }}.</span>
    <div class="new" @click="isCreating = true">
      <span>{{ $t('add_new_card') }}</span>
      <span class="arrow" />
    </div>
  </section>
  <UiDashboardPaymentsNew v-else-if="loaded && isCreating " @back="isCreating = false" @update="getCards" />
  <section v-else-if="!loaded" class="loading">
    <span class="loader" />
  </section>
</template>

<script>
export default {
  data () {
    return {
      cards: [],
      loaded: false,
      isCreating: false
    }
  },

  created () {
    this.getCards()
  },

  methods: {
    async getCards () {
      this.loaded = false
      const response = await this.$axios.get('/payment/cards')
      this.loaded = true

      if (response.status !== 200) {
        return
      }
      this.cards = response.data.data
    }
  }
}
</script>

<style lang="scss" scoped>
    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
    }
</style>
