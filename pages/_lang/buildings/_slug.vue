<template>
  <div>
    <template v-if="buildingLoaded">
      <div class="container no-transition">
        <v-breadcrumbs :items="breadcrumps" divider="-"/>

        <!-- <tavern v-if="building.slug === 'tavern'" :building="building" /> -->
        <!-- <tavern v-if="building.slug === 'tavern'" :contentTavern="contentTavern" /> -->

        <!-- <provisionHouse v-else-if="building.slug === 'provision-house'" :building="building" :resources="resources" /> -->

        <!-- <storehouse v-else-if="building.slug === 'storehouse'" :building="building" :resources="resources" /> -->

        <template>
          <v-row v-if="showTab[0]">
            <v-col cols="1" sm="1" md="1">
              <img :src="building.imageIconUrl" alt="">
            </v-col>
            <v-col cols="8" sm="8" md="8">
              <h1>{{ building.name[$i18n.locale] }}</h1>
            </v-col>
            <v-col cols="3" sm="3" md="3">
              <h1>{{ $t('building.size') }}: {{ building.size.x }} x {{ building.size.y }}</h1>
            </v-col>
          </v-row>
          <v-row v-if="showTab[0]">
            <v-col cols="8">
              <div v-interpolation v-html="parseDescription"></div>
              <div class="game-description">{{ building.gameDescription[$i18n.locale] }}</div>
            </v-col>
            <v-col cols="4" v-if="checkBuildingType(['workshop', 'deposit', 'mine'])">
              <v-card max-width="344" outlined>
                <v-list-item class="grow">
                    {{ $t('building.production') }}: {{ building.productionResource.amount }} x <img :src="resources[building.productionResource.slug].imageUrl" alt="" class="resource-icon">
                  <v-list-item-content>
                    <v-list-item-title>
                      <div> <strong>{{ resources[building.productionResource.slug].name[$i18n.locale] }}</strong></div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="grow" v-for="(resource, idx) in building.consumptionResources" :key="'consumption=resources' + idx">
                    {{ $t('building.consumption') }}: {{ resource.amount }} x <img :src="resources[resource.slug].imageUrl" alt="" class="resource-icon">
                  <v-list-item-content>
                    <v-list-item-title>
                      <div><strong>{{ resources[resource.slug].name[$i18n.locale] }}</strong></div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="grow">
                    {{ $t('building.timeProduction') }}:
                  <v-list-item-content>
                    <v-list-item-title>
                      <div> {{ formatTime(building.productionResource.time) }}</div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

              </v-card>
            </v-col>
          </v-row>

          <v-row v-if="showTab[0]">
            <v-col cols="12">
              <contentTavern v-if="building.slug === 'tavern'" :resourceCoins="resources.coins" />
              <contentProvisionHouse v-else-if="building.slug === 'provision-house'" :building="building" :resources="resources" />
            </v-col>
          </v-row>

          <v-tabs v-model="tab">
            <v-tab v-for="item in tabItems" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card-text>1</v-card-text>
            </v-tab-item>
            <v-tab-item v-if="showTab[2]">
              <img v-for="url in building.imageUrls" :key="url" alt="" :src="url">
            </v-tab-item>

            <!-- MOVE -->
            <v-tab-item v-if="building.canMove && showTab[3]">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        {{ $t('text.level') }}
                      </th>
                      <th class="text-left">
                        {{ $t('text.resources') }}
                      </th>
                      <th class="text-left">
                        {{ $t('text.gemsCost') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in building.moveCost" :key="idx">
                      <td>{{ idx + 1 }}</td>
                      <td>
                        <div class="resources-cell">
                          <div v-for="(resource, index) in item.resources" :key="'move-res-key' + index">
                            <NuxtLink :to="`/resources/${resource.slug}`"><img :src="resources[resource.slug].imageUrl" alt=""></NuxtLink>
                            {{ resource.amount }}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="resources-cell">
                          <NuxtLink :to="`/resources/gems`"><img :src="resources.gems.imageUrl" alt=""></NuxtLink>
                          {{ item.premiumCost }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>
            <v-tab-item v-else-if="building.storageCapacities && showTab[3]">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        {{ $t('text.level') }}
                      </th>
                      <th class="text-left">
                        {{ $t('building.storehouse.storageCapacities') }}
                      </th>
                      <th class="text-left">
                        {{ $t('building.storehouse.totalStorageCapacities') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(val, idx) in building.storageCapacities" :key="idx">
                      <td>{{ idx + 1 }}</td>
                      <td>{{ val }}</td>
                      <td>{{ totalStorageCapacities[idx] }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>

            <v-tab-item v-else-if="(additionalTab === 'wheatfield' || additionalTab === 'deposit') && showTab[3]">
              <div>
                {{ $t('text.deposit') }}
                <NuxtLink :to="`/resources/${building.deposit.resourceSlug}`"><img :src="resources[building.deposit.resourceSlug].imageUrl" alt=""></NuxtLink>
              </div>
              <div>{{ $t('text.amount') }} {{ building.deposit.amount }}</div>
            </v-tab-item>





            <v-tab-item v-if="showTab[4]">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        {{ $t('text.level') }}
                      </th>
                      <th class="text-left">
                        {{ $t('text.resources') }}
                      </th>
                      <th class="text-left">
                        {{ $t('text.gemsCost') }}
                      </th>
                      <th class="text-left">
                        {{ $t('building.constructionTime') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in building.upgradeCost" :key="idx">
                      <td>{{ idx + 1 }}</td>
                      <td>
                        <div class="resources-cell">
                          <div v-for="(resource, index) in item.resources" :key="'move-res-key' + index">
                            <NuxtLink :to="`/resources/${resource.slug}`"><img :src="resources[resource.slug].imageUrl" alt=""></NuxtLink>
                            {{ resource.amount }}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="resources-cell">
                          <NuxtLink :to="`/resources/gems`"><img :src="resources.gems.imageUrl" alt=""></NuxtLink>
                          {{ item.premiumCost }}
                        </div>
                      </td>
                      <td>
                        {{ formatTime(item.time) }}
                      </td>
                    </tr>

                    <!-- <tr v-for="(val, prop, idx ) in building.upgradeCost" :key="idx">
                      <td>{{ idx + 1 }}</td>
                      <td>
                        <img :src="getResourceIconUrl(val.resource1.slug)" alt="">{{ val.resource1.amount }}
                        <template v-if="val.resource2">
                          <img :src="getResourceIconUrl(val.resource2.slug)" alt="">{{ val.resource2.amount }}
                        </template>
                      </td>
                      <td><img :src="getResourceIconUrl('gems')" alt="">{{ val.premium.amount }}</td>
                      <td> -->
                        <!-- <template v-if="val.time.seconds && !val.time.minutes">
                          {{ val.time.seconds }} seconds
                        </template>
                        <template v-else-if="val.time.seconds && val.time.minutes">
                          {{ val.time.minutes }} minutes, {{ val.time.seconds }} seconds
                        </template>
                        <template v-else-if="val.time.hours">
                          {{ val.time.hours }} hours
                        </template>
                        <template v-else-if="val.time.days">
                          {{ val.time.days }} days
                        </template> -->
                      <!-- </td> -->
                    <!-- </tr> -->
                  </tbody>
                </template>
              </v-simple-table>
              <a href="/">'See upgrade table'</a>
            </v-tab-item>


            <v-tab-item v-if="additionalTab === 'population' && showTab[3]">

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        {{ $t('text.level') }}
                      </th>
                      <th class="text-left">
                        {{ $t('building.population') }}
                      </th>
                      <th class="text-left">
                        {{ $t('building.totalPopulation') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(val, idx) in building.population" :key="idx">
                      <td>{{ idx + 1 }}</td>
                      <td>
                        <div class="population-wrap">
                          <NuxtLink :to="`/resources/settlers`"><img :src="resources.settlers.imageUrl" alt=""></NuxtLink>
                          {{ idx === 0 ? val : `+ ${val}` }}
                        </div>
                      </td>
                      <td>
                        <div class="population-wrap">
                          <NuxtLink :to="`/resources/settlers`"><img :src="resources.settlers.imageUrl" alt=""></NuxtLink>{{ totalPopulation[idx] }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>

            <v-tab-item v-if="showTab[5]">
                <v-list-item class="grow">
                  {{ $t('building.needPatent') }}:
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ building.needPatent ? $t('text.yes') : $t('text.no') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item class="grow">
                  {{ $t('building.canMove') }}:
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ building.canMove ? $t('text.yes') : $t('text.no') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item class="grow" v-if="building.requiredLevel">
                  {{ $t('building.requiredLevel') }}:
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ building.requiredLevel }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item class="grow">
                  {{ $t('building.placedOnWater') }}:
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ building.placedOnWater ? $t('text.yes') : $t('text.no') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>


                <v-list-item v-if="building.returnToStarMenu" class="grow">
                  {{ $t('building.returnToStarMenu') }}:
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ building.returnToStarMenu ? $t('text.yes') : $t('text.no') }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-else class="grow">
                  {{ $t('building.destroyReturnResources') }}:
                  <v-list-item-content v-for="(resource, idx) in building.destroyReturnResources" :key="'buff-key-' + idx">
                    <v-list-item-title>
                      <div>
                        <strong>
                          {{ resource.amount }} x
                          <NuxtLink :to="`/resources/${resource.slug}`"><img :src="resources[resource.slug].imageUrl" alt=""></NuxtLink>
                          {{ resources[resource.slug].name[$i18n.locale] }}
                        </strong>
                      </div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-tab-item>
          </v-tabs-items>
        </template>
      </div>
    </template>

    <div @click="test">test</div>
  </div>
    <!-- <div class="size-matrix-wrap">
      <div v-for="valueX in 4" :key="valueX" class="size-matrix-line">
        <div v-for="valueY in 6" :key="valueY">
          <div v-if="building.sizeMatrix[`x${valueX}`][`y${valueY}`]" class="size-item"
            :class="{ 'size-item-active': building.sizeMatrix[`x${valueX}`][`y${valueY}`] }"
          />
        </div>
      </div>
    </div> -->
</template>

<script>
import firebase from 'firebase';
import contentTavern from '@/components/content/buildings/tavern';
// import provisionHouse from '@/components/pages/buildings/provisionHouse';
import contentProvisionHouse from '@/components/content/buildings/provisionHouse';
import storehouse from '@/components/pages/buildings/storehouse';

export default {
  components: {
    contentTavern,
    contentProvisionHouse,
    // tavern,
    // provisionHouse,
    storehouse
  },
  head() {
    return { title: this.$t('buildings.title') }
  },
  data() {
    return {
      showTab: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      },
      breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Buildings',
          disabled: false,
          href: '/buildings',
        },
        {
          text: '',
          disabled: true,
        },
      ],
      tab: null,
      tabItems: [
        { tab: this.$t('building.tabComments'), content: 'Tab 1 Content' },
        { tab: this.$t('building.tabImages'), content: 'Tab 2 Content' },
        { tab: this.$t('building.tabMoveCost'), content: 'Tab 3 Content' },
        { tab: this.$t('building.tabBuildUpgrade'), content: 'Tab 4 Content' },
        { tab: this.$t('building.tabInformation'), content: 'Tab 5 Content' },
      ],
      additionalTab: '',
      building: {},
      consumptionResource1: {},
      buildingLoaded: false,
      resources: {},

      totalStorageCapacities: [],
      totalPopulation: [],

    }
  },
  computed: {
    parseDescription() {
      let text = this.building.description.en
      return this.recuriveText(text)
    }
  },
  async created() {

    // this.showTab[0] = false // main
    // this.showTab[1] = false // main
    // this.showTab[2] = false // images
    // this.showTab[3] = false // build
    // this.showTab[4] = false // move
    // this.showTab[5] = false // spec

    this.title = this.$route.params.slug
    this.building = await this.$store.dispatch('buildings/get', this.$route.params.slug)
    console.log('this.building 1: ', this.building);
    this.breadcrumps[2].text = this.building.name.en

    this.resources = await this.$store.dispatch('resources/getAll')
    console.log('this.resources: ', this.resources);


    for(let i = 0; i < this.building.types.length; i++) {
      if(this.building.types[i] === "storehouse") {
        this.tabItems[2].tab = this.$t('tabs.storageCapacities')

        let amount = 0
        this.building.storageCapacities.forEach(element => {
          this.totalStorageCapacities.push(amount += element)
        })
        break
      }
      if(this.building.types[i] === "wheatfield") {
        this.tabItems[2].tab = this.$t('tabs.deposit')
        this.additionalTab = 'wheatfield'
        break
      }
      if(this.building.types[i] === "deposit") {
        this.tabItems[2].tab = this.$t('tabs.deposit')
        this.additionalTab = 'deposit'
        break
      }
      if(this.building.types[i] === "population") {
        this.tabItems.splice(4, 0, { tab: "Population" });
        this.additionalTab = 'population'
        console.log('this.additionalTab: ', this.additionalTab);

        let amount = 0
        this.building.population.forEach(element => {
          this.totalPopulation.push(amount += element)
        })
        break
      }
    }

    for(let i = 0; i < this.building.types.length; i++) {
      if(this.building.types[i] === "mine") {
        this.tabItems.splice(2, 1)
        break
      }
    }

    this.buildingLoaded = true
  },
  methods: {
    checkBuildingType(checkTypes) {
      for(const element of checkTypes) {
        for(const prop in this.building.types) {
          if(this.building.types[prop] === element) return true
        }
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
    recuriveText(text, startPoint = 0) {
      console.log('startPoint: ', startPoint);
      // return text
      let res
      let getObjPath = (object, keys) => keys.split('.').reduce((o, k) => (o || {})[k], object)
      let newText = text
      // console.log('text: ', text);
      // console.log('startPoint: ', startPoint);
      let codeStart = text.indexOf('[', startPoint)
      if(codeStart == -1) {
        return text
      }
      let codeEnd = text.indexOf(']')
      let code = text.slice(codeStart+1, codeEnd)
      let delimiter = code.indexOf('=')
      let type = code.slice(0, delimiter)
      let value = code.slice(delimiter+1)
      if(type === 'data') {
        let textValue = getObjPath(this.building, value)
        if(textValue === 'time') {
          text = text.replace(`[${code}]`, 'FORMAT_TIME')
        } else {
          text = text.replace(`[${code}]`, textValue)
        }
      } else if(type === 'link') {
          let textValue = `<a href="/${value}">${value}</a>`
          text = text.replace(`[${code}]`, textValue)
      } else if(type === 'resource') {
          // let imgUrl = this.resources[value].image.url
          let imgUrl = this.getResourceIconUrl(value)
          // let imgUrl = '/'
          let textValue = `<a href="/resources/${value}" class="resource-link"><div class="resource-link-img-wrap"><img src="${imgUrl}" alt="${value}" /></div><span>${value}</span></a>`
          text = text.replace(`[${code}]`, textValue)
      } else if(type === 'building') {
          // let imgUrl = this.resources[value].image.url
          // let imgUrl = this.getResourceIconUrl(value)
          let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/settlersportal.appspot.com/o/img%2Fbuildings%2Fpinewood-cutter-icon?alt=media&token=f9ee564a-071d-4283-8813-4590e3622ad7'
          let textValue = `<a href="/resources/${value}" class="building-link"><div class="building-link-img-wrap"><img src="${imgUrl}" alt="${value}" /></div><span>${value}</span></a>`
          text = text.replace(`[${code}]`, textValue)
      }

      if(newText != text) {
        return this.recuriveText(text, codeStart)
      }
      return text
    },
    getResourceIconUrl(slug) {
      // console.log('getResourceIconUrl: ', this.resources['coins'].image.url);
      return this.resources[slug].imageUrl
    },
    async test() {
      // console.log('aaa')
    },
  }
}
</script>

<style >
  .no-transition .v-window-item {
    transition: none!important;
  }
  .resource-icon {
    width: 24px;
  }
  /* .size-matrix-wrap {
    transform: rotate(-30deg);
    width: 80px;
  } */
  .size-matrix-line {
    display: flex;
  }
  .size-item {
    cursor: pointer;
    background: #cccccc;
    border: 1px solid #6d6d6d;
    width: 10px;
    height: 10px;
  }
  .size-item:hover {
    background: #ababab;
  }
  .size-item-active {
    background-color: #4aad49;
  }
  a.resource-link, a.building-link {
    display: inline-flex;
    position: relative;
    top: 1px;
    text-decoration: none;
    color: green;
  }
  a.resource-link img, a.building-link img {
    height: 15px;
  }
  .resource-link-img-wrap, .building-link-img-wrap {
    width: 20px;
    height: 20px;
    border: 1px solid #0080004f;
    border-radius: 7px;
    /* padding: 1px; */
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    position: relative;
    top: 2px;
  }
  .building-link-img-wrap {
    border: 1px solid #bc7a104f;
  }
  a.building-link {
    color: #bc7a10;
  }
  .game-description {
    color: #6d6d6d;
    font-style: italic;
  }
  .population-wrap {
    display: flex;
    align-items: center;
  }
  .population-wrap img {
    margin-right: 6px;
  }
</style>
