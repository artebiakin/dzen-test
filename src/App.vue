<template>
  <div id="app">
    <header-component />
    <div class="window">
      <section>
        <form>
          <h3>{{ $t('app.ip_address') }}</h3>
          <the-mask
            mask="###.###.##.##"
            placeholder="000.000.00.00"
            v-model="ip"
            :masked="true"
            id="input-ip"
          />
          <div class="btn" type="submit" @click="getIP">{{ $t('app.get_information') }}</div>
        </form>
      </section>
      {{ $store.getters.result }}
      <section>
        <h3>{{ $t('app.result') }}</h3>
        <div class="grid">
          <div>{{ $t('app.ip_address') }}</div>
          <div>{{ $t('app.continent-code') }}</div>
          <div>{{ $t('app.country-code') }}</div>
          <div>{{ $t('app.city') }}</div>
          <div>{{ $t('app.postcode') }}</div>
          <div>{{ $t('app.coordinates') }}</div>
          <div v-if="this.geolocation.ip">{{ this.geolocation.ip }}</div>
          <div v-else>000.000.00.00</div>
          <div>{{ geolocation.continent_code }}</div>
          <div>{{ geolocation.country_code }}</div>
          <div>{{ geolocation.city }}</div>
          <div>{{ geolocation.postcode }}</div>
          <div>{{ geolocation.coordinates }}</div>
        </div>
      </section>
      <section>
        <h3>{{ $t('app.history') }}</h3>
        <div class="grid">
          <div>{{ $t('app.ip_address') }}</div>
          <div>{{ $t('app.country-code') }}</div>
          <div>{{ $t('app.city') }}</div>
          <div>000.000.00.00</div>
          <div></div>
          <div></div>
        </div>
        <div class="btn btn-disabled">{{ $t('app.clear_history') }}</div>
      </section>
    </div>
  </div>
</template>

<script>
// import gql from 'graphql-tag';
import Header from './components/Header.vue';
import { TheMask } from 'vue-the-mask';

export default {
  name: 'App',
  data() {
    return {
      ip: '',
      pattern: /^[0-9]{3}.[0-9]{3}.[0-9]{2}.[0-9]{2}$/,
      geolocation: {
        ip: '',
        continent_code: '',
        country_code: '',
        city: '',
        postcode: '',
        coordinates: '',
      },
    };
  },
  components: {
    'header-component': Header,
    'the-mask': TheMask,
  },
  methods: {
    getIP() {
      if (this.pattern.test(this.ip)) {
        document.querySelector('#input-ip').classList.remove('error');
        // this.$apollo.queries.pokemon.setVariables({
        //   name: 'Pikachu',
        // });
        // this.$apollo.queries.pokemon.refresh();

        // this.$apollo.queries.geolocation.setVariables({
        //   ip: this.ip,
        // });
        // this.$apollo.queries.geolocation.refresh();
        this.geolocation.ip = this.ip;
        this.geolocation.continent_code = 'Europe/EU' || '/iso_code';
        this.geolocation.country_code = 'Italy/IT' || '';
        this.geolocation.city = '–';
        this.geolocation.postcode = '–';
        this.geolocation.coordinates =
          '45.2/9.1' || 'geolocation.location.latitude/geolocation.location.longitude';
      } else {
        document.querySelector('#input-ip').classList.add('error');
      }
    },
    pushHistory() {},
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/ui-kit.scss';
body {
  min-width: 1280px;
  max-width: 2560px;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
}
#app {
  width: 100%;
  max-width: 1170px;
  margin-top: 48px;
}
.window {
  background-color: #ffffff;
  box-shadow: 0px 0px 50px rgba(230, 230, 230, 0.8);
  width: 936px;
  height: auto;
  margin: 0 auto;
  margin-top: 57px;
  & > :first-child {
    padding-top: 45px;
  }
  & section {
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
    & .grid {
      display: grid;
      border: 1px solid #cccccc;
      box-sizing: border-box;
      border-radius: 8px;
      grid-auto-rows: auto;
      overflow: hidden;
      margin-top: 13px;
      margin-bottom: 18px;
      grid-template-rows: repeat(2, 34px);
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
    }
  }
  & :nth-child(2) {
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
  & :nth-child(3) {
    & .grid {
      width: 50%;
      grid-template-columns: repeat(3, auto);
      & :nth-child(-n + 3) {
        background-color: #656bf2;
      }
      & :nth-child(n + 4):nth-child(n) {
        color: #969696;
      }
      & :nth-child(n + 5):nth-child(n) {
        border-left: 1px solid #cccccc;
        color: #969696;
      }
    }
  }
}
</style>
