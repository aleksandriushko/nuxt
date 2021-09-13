<template>
  <div>
    <template v-if="dataLoaded">
      <div class="container no-transition">
        <v-breadcrumbs :items="breadcrumps" divider="-"/>

        <template>
          <v-row>
            <v-col cols="1" sm="1" md="1">
              <img :src="explorer.imageUrl" alt="" v-if="explorer.imageUrl">
            </v-col>
            <v-col cols="10" sm="10" md="10">
              <h1>{{ explorer.name.en }}</h1>
            </v-col>
          </v-row>

          <explorer v-if="explorer.slug === 'explorer'" />


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
                <!-- <v-list-item class="grow">
                    Time Production:
                  <v-list-item-content>
                    <v-list-item-title>
                      <div> {{ productionTime }}</div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->

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
                <v-card-text>commentsModule</v-card-text>
            </v-tab-item>
            <v-tab-item>
              2
            </v-tab-item>
            <v-tab-item>
              3
            </v-tab-item>
            <v-tab-item>
                <v-list-item class="grow">
                    Required Level:
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ explorer.requiredLevel }}
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
          <div v-if="explorer.sizeMatrix[`x${valueX}`][`y${valueY}`]" class="size-item"
            :class="{ 'size-item-active': explorer.sizeMatrix[`x${valueX}`][`y${valueY}`] }"
          />
        </div>
      </div>
    </div> -->
</template>

<script>
import firebase from 'firebase';
import explorer from '@/components/pages/specialists/explorers/explorer';

export default {
  components: {
    explorer
  },
  name: "pageSpecialistsExplorersExplorer",
  head() {
    return { title: this.$t('explorers.title') + ' nameExplorer' } // TODO fix secod part
  },
  data() {
    return {
      breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Specialists',
          disabled: false,
          href: '/specialists',
        },
        {
          text: 'Explorers',
          disabled: false,
          href: '/explorers',
        },
        {
          text: '',
          disabled: true,
        },
      ],
      tab: null,
      items: [
        { tab: 'Comments', content: 'Tab 1 Content' },
        { tab: 'Images', content: 'Tab 2 Content' },
        { tab: 'Move Cost', content: 'Tab 3 Content' },
        { tab: 'Build & Upgrade', content: 'Tab 4 Content' },
      ],
      explorer: {},
      production: {},
      consumptionResource1: {},
      dataLoaded: false,
      resources: {}
    }
  },
  computed: {
    productionTime() {
      if(this.explorer.productionResource.time.horse || this.explorer.productionResource.time.day) {
        return ''
      } else {
        return this.explorer.productionResource.time.minutes + ':' + this.explorer.productionResource.time.seconds
      }
    },
    parseDescription() {
      let text = this.explorer.description.en
      return this.recuriveText(text)
    }
  },
  async created() {
    this.title = this.$route.params.slug
    this.explorer = await this.$store.dispatch('specialists/explorers/get', this.$route.params.slug)
    console.log('this.explorer: ', this.explorer);
    this.breadcrumps[3].text = this.explorer.name.en
    // if(this.explorer.slug !== 'tavern') {
    //   this.production = await this.$store.dispatch('resources/get', this.explorer.productionResource.slug)
    //   this.consumptionResource1 = await this.$store.dispatch('resources/get', this.explorer.consumptionResource1.slug)
    // }
    // this.destroyReturnResource1 = await this.$store.dispatch('resources/get', this.explorer.destroyReturnResources.resource1.slug)
    // this.resources = await this.$store.dispatch('resources/getAll')
    // console.log('this.resources: ', this.resources);

    this.dataLoaded = true
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
        let textValue = getObjPath(this.explorer, value)
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
      } else if(type === 'explorer') {
          // let imgUrl = this.resources[value].image.url
          // let imgUrl = this.getResourceIconUrl(value)
          let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/settlersportal.appspot.com/o/img%2Fexplorers%2Fpinewood-cutter-icon?alt=media&token=f9ee564a-071d-4283-8813-4590e3622ad7'
          let textValue = `<a href="/resources/${value}" class="explorer-link"><div class="explorer-link-img-wrap"><img src="${imgUrl}" alt="${value}" /></div><span>${value}</span></a>`
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
  a.resource-link, a.explorer-link {
    display: inline-flex;
    position: relative;
    top: 1px;
    text-decoration: none;
    color: green;
  }
  a.resource-link img, a.explorer-link img {
    height: 15px;
  }
  .resource-link-img-wrap, .explorer-link-img-wrap {
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
  .explorer-link-img-wrap {
    border: 1px solid #bc7a104f;
  }
  a.explorer-link {
    color: #bc7a10;
  }
</style>
