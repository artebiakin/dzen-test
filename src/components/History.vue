<template>
  <section>
    <h3>{{ $t('app.history') }}</h3>
    <div class="table_block">
      <table>
        <tr>
          <td>{{ $t('app.ip_address') }}</td>
          <td>{{ $t('app.country-code') }}</td>
          <td>{{ $t('app.city') }}</td>
        </tr>
        <tr v-if="!$store.getters.isContains">
          <td>000.000.00.00</td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="(item, count) in $store.getters.result" :key="count">
          <td>{{ item.ip }}</td>
          <td>{{ item.country_code }}</td>
          <td>{{ item.city }}</td>
        </tr>
      </table>
    </div>

    <div
      class="btn"
      v-bind:class="{ 'btn-disabled': !$store.getters.isContains }"
      @click="clearHistory"
    >
      {{ $t('app.clear_history') }}
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    clearHistory() {
      if (this.$store.getters.isContains) this.$store.dispatch('clearHistory');
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  .table_block {
    width: 50%;
    border-radius: 8px;
    border: 1px solid #cccccc;
    overflow: hidden;
    margin-top: 13px;
    margin-bottom: 18px;
    & table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 8px;
      & > :first-child {
        background-color: #656bf2;
        color: #ffffff;
      }
      & :nth-child(n) {
        padding: 9px 18px;
        text-align: center;
        color: #ffffff;
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
      }
      & > :nth-child(n + 2) {
        & :nth-child(n) {
          color: #969696;
        }
        & :nth-child(n + 2) {
          border-left: 1px solid #cccccc;
        }
      }
    }
  }
}
</style>
