<template>
  <div v-if="dataLoaded">

    <v-row>
      <v-col cols="12">
        <h2>{{ $t('building.provisionHouse.buffs') }}</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">{{ $t('text.lvl') }}</th>
                <th class="text-left">{{ $t('text.name') }}</th>
                <th class="text-left">{{ $t('text.resources') }}</th>
                <th class="text-left">{{ $t('building.provisionHouse.timeProduction') }}</th>
                <th class="text-left">{{ $t('building.provisionHouse.effect') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in buffList" :key="'buff-key-' + idx">
                <td>{{ item.requiredLevel }}</td>
                <td>
                  <div class="name-cell">
                    <NuxtLink :to="`/buffs/${item.slug}`"><img :src="item.buttonIconUrl" alt=""></NuxtLink>
                    <NuxtLink :to="`/buffs/${item.slug}`">{{ getLocaleName(item.name) }}</NuxtLink>
                  </div>
                </td>
                <td>
                  <div class="resources-cell">
                    <div v-for="(resource, index) in item.consumptionResources" :key="'buff-res-key' + index">
                      <NuxtLink :to="`/resources/${resource.slug}`"><img :src="resources[resource.slug].imageUrl" alt=""></NuxtLink>
                      {{ resource.amount }}
                    </div>
                  </div>
                </td>
                <td>{{ formatTime(item.productionTime) }}</td>
                <td>{{ formatEffect(item) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>{{ $t('building.provisionHouse.deposits') }}</h2>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">{{ $t('text.lvl') }}</th>
                <th class="text-left">{{ $t('text.name') }}</th>
                <th class="text-left">{{ $t('text.resources') }}</th>
                <th class="text-left">{{ $t('building.provisionHouse.timeProduction') }}</th>
                <th class="text-left">{{ $t('building.provisionHouse.effect') }}</th>
                <th class="text-left">{{ $t('building.provisionHouse.result') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in depositList" :key="'deposit-key-' + idx">
                <td>{{ item.requiredLevel }}</td>
                <td>
                  <div class="name-cell">
                    <img :src="item.buttonIconUrl" alt="">
                    {{ getLocaleName(item.buttonName) }}
                  </div>
                </td>
                <td>
                  <div class="resources-cell">
                    <div v-for="(resource, index) in item.consumptionResources" :key="'buff-res-key' + index">
                      <NuxtLink :to="`/resources/${resource.slug}`"><img :src="resources[resource.slug].imageUrl" alt=""></NuxtLink>
                      {{ resource.amount }}
                    </div>
                  </div>
                </td>
                <td>{{ formatTime(item.productionTime) }}</td>
                <td>{{ formatEffect(item) }}</td>
                <td>
                  <div class="name-cell">
                    <NuxtLink :to="`/buffs/${item.slug}`"><img :src="item.imageUrl" alt=""></NuxtLink>
                    x {{ item.amount }}
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>{{ $t('text.resources') }}</h2>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">{{ $t('text.lvl') }}</th>
                <th class="text-left">{{ $t('text.name') }}</th>
                <th class="text-left">{{ $t('text.resources') }}</th>
                <th class="text-left">{{ $t('building.provisionHouse.timeProduction') }}</th>
                <th class="text-left">{{ $t('building.provisionHouse.effect') }}</th>
                <th class="text-left">{{ $t('building.provisionHouse.result') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in resourcesList" :key="'resources-key-' + idx">
                <td>{{ item.requiredLevel }}</td>
                <td>
                  <div class="name-cell">
                    <img :src="item.buttonIconUrl" alt="">
                    {{ getLocaleName(item.buttonName) }}
                  </div>
                </td>
                <td>
                  <div class="resources-cell">
                    <div v-for="(resource, index) in item.consumptionResources" :key="'buff-res-key' + index">
                      <NuxtLink :to="`/resources/${resource.slug}`"><img :src="resources[resource.slug].imageUrl" alt=""></NuxtLink>
                      {{ resource.amount }}
                    </div>
                  </div>
                </td>
                <td>{{ formatTime(item.productionTime) }}</td>
                <td>{{ formatEffect(item) }}</td>
                <td>
                  <div class="add-resources-cell-wrap">
                    <NuxtLink :to="`/buffs/${item.slug}`">
                      <div class="add-resources-cell">
                        <img :src="item.imageUrl" alt="">
                      </div>
                    </NuxtLink>
                    <span class="add-resources-amount">x {{ item.amount }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  props: {
    building: {
      type: Object
    },
    resources: {
      type: Object
    }
  },
  data() {
    return {
      dataLoaded: false,
      buffs: {},
    }
  },
  async created() {
    this.buffs = await this.$store.dispatch('buffs/getAll') // по хорошему надо условие передовать, чтобы только для УМ выбрались
    // this.resources = await this.$store.dispatch('resources/getAll')
    console.log('this.resources: ', this.resources);
    console.log('buffs: ', this.buffs);
    this.dataLoaded = true
  },
  computed: {
    origins() {
      const origins = []
      for(const buff in this.buffs) {
        // console.log('buff: ', this.buffs[buff]);
        for(const origin in this.buffs[buff].origins) {
          // console.log('this.buffs[buff].origins: ', this.buffs[buff].origins);
          if(this.buffs[buff].origins[origin].slugBuilding === 'provision-house') {
            const buffItem = {
              effectName: this.buffs[buff].effectName,
              effectType: this.buffs[buff].effectType,
              effectValue: this.buffs[buff].effectValue,
              effectDuration: this.buffs[buff].effectDuration,
              imageUrl: this.buffs[buff].imageUrl,
              name: this.buffs[buff].name,
              slug: this.buffs[buff].slug,
              type: this.buffs[buff].type,
              name: this.buffs[buff].name,
              weight: this.buffs[buff].weight,
              gameDescription: this.buffs[buff].gameDescription,

              amount: this.buffs[buff].origins[origin].amount,
              buttonIconUrl: this.buffs[buff].origins[origin].buttonIconUrl,
              buttonName: this.buffs[buff].origins[origin].buttonName,
              consumptionResources: this.buffs[buff].origins[origin].consumptionResources,
              productionTime: this.buffs[buff].origins[origin].productionTime,
              requiredLevel: this.buffs[buff].origins[origin].requiredLevel,
              typeProduction: this.buffs[buff].origins[origin].typeProduction,
            }
            // console.log('buffItem: ', buffItem);
            origins.push(buffItem)
          }
          // console.log('origin: ', this.buffs[buff].origins[origin]);

        }
      }
      console.log('origins: ', origins);
      return origins
    },
    buffList() {
      return this.origins.filter(item => item.typeProduction === "buff").sort((a, b) => a.weight - b.weight)
    },
    depositList() {
      return this.origins.filter(item => item.typeProduction === "deposit").sort((a, b) => a.weight - b.weight)
    },
    resourcesList() {
      return this.origins.filter(item => item.typeProduction === "resources").sort((a, b) => a.weight - b.weight)
    },
  },
  methods: {
    getResourceIconUrl(slug) {
      // console.log('getResourceIconUrl: ', this.resources['coins'].image.url);
      return this.resources[slug].imageUrl
    },
    getLocaleName(name){
      if(this.$i18n.locale === 'en' && !name?.en) {
        // TODO надо подумать как в лог делать такие записи, чтобы отслеживать ошибки
        return '"sorry text not found"'
      }

      if(name[this.$i18n.locale]) {
        return name[this.$i18n.locale]
      } else {
        return name.en
      }
    },

    formatTime(time) {
      console.log('time: ', time);
      window.dayjs = this.$dayjs
      const loc = this.$i18n.locale
      // const loc = 'en'
      // const loc = 'ru'


      let min, sec, day, hour

      if(loc === 'en') {
        if(time.minutes == 1 && time.minutes) {
          min = '1 minute'
        } else {
          min = time.minutes + ' minutes'
        }
        if(time.seconds == 1 && time.minutes) {
          sec = '1 second'
        } else {
          sec = time.seconds + ' seconds'
        }
        if(time.days == 1 && time.days) {
          day = '1 day'
        } else {
          day = time.days + ' days'
        }
        if(time.hours == 1 && time.hours) {
          hour = '1 hour'
        } else {
          hour = time.hours + ' hours'
        }
      }

      function num2str(n, text_forms) {
        n = Math.abs(n) % 100
        var n1 = n % 10
        if (n > 10 && n < 20) {
          return text_forms[2]
        }
        if (n1 > 1 && n1 < 5) {
          return text_forms[1]
        }
        if (n1 == 1) {
          return text_forms[0]
        }
        return text_forms[2]
      }
      if(loc === 'ru') {
        if(time.minutes) min = time.minutes + num2str(time.minutes, [' минута', ' минуты', ' минут'])
        if(time.seconds) sec = time.seconds + num2str(time.seconds, [' секунда', ' секунды', ' секунд'])
        if(time.days)    day = time.days + num2str(time.days, [' день', ' дня', ' дней'])
        if(time.hours)   hour = time.hours + num2str(time.hours, [' час', ' часа', ' часов'])
      }

      if(time.seconds && !time.minutes) {
        return `${sec}`
      } else if(time.seconds && time.minutes) {
        return `${min}, ${sec}`
      } else if(!time.seconds && time.minutes) {
        return `${min}`
      } else if(time.hours) {
        return `${hour}`
      } else if(time.days) {
        return `${day}`
      } else {
        return 'ERROR: no correct time format'
      }
    },
    formatEffect(item) {
      const locale = this.$i18n.locale

      if(locale === 'en') {
        if(item.effectType === 'output') {
          return `increases production output by workshops by ${item.effectValue}%. Duration: ${this.formatTime(item.effectDuration)}`
        } else if(item.effectType === 'collectibles' || item.effectType  === 'revives') {
          return this.getLocaleName(item.gameDescription)
        } else if(item.effectName === 'movement-speed') {
          return `increases movespeed by ${item.effectValue}% on adventures`
        } else if(item.effectType === 'add-to-deposit') {
          const resourceSlug = item.slug.slice(15)
          const resourceName = this.resources[resourceSlug].name
          return `Add content to a deposit: ${item.amount} ${this.getLocaleName(resourceName)}`
        } else if(item.effectType === 'add-resource') {
          const resourceSlug = item.slug.slice(13)
          const resourceName = this.resources[resourceSlug].name
          return `Add resource: ${item.amount} ${this.getLocaleName(resourceName)}`
        }
        return item
      }

      if(locale === 'ru') {
        if(item.effectType === 'output') {
          return `Увеличивает производство мастерских на ${item.effectValue}%. Продолжительность: ${this.formatTime(item.effectDuration)}`
        } else if(item.effectType === 'collectibles' || item.effectType  === 'revives') {
          return this.getLocaleName(item.gameDescription)
        } else if(item.effectName === 'movement-speed') {
          return `Увеличивает скорость передвижения в приключениях на ${item.effectValue}%`
        } else if(item.effectType === 'add-to-deposit') {
          const resourceSlug = item.slug.slice(15)
          const resourceName = this.resources[resourceSlug].name
          return `Добавить к залежам: ${item.amount} ${this.getLocaleName(resourceName)}`
        } else if(item.effectType === 'add-resource') {
          const resourceSlug = item.slug.slice(13)
          const resourceName = this.resources[resourceSlug].name
          return `Добавить ресурс: ${item.amount} ${this.getLocaleName(resourceName)}`
        }
        return item
      }

    }
  }
}

</script>

<style>
  .name-cell {
    display: flex;
    align-items: center;
  }
  .name-cell img {
    margin-right: 6px;
  }
  /* .name-cell a:last-child {
    margin-left: 20px;
  } */
  .resources-cell {
    display: flex;
    align-items: center;
  }
  .resources-cell > div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  .resources-cell > div a:first-child {
    margin-right: 5px;
  }
  .add-resources-cell {
    background-image: url(/img/buffs/add-resources.png);
    width: 50px;
    height: 50px;
    background-size: contain;
    background-position: center;
  }
  .add-resources-cell img {
    position: relative;
    top: 22px;
    right: -16px;
    width: 24px;
  }
  .add-resources-cell-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
