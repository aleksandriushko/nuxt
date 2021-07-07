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
      <v-col cols="12">
        <img :src="explorer.imageUrl" alt="" v-if="explorer.imageUrl">

        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Explorer
                </th>
                <th class="text-left">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 200</td>
              </tr>
              <tr>
                <td>Second</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 800</td>
              </tr>
              <tr>
                <td>Tre...</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 1600</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <img :src="geologist.imageUrl" alt="" v-if="geologist.imageUrl">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Explorer
                </th>
                <th class="text-left">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 200</td>
              </tr>
              <tr>
                <td>Second</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 800</td>
              </tr>
              <tr>
                <td>Tre...</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 1600</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <img :src="general.imageUrl" alt="" v-if="general.imageUrl">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Explorer
                </th>
                <th class="text-left">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 100</td>
              </tr>
              <tr>
                <td>Second</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 200</td>
              </tr>
              <tr>
                <td>Tre...</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 500</td>
              </tr>
              <tr>
                <td>IV</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 2000</td>
              </tr>
              <tr>
                <td>V</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 5000</td>
              </tr>
              <tr>
                <td>VI</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 20000</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>



    <v-row>
      <v-col cols="12">
        <img :src="marshal.imageUrl" alt="" v-if="marshal.imageUrl">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Marshal
                </th>
                <th class="text-left">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 50</td>
              </tr>
              <tr>
                <td>Second</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 100</td>
              </tr>
              <tr>
                <td>Tre...</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 150</td>
              </tr>
              <tr>
                <td>IV</td>
                <td><img :src="resourceCoins.imageUrl" alt=""> 1000</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-card max-width="344" outlined>

          <v-list-item class="grow">
              <!-- Production: {{ building.productionResource.amount }} x <img :src="production.imageUrl" alt="" class="resource-icon"> -->
            <v-list-item-content>
              <v-list-item-title>
                <!-- <div> <strong>{{ production.name.en }}</strong></div> -->
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="grow">
              <!-- Consumption: {{ building.consumptionResource1.amount }} x <img :src="consumptionResource1.imageUrl" alt="" class="resource-icon"> -->
            <v-list-item-content>
              <v-list-item-title>
                <!-- <div><strong>{{ consumptionResource1.name.en }}</strong> </div> -->
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card max-width="344" outlined>
          <v-list-item class="grow">
              Time Production:
            <v-list-item-content>
              <v-list-item-title>
                <!-- <div> {{ productionTime }}</div> -->
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>


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
      </v-tab-item>
      <!-- <v-tab-item>
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
      </v-tab-item> -->
      <!-- <v-tab-item>
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
      </v-tab-item> -->
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
          <v-list-item class="grow">
              <!-- Return Resources: {{ building.destroyReturnResources.resource1.amount }} x <img :src="destroyReturnResource1.imageUrl" alt="" class="resource-icon"> -->
            <v-list-item-content>
              <v-list-item-title>
                <!-- <div><strong>{{ destroyReturnResource1.name.en }}</strong> </div> -->
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-tab-item>
    </v-tabs-items>

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
export default {
  props: {
    building: {
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
      // building: {},
      production: {},
      consumptionResource1: {},

      resourceCoins: null, // передать через пропсы
      dataLoaded: false,

      explorer: null,
      geologist: null,
      general: null,
      marshal: null,
    }
  },
  async created() {
    this.resourceCoins = await this.$store.dispatch('resources/get', 'coins')
    this.explorer = await this.$store.dispatch('specialists/explorers/get', 'explorer')
    this.geologist = await this.$store.dispatch('specialists/geologists/get', "geologist")
    this.general = await this.$store.dispatch('specialists/generals/get', "general")
    this.marshal = await this.$store.dispatch('specialists/marshals/get', "marshal")

    this.dataLoaded = true
  },
  computed: {
    productionTime() {
      if(this.building.productionResource.time.horse || this.building.productionResource.time.day) {
        return ''
      } else {
        return this.building.productionResource.time.minutes + ':' + this.building.productionResource.time.seconds
      }
    },
    parseDescription() {
      let text = this.building.description.en
      return this.recuriveText(text)
    }
  },
  methods: {
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
</style>
