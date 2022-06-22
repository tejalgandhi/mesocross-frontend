<template>
  <div>
    <div class="h1 title-34">
      FAQs
    </div>
    <div class="accordion accordion-custom" role="tablist">
      <b-card no-body class="mb-1">
        <div v-for="(faq,index) in faqs" :key="index" class="card-header-div">
          <b-card-header v-b-toggle="`accordion-${index}`" header-tag="header" class="card-header" role="tab" @click="toggleActive(index)">
            <span class="card-link " :class="{'collapsed' : faq.collapsed }">
              <div class="mc-toggle-info">
                {{ faq.question }}
              </div>
              <div class="toggle-plus">
                <img src="@/assets/img/togglePlus.svg" alt="image">
              </div>
            </span>
          </b-card-header>
          <b-collapse :id="`accordion-${index}`" role="tabpanel">
            <b-card-body class="card-body">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="faq.answer" />
            </b-card-body>
          </b-collapse>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      faqs: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.$get('get-faq')
    this.faqs = data
  },
  methods: {
    toggleActive (index) {
      // eslint-disable-next-line prefer-const
      let selected = this.faqs[index]
      selected.collapsed = !selected.collapsed
    }
  }
}
</script>
<style scoped>
  .card-header-div{
    margin-bottom: 10px;
  }
</style>
