<template>
  <section>
    <form>
      <h3>{{ $t('app.ip_address') }}</h3>
      <the-mask
        mask="###.###.##.##"
        :masked="true"
        placeholder="000.000.00.00"
        v-model="ip"
        v-bind:class="{ error: isError }"
      />
      <div class="btn" @click="onSubmit">{{ $t('app.get_information') }}</div>
    </form>
  </section>
</template>

<script>
import { TheMask } from 'vue-the-mask';

export default {
  components: {
    'the-mask': TheMask,
  },
  data() {
    return {
      ip: '',
      pattern: /^[0-9]{3}.[0-9]{3}.[0-9]{2}.[0-9]{2}$/,
      isError: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.pattern.test(this.ip)) {
        this.isError = false;
        this.$emit('onSubmit', this.ip);
      } else {
        this.isError = !this.isError;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/ui-kit.scss';

section {
  padding: 48px;
  padding-top: 0;
  & h3 {
    margin: 0;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
  }
  & form {
    & input {
      margin: 8px 0;
      width: 396px;
    }
    & .btn {
      margin-top: 10px;
    }
  }
}
</style>
