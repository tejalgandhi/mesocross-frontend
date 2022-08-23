<template>
  <div>
    <div class="h1 title-34">
      Need Help?
    </div>
    <div class="accordion accordion-custom" role="tablist">
      <b-card no-body class="mb-1">
        <div v-for="(help,index) in helps" :key="index" class="card-header-div">
          <b-card-header v-b-toggle="`accordion-${index}`" header-tag="header" class="card-header" role="tab" @click="toggleActive(index)">
            <span class="card-link " :class="{'collapsed' : help.collapsed }">
              <div class="mc-toggle-info">
                {{ help.question }}
              </div>
              <div class="toggle-plus">
                <img src="@/assets/img/togglePlus.svg" alt="image">
              </div>
            </span>
          </b-card-header>
          <b-collapse :id="`accordion-${index}`" role="tabpanel">
            <b-card-body class="card-body">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="help.answer" />
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
      helps: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.$get('get-need-help')
    this.helps = data
  },
  methods: {
    toggleActive (index) {
      // eslint-disable-next-line prefer-const
      let selected = this.helps[index]
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
