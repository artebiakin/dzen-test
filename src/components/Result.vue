<template>
  <section>
    <h3>{{ $t('app.result') }}</h3>
    <div class="grid">
      <div>{{ $t('app.ip_address') }}</div>
      <div>{{ $t('app.continent-code') }}</div>
      <div>{{ $t('app.country-code') }}</div>
      <div>{{ $t('app.city') }}</div>
      <div>{{ $t('app.postcode') }}</div>
      <div>{{ $t('app.coordinates') }}</div>
      <div v-if="ip">{{ ip }}</div>
      <div v-else>000.000.00.00</div>
      <div>{{ continent_code }}</div>
      <div>{{ country_code[currentLanguage] }}</div>
      <div>{{ city[currentLanguage] }}</div>
      <div>{{ postcode }}</div>
      <div>{{ coordinates }}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: [
    'ip',
    'continent_code',
    'country_code',
    'city',
    'postcode',
    'coordinates',
    'currentLanguage',
  ],
};
</script>

<style lang="scss" scoped>
section {
  & .grid {
    grid-template-columns: repeat(6, auto);
    & :nth-child(-n + 6) {
      background-color: #656bf2;
    }
    & :nth-child(n + 7):nth-child(n) {
      color: #969696;
    }
    & :nth-child(n + 8):nth-child(n) {
      border-left: 1px solid #cccccc;
      color: #969696;
    }
  }
}
</style>
