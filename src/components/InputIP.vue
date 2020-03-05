<template>
  <section>
    <form>
      <h3>{{ $t('app.ip_address') }}</h3>
      <!-- a. Поле ввода IP адреса должно иметь маску “###.###.##.##”; -->
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
    /* 
      b. Если IP адрес введен корректно, то после нажатия на кнопку “Get
      information”, должен быть выполнен запрос на API; 
    */
    /* 
      c. Если IP адрес введен некорректно, то поле ввода должно
      изменить стиль отображения на Error (см. UI Kit у Figma);
    */
    onSubmit() {
      if (this.pattern.test(this.ip)) {
        //correct
        this.isError = false;
        this.$emit('onSubmit', this.ip);
      } else {
        //incorrect
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
