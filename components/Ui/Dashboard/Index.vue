<template>
  <section>
    <h2>
      {{ $t(tab.name) }}
    </h2>
    <UiDashboardProfile v-if="tab.query === ''" />
    <UiDashboardCompanyProfile v-else-if="tab.query === 'company'" />
    <UiDashboardAddresses v-else-if="tab.query === 'shipping_addresses'" />
    <UiDashboardPayments v-else-if="tab.query === 'payment_methods'" />
    <UiDashboardOrders v-else-if="tab.query === 'orders'" />
    <UiDashboardLedger v-else-if="tab.query === 'ledger'" />
  </section>
</template>

<script>
export default {
  props: {
    tab: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
    section {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        h2 {
            font-weight: 500;
            font-size: 34px;
        }
    }
</style>
