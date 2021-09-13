<template>
  <div>
    <template v-if="buildingLoaded">
      <v-row>
        <v-col cols="1" sm="1" md="1">
          <img :src="building.imageIconUrl" alt="">
        </v-col>
        <v-col cols="10" sm="10" md="10">
          <h1>{{ building.name.en }}</h1>
          <!-- LOCATION -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div v-interpolation v-html="parseDescription"></div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">

        </v-col>
        <v-col cols="6">
          <v-card max-width="344" outlined>
            <v-list-item class="grow">
              'Size:'
              <v-list-item-content>
                <v-list-item-title>
                  {{ building.size.x }} x {{ building.size.y }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
            <v-card-text>1</v-card-text>
        </v-tab-item>
        <v-tab-item>
          <img v-for="url in building.imageUrls" :key="url" :src="url" alt="">
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
                    Storage Capacities
                  </th>
                  <th class="text-left">
                    Total Storage Capacities
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
        <v-tab-item>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Level</th>
                  <th class="text-left">Resources</th>
                  <!-- <th class="text-left">Gems cost</th> -->
                  <th class="text-left">Build time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tableRow, idx) in building.upgradeCost" :key="idx">
                  <td>{{ idx + 1 }}</td>
                  <td>
                    <div class="resources-cell">
                      <div v-for="(resource, idx) in tableRow.resources" :key="'resource' + idx">
                        <NuxtLink :to="`/resources/${resource.slug}`"><img :src="resources[resource.slug].imageUrl" alt=""></NuxtLink>
                        {{ resource.amount }}
                      </div>
                    </div>
                  </td>
                  <!-- <td><img :src="getResourceIconUrl('gems')" alt="">{{ tableRow.premiumCost }}</td> -->
                  <td>{{ formatTime(tableRow.time) }}</td>
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
          <v-list-item class="grow">
            <div class="resources-cell">
              'Sestroy Return Resources:'
              <div v-for="(resource, idx) in building.destroyReturnResources" :key="'return-resource' + idx">
                <NuxtLink :to="`/resources/${resource.slug}`"><img :src="resources[resource.slug].imageUrl" alt=""></NuxtLink>
                {{ resource.amount }}
              </div>
            </div>
          </v-list-item>
        </v-tab-item>
      </v-tabs-items>
    </template>
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
        { tab: 'Storage Capacities', content: 'Tab 3 Content' },
        { tab: 'Build & Upgrade', content: 'Tab 4 Content' },
        { tab: 'Information', content: 'Tab 5 Content' },
      ],
      totalStorageCapacities: [],
      buildingLoaded: false,
    }
  },
  computed: {
    parseDescription() {
      return ''
      let text = this.building.description.en
      return this.recuriveText(text)
    }
  },
  async created() {
    let amount = 0
    this.building.storageCapacities.forEach(element => {
      this.totalStorageCapacities.push(amount += element)
    })

    this.buildingLoaded = true
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
</style>
