<template>
  <div>
    <template v-if="dataLoaded">
      <div class="container no-transition">
        <v-breadcrumbs :items="breadcrumps" divider="-"/>

        <template>
          <v-row>
            <v-col cols="1" sm="1" md="1">
              <img :src="general.imageUrl" alt="" v-if="general.imageUrl">
            </v-col>
            <v-col cols="10" sm="10" md="10">
              <h1>{{ general.name.en }}</h1>
            </v-col>
          </v-row>



          <v-row>
            <v-col cols="12">
              <div v-interpolation v-html="parseDescription"></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-card outlined>


                <v-row>
                  <v-col cols="3">
                    <v-list-item class="grow">
                      <div class="sprite-generals icon-hp" />
                      <v-list-item-content>
                        <v-list-item-title>
                          <div>{{ general.characteristics.hitPoints }}</div>
                          <!-- <div>Hit points (HP) {{ general.characteristics.hitPoints }}</div> -->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="grow">
                      <div class="sprite-generals icon-dmg" />
                      <v-list-item-content>
                        <v-list-item-title>
                          <div>{{ general.characteristics.minAttackDamage }} - {{ general.characteristics.maxAttackDamage }}</div>
                          <!-- <div>Accuracy {{ general.characteristics.accuracy }}</div> -->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col cols="3">
                    <v-list-item class="grow">
                      <div class="sprite-generals icon-accuracy" />
                      <v-list-item-content>
                        <v-list-item-title>
                          <div>{{ general.characteristics.accuracy }}</div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="grow">
                      <div class="sprite-generals icon-initiative" />
                      <v-list-item-content>
                        <v-list-item-title>
                          <div>{{ general.characteristics.initiative }}</div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col cols="3">
                    <v-list-item class="grow">
                      <div class="sprite-generals icon-travel-time" />
                      <v-list-item-content>
                        <v-list-item-title>
                          <div>{{ general.characteristics.travelTime }}</div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="grow">
                      <div class="sprite-generals icon-recovery-time" />
                      <v-list-item-content>
                        <v-list-item-title>
                          <div>{{ general.characteristics.recoveryTime }}</div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col cols="3">
                    <v-list-item class="grow">
                      <div class="sprite-generals icon-unit-capacity" />
                      <v-list-item-content>
                        <v-list-item-title>
                          <div>{{ general.characteristics.unitCapacity }}</div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item class="grow">
                      <div class="sprite-generals icon-combat-duration" />
                      <v-list-item-content>
                        <v-list-item-title>
                          <div>{{ general.characteristics.combatRoundDuration }}</div>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>


        <!-- //
        //
        //
        // Unit Capacity
        // Attack Damage (AD)
        // Initiative
        // Recovery Time
        // Combat Round Duration
        -->
<!-- : {
          : 1,
          : 80,
          : 30,
          : 200,
          initiative: "Normal",
          : 240,
          : 20,
        }, -->


              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card max-width="344" outlined>
                <img :src="general.garrisonImageUrl" alt="">
                <!-- <v-list-item class="grow">
                  <div class="icon-hp" />
                  <v-list-item-content>
                    <v-list-item-title>
                      <div> {{ general.characteristics.hitPoints }}</div>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->

              </v-card>
            </v-col>
          </v-row>

          <general v-if="general.slug === 'general'" />

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
                      {{ general.requiredLevel }}
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
          <div v-if="general.sizeMatrix[`x${valueX}`][`y${valueY}`]" class="size-item"
            :class="{ 'size-item-active': general.sizeMatrix[`x${valueX}`][`y${valueY}`] }"
          />
        </div>
      </div>
    </div> -->
</template>

<script>
import firebase from 'firebase';
import general from '@/components/pages/specialists/generals/general';

export default {
  components: {
    general
  },
  name: "pageSpecialistsGeneralsGeneral",
  head() {
    return { title: this.$t('generals.title') + ' nameGeneral' } // TODO fix secod part
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
          text: 'Generals',
          disabled: false,
          href: '/generals',
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
      general: {},
      production: {},
      consumptionResource1: {},
      dataLoaded: false,
      resources: {}
    }
  },
  computed: {
    productionTime() {
      if(this.general.productionResource.time.horse || this.general.productionResource.time.day) {
        return ''
      } else {
        return this.general.productionResource.time.minutes + ':' + this.general.productionResource.time.seconds
      }
    },
    parseDescription() {
      let text = this.general.description.en
      return this.recuriveText(text)
    }
  },
  async created() {
    this.title = this.$route.params.slug
    this.general = await this.$store.dispatch('specialists/generals/get', this.$route.params.slug)
    console.log('this.general: ', this.general);
    this.breadcrumps[3].text = this.general.name.en
    // if(this.general.slug !== 'tavern') {
    //   this.production = await this.$store.dispatch('resources/get', this.general.productionResource.slug)
    //   this.consumptionResource1 = await this.$store.dispatch('resources/get', this.general.consumptionResource1.slug)
    // }
    // this.destroyReturnResource1 = await this.$store.dispatch('resources/get', this.general.destroyReturnResources.resource1.slug)
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
        let textValue = getObjPath(this.general, value)
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
      } else if(type === 'general') {
          // let imgUrl = this.resources[value].image.url
          // let imgUrl = this.getResourceIconUrl(value)
          let imgUrl = 'https://firebasestorage.googleapis.com/v0/b/settlersportal.appspot.com/o/img%2Fgenerals%2Fpinewood-cutter-icon?alt=media&token=f9ee564a-071d-4283-8813-4590e3622ad7'
          let textValue = `<a href="/resources/${value}" class="general-link"><div class="general-link-img-wrap"><img src="${imgUrl}" alt="${value}" /></div><span>${value}</span></a>`
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
  a.resource-link, a.general-link {
    display: inline-flex;
    position: relative;
    top: 1px;
    text-decoration: none;
    color: green;
  }
  a.resource-link img, a.general-link img {
    height: 15px;
  }
  .resource-link-img-wrap, .general-link-img-wrap {
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
  .general-link-img-wrap {
    border: 1px solid #bc7a104f;
  }
  a.general-link {
    color: #bc7a10;
  }
  .sprite-generals {
    width: 20px;
    height: 20px;
    background-image: url(/img/app/generals-sprite.png);
    background-size: 80px auto;
  }
  .icon-hp {
    background-position: 0 0;
  }
  .icon-accuracy {
    background-position: -40px 0;
  }
  .icon-travel-time {
    background-position: -20px 0;
  }
  .icon-unit-capacity {
    background-position: -60px 0;
  }
  .icon-dmg {
    background-position: 0 -20px;
  }
  .icon-initiative {
    background-position: -20px -20px;
  }
  .icon-recovery-time {
    background-position: -40px -20px;
  }
  .icon-combat-duration {
    background-position: -60px -20px;
  }

</style>
