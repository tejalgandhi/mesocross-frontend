<template>
  <UiDashboardInputsTemplatesNormal v-if="data.type === 'text' || data.type === 'number' || data.type === 'email'" :data="data" @selected="handleSelected" />
  <UiDashboardInputsTemplatesPassword v-else-if="data.type === 'password'" :data="data" @selected="handleSelected" />
  <UiDashboardInputsTemplatesPhone v-else-if="data.type === 'phone'" :data="data" @selected="handleSelected" />
  <UiDashboardInputsTemplatesSelect v-else-if="data.type === 'select'" :data="data" @selected="handleSelected" />
  <UiDashboardInputsTemplatesSelectOther v-else-if="data.type === 'select-other'" :data="data" @selected="handleSelected" />
  <UiDashboardInputsTemplatesCountries v-else-if="data.type === 'country'" :data="data" @selected="handleSelected" />
  <UiDashboardInputsTemplatesBoolean v-else-if="data.type === 'boolean'" :data="data" @selected="handleSelected" />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    handleSelected (data) {
      if (this.data.type === 'phone') {
        for (const key in data.value) {
          this.$emit('selected', { name: key, value: data.value[key] })
        }

        return
      }

      if (this.data.type === 'country') {
        for (const key in data.value) {
          this.$emit('selected', { name: key, value: data.value[key] })
        }

        return
      }

      this.$emit('selected', { name: data.name, value: data.value })
    }
  }
}
</script>
