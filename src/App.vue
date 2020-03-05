<template>
  <div id="app">
    <header-component @changedLanguage="changedLanguage" />
    <div class="window">
      <input-ip @onSubmit="setIP" />
      <result
        :ip="geolocation.ip"
        :continent_code="geolocation.continent_code"
        :country_code="geolocation.country_code"
        :city="geolocation.city"
        :postcode="geolocation.postcode"
        :coordinates="geolocation.coordinates"
        :currentLanguage="currentLanguage"
      />
      <history :currentLanguage="currentLanguage" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Header from './components/Header.vue';
import InputIP from './components/InputIP.vue';
import Result from './components/Result.vue';
import History from './components/History.vue';

export default {
  apollo: {
    ipAddress: {
      query: gql`
        query ipAddress($address: String!) {
          ipAddress(address: $address) {
            address
            country {
              name
              alpha2Code
              location {
                lat
                long
              }
            }
            city {
              name
              continent {
                name
              }
            }
          }
        }
      `,
      variables() {
        return {
          address: this.address,
        };
      },
      result({ data, error }) {
        if (error) console.log('error');
        else {
          /* 
            Данный API не предоставляет возможность получать название городов и стран на русском языке.
            Поэтому метод imitationLanguageSupport, создает имитацию https://graphloc.com/ и добавляет в поля
            название "страны" и "города", поля ru и en. 
          */
          data = this.imitationLanguageSupport(data);
          let { country } = data.ipAddress;
          let { city } = data.ipAddress;
          if (city == null) city = {};
          if (country == null) country = {};

          //first column
          this.geolocation.ip = data.ipAddress.address;

          //second column
          const { continent = '–' } = city;
          const { name: continent_name = '–' } = continent;
          if (continent_name == '–') this.geolocation.continent_code = '–';
          else {
            const continent_code = this.getContinentCode(continent_name);
            this.geolocation.continent_code = `${continent_name}/${continent_code}`;
          }

          //third column
          const { name: country_name = '–' } = country;
          const { en: country_name_en = '–' } = country_name;
          const { ru: country_name_ru = country_name_en } = country_name;
          const { alpha2Code: country_code = '–' } = country;

          this.geolocation.country_code.ru = `${country_name_ru}/${country_code}`;
          this.geolocation.country_code.en = `${country_name_en}/${country_code}`;

          //fourth column
          const { name: city_name = '–' } = city;
          const { en: city_name_en = '–' } = city_name;
          const { ru: city_name_ru = city_name_en } = city_name;
          this.geolocation.city.en = city_name_en;
          this.geolocation.city.ru = city_name_ru;

          //fifth column
          this.geolocation.postcode = '–';

          //sixth column
          const { location = '–' } = country;
          const { lat: country_lat = '–' } = location;
          const { long: country_long = '–' } = location;

          this.geolocation.coordinates = `${country_lat}/${country_long}`;

          this.pushHistory(this.geolocation);
        }
      },
      skip() {
        return this.skipQuery;
      },
    },
  },
  components: {
    'header-component': Header,
    'input-ip': InputIP,
    Result,
    History,
  },
  data() {
    return {
      address: '',
      geolocation: {
        ip: '',
        continent_code: '',
        country_code: {
          ru: '',
          en: '',
        },
        city: {
          ru: '',
          en: '',
        },
        postcode: '',
        coordinates: '',
      },
      continent_codes: ['AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA'],
      currentLanguage: 'en',
    };
  },
  methods: {
    setIP(ip) {
      this.address = ip;
      this.$apollo.queries.ipAddress.start();
    },
    pushHistory(result) {
      const data = {
        ip: result.ip,
        country_code: {
          ru: result.country_code.ru,
          en: result.country_code.en,
        },
        city: {
          ru: result.city.ru,
          en: result.city.en,
        },
      };
      this.$store.dispatch('addResult', data);
    },
    getContinentCode(country) {
      switch (country) {
        case 'Africa':
          return this.continent_codes[0];
        case 'Antarctica':
          return this.continent_codes[1];
        case 'Asia':
          return this.continent_codes[2];
        case 'Europe':
          return this.continent_codes[3];
        case 'North america':
          return this.continent_codes[4];
        case 'Oceania':
          return this.continent_codes[5];
        case 'South america':
          return this.continent_codes[6];
        default:
          return '–';
      }
    },
    changedLanguage(lang) {
      this.currentLanguage = lang;
    },
    imitationLanguageSupport(data) {
      if (data.ipAddress.country != null && data.ipAddress.country.name != null) {
        const country_name = data.ipAddress.country.name;
        let country_name_ru;

        if (country_name == 'Thailand') country_name_ru = 'Таиланд';
        else if (country_name == 'Germany') country_name_ru = 'Германия';
        else country_name_ru = country_name;

        data.ipAddress.country.name = {
          en: country_name,
          ru: country_name_ru,
        };
      }
      if (data.ipAddress.city != null && data.ipAddress.city.name != null) {
        const city_name = data.ipAddress.city.name;
        let city_name_ru;

        if (city_name == 'Bangkok') city_name_ru = 'Бангкок';
        else if (city_name == 'Brunswick') city_name_ru = 'Брауншвейг';
        else city_name_ru = city_name;
        data.ipAddress.city.name = {
          en: city_name,
          ru: city_name_ru,
        };
      }
      return data;
    },
  },
};
</script>

<style lang="scss">
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
      grid-template-rows: repeat(2, auto);
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
}
</style>
