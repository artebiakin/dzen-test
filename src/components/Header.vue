<template>
  <header>
    <div class="row">
      <div class="col"></div>
      <div class="col logo">GeoIP</div>
      <div class="col">
        <div class="switch">
          <span>{{ currentLanguage }}</span>
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-up"
          >
            <path d="M5 8.74228e-07L9.33012 6.75L0.669872 6.75L5 8.74228e-07Z" fill="white" />
          </svg>
          <div class="switch--active">
            <ul>
              <li @click="switchLanguage('ru')" :class="{ active: currentLanguage == 'ru' }">RU</li>
              <li @click="switchLanguage('en')" :class="{ active: currentLanguage == 'en' }">EN</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import i18n from '@/i18n';

export default {
  data() {
    return {
      currentLanguage: String,
    };
  },
  methods: {
    switchLanguage(lang) {
      i18n.locale = lang;
      this.currentLanguage = i18n.locale;
      this.$emit('changedLanguage', this.currentLanguage);
    },
  },
  mounted() {
    console.log(i18n);

    this.currentLanguage = i18n.locale;
  },
};
</script>

<style lang="scss">
header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: #656bf2;
  color: #fff;
  & .row {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1170px;
    margin: 0 auto;
    height: 100%;
    & .col {
      width: 33.3%;
    }
    & .logo {
      font-family: Open Sans;
      font-style: normal;
      font-weight: 800;
      font-size: 18px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
    }
    & .switch {
      display: block;
      float: right;
      cursor: pointer;
      position: relative;
      padding: 5px;
      display: flex;
      align-items: center;
      &:hover {
        & .switch--active {
          display: block;
        }
      }
      &--active {
        position: absolute;
        top: 100%;
        left: 7px;
        background-color: #ffffff;
        box-shadow: 0px 20px 50px rgba(229, 229, 229, 0.8);
        border-radius: 8px;
        display: none;
        & ul {
          color: #000;
          list-style: none;
          padding: 0;
          margin: 0;
          padding: 7px 8px;
          & li {
            margin: 7px;
            font-family: Open Sans;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 25px;
          }
          & .active {
            color: #656bf2;
          }
        }
      }
      & span {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        margin-right: 4px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
