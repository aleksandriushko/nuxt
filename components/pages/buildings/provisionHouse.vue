<template>
  <div v-if="dataLoaded">
    <v-row>
      <v-col cols="1" sm="1" md="1">
        <img :src="building.images.icon.url" alt="" v-if="building.images.icon.url">
      </v-col>
      <v-col cols="10" sm="10" md="10">
        <h1>{{ building.name.en }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div v-interpolation v-html="parseDescription"></div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-card max-width="344" outlined>

        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card max-width="344" outlined>
          <v-list-item class="grow">
              Size:
            <v-list-item-content>
              <v-list-item-title>
                {{ building.size.x }} x {{ building.size.y }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-card>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="12">
        <h2>"Buffs"</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">'Lvl'</th>
                <th class="text-left">'Name'</th>
                <th class="text-left">'Resources'</th>
                <th class="text-left">'Time Prod'</th>
                <th class="text-left">'Effect'</th>
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
        <h2>"deposit"</h2>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">'Lvl'</th>
                <th class="text-left">'Name'</th>
                <th class="text-left">'Resources'</th>
                <th class="text-left">'Time Prod'</th>
                <th class="text-left">'Effect'</th>
                <th class="text-left">'Result'</th>
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
        <h2>"resources"</h2>

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">'Lvl'</th>
                <th class="text-left">'Name'</th>
                <th class="text-left">'Resources'</th>
                <th class="text-left">'Time Prod'</th>
                <th class="text-left">'Effect'</th>
                <th class="text-left">'Result'</th>
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
                  <div class="add-resources-cell">
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


    <v-tabs v-model="tab" >
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
          <v-card-text>1</v-card-text>
      </v-tab-item>
      <v-tab-item>
        <img :src="building.images.image1.url" alt="" v-if="building.images.image1.url">
        <img :src="building.images.image2.url" alt="" v-if="building.images.image2.url">
        <img :src="building.images.image3.url" alt="" v-if="building.images.image3.url">
        <img :src="building.images.image4.url" alt="" v-if="building.images.image4.url">
        <img :src="building.images.image5.url" alt="" v-if="building.images.image5.url">
        <img :src="building.images.image6.url" alt="" v-if="building.images.image6.url">
        <img :src="building.images.image7.url" alt="" v-if="building.images.image7.url">
      </v-tab-item>
      <v-tab-item>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Level
                </th>
                <th class="text-left">
                  Resources
                </th>
                <th class="text-left">
                  Gems cost
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(val, prop, idx ) in building.moveCost"
                :key="idx"
              >
                <td>{{ idx + 1 }}</td>
                <td>
                  <img :src="getResourceIconUrl(val.resource1.slug)" alt="">{{ val.resource1.amount }}
                  <img :src="getResourceIconUrl(val.resource2.slug)" alt="">{{ val.resource2.amount }}
                </td>
                <td><img :src="getResourceIconUrl('gems')" alt="">{{ val.premium.amount }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <v-tab-item>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Level
                </th>
                <th class="text-left">
                  Resources
                </th>
                <th class="text-left">
                  Gems cost
                </th>
                <th class="text-left">
                  Build time
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(val, prop, idx ) in building.upgradeCost" :key="idx">
                <td>{{ idx + 1 }}</td>
                <td>
                  <img :src="getResourceIconUrl(val.resource1.slug)" alt="">{{ val.resource1.amount }}
                  <template v-if="val.resource2">
                    <img :src="getResourceIconUrl(val.resource2.slug)" alt="">{{ val.resource2.amount }}
                  </template>
                </td>
                <td><img :src="getResourceIconUrl('gems')" alt="">{{ val.premium.amount }}</td>
                <td>
                  <template v-if="val.time.seconds && !val.time.minutes">
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
                  </template>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-tab-item>
      <v-tab-item>
        <v-list-item class="grow">
            Need patent:
          <v-list-item-content>
            <v-list-item-title>
              {{ building.needPatent ? 'yes' : 'no' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="grow">
            Can move:
          <v-list-item-content>
            <v-list-item-title>
              {{ building.canMove ? 'yes' : 'no' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="grow">
            Required Level:
          <v-list-item-content>
            <v-list-item-title>
              {{ building.requiredLevel }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-tab-item>
    </v-tabs-items>
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
      tab: null,
      items: [
        { tab: 'Comments', content: 'Tab 1 Content' },
        { tab: 'Images', content: 'Tab 2 Content' },
        { tab: 'Move Cost', content: 'Tab 3 Content' },
        { tab: 'Build & Upgrade', content: 'Tab 4 Content' },
        { tab: 'Information', content: 'Tab 5 Content' },
      ],

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
      // this.buff.
    },
    buffList() {
      return this.origins.filter(item => item.typeProduction === "buff").sort((a, b) => a.weight - b.weight)
      // weight
      // let arrBuildings = []
      // for(let building in this.buildings) {
      //   arrBuildings.push(this.buildings[building])
      // }
      // console.log('this.arrBuildings', arrBuildings
      // return arrBuildings.sort((a, b) => a.weight - b.weight)
    },
    depositList() {
      return this.origins.filter(item => item.typeProduction === "deposit").sort((a, b) => a.weight - b.weight)
    },
    resourcesList() {
      return this.origins.filter(item => item.typeProduction === "resources").sort((a, b) => a.weight - b.weight)
    },
    parseDescription() {
      let text = this.building.description.en
      return this.recuriveText(text)
    },
  },
  methods: {
    recuriveText(text, startPoint = 0) {
      // console.log('startPoint: ', startPoint);
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
      if(time.seconds && !time.minutes) {
        return `${time.seconds} 'seconds'`
      } else if(time.seconds && time.minutes) {
        return `${time.minutes} 'minutes', ${time.seconds} 'seconds'`
      } else if(!time.seconds && time.minutes) {
        return `${time.minutes} 'minutes'`
      } else if(time.hours) {
        return `${time.hours} 'hours'`
      } else if(time.days) {
        return `${time.days} 'days'`
      } else {
        return 'TODO: develop format time'
      }
    },
    formatEffect(item) {
      // let text = ''
      if(item.effectType === 'output') {
        return `"increases production output by workshops by ${item.effectValue}%. Duration: ${this.formatTime(item.effectDuration)}"`
      } else if(item.effectType === 'collectibles' || item.effectType  === 'revives') {
        return this.getLocaleName(item.gameDescription)
      } else if(item.effectName === 'movement-speed') {
        return `"increases movespeed by ${item.effectValue}% on adventures"`
      } else if(item.effectType === 'add-to-deposit') {
        const resourceSlug = item.slug.slice(15)
        const resourceName = this.resources[resourceSlug].name
        return `"Add content to a deposit: ${item.amount} ${this.getLocaleName(resourceName)}"`
      } else if(item.effectType === 'add-resource') {
        const resourceSlug = item.slug.slice(13)
        const resourceName = this.resources[resourceSlug].name
        return `"Add resource: ${item.amount} ${this.getLocaleName(resourceName)}"`
      }
      return item
    }
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
  .name-cell {
    display: flex;
    align-items: center;
    padding: 10px !important;
    height: auto !important;
  }
  .name-cell a:last-child {
    margin-left: 20px;
  }
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
  .add-resources img {
    position: relative;
    top: 23px;
    left: -1px;
    width: 24px;
  }
</style>
