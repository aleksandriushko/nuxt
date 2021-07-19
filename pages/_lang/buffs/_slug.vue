<template>
  <div class="Content">
    <v-breadcrumbs :items="breadcrumps" divider="-"/>
    <div v-if="buffLoaded" class="container no-transition">
      <h1>{{ buff.name.en }}</h1>
      <img :src="buff.imageUrl" alt="" v-if="buff.imageUrl">

      <v-row>
        <v-col cols="12">
          {{ buff.description.en }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-card max-width="344" outlined>
            <v-list-item class="grow">
                Effect
              <v-list-item-content>
                <v-list-item-title>
                  <div> <strong>{{ effectFormat }}</strong></div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item class="grow" v-if="buff.effectType !== 'revives'"> -->
            <v-list-item class="grow" v-if="buff.effectDuration">
                Effect Duration:
              <v-list-item-content>
                <v-list-item-title>
                  <!-- вынести логику в компьютед -->
                  <template v-if="buff.effectDuration.seconds && !buff.effectDuration.minutes">
                    {{ buff.effectDuration.seconds }} seconds
                  </template>
                  <template v-else-if="buff.effectDuration.seconds && buff.effectDuration.minutes">
                    {{ buff.effectDuration.minutes }} minutes, {{ buff.effectDuration.seconds }} seconds
                  </template>
                  <template v-else-if="buff.effectDuration.hours">
                    {{ buff.effectDuration.hours }} hours
                  </template>
                  <template v-else-if="buff.effectDuration.days">
                    {{ buff.effectDuration.days }} days
                  </template>
                  <template v-else>
                    {{ buff.effectDuration.minutes }} minutes
                  </template>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card max-width="344" outlined>
            <v-list-item class="grow">
                Type:
              <v-list-item-content>
                <v-list-item-title>
                  <div> {{ buff.type }}</div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="grow">
                Target:
              <v-list-item-content>
                <v-list-item-title>
                  {{ buff.target }}
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
          <v-card-text v-for="(origin, idx) in buff.origins" :key="'building-key' + idx">
            <img :src="getBuildingIconUrl(origin.slugBuilding)" alt="">
            <img :src="origin.buttonIconUrl" alt="">
            Production Time: {{ origin.productionTime.minutes }} minutes
            for
            <div v-for="resource in origin.consumptionResources" :key="resource.slug">
              <img :src="getResourceIconUrl(resource.slug)" alt="">
              amount {{ resource.amount }}
            </div>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
<!-- typeOrigin: 'building',
            typeProduction: 'buff', // если например мгновенно активируется
            slugBuilding: 'provision-house', // переделать в slugBuilding
            productionTime: {
              seconds: 0,
              minutes: 1,
              hours: 0,
              days: 0
            },
            amount: 1,
            buttonIconUrl: '/img/buffs/fish-platter.png',
            buttonDescription: {
              en: 'button description en',
              ru: 'button description ru',
            },
            consumptionResources: {
              '0': {
                slug: 'fish',
                amount: 10,
              },
            }, -->
      <!-- <div @click="test">test2</div> -->
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  head() {
    return { title: this.$t('buffs.title') }
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
          text: 'Buffs',
          disabled: false,
          href: '/buffs',
        },
        {
          text: '',
          disabled: true,
        },
      ],
      tab: null,
      items: [
        { tab: 'One', content: 'Tab 1 Content' },
        { tab: 'Origins', content: 'Tab 2 Content' },
        { tab: 'Some items', content: 'Tab 3 Content' },
      ],
      buff: {},
      buffLoaded: false,

      buildings: [],
      resources: [],
    }
  },
  computed: {
    effectFormat() {
      return `increace ${this.buff.effectType} on ${this.buff.effectValue}`
    }
  },
  async created() {
    this.title = this.$route.params.slug
    this.buff = await this.$store.dispatch('buffs/get', this.$route.params.slug)
    this.breadcrumps[2].text = this.buff.name.en

    // логика отоброжения здания для получения бафа, по идеи отоброжать(подгружать) надо, только если кликнули на таб
    for(const idx in this.buff.origins) {
      if(this.buff.origins[idx].typeOrigin === 'building') {
        const building = await this.$store.dispatch('buildings/get', this.buff.origins[idx].slugBuilding)
        this.buildings.push(building)
        console.log('this.buildings: ', this.buildings);
      }
    }

    // логика отоброжения ресурсов, плохая идея два запроса на ресурсы отправлять, надо бы map запрашивать
    for(const idx in this.buff.origins) {
      if(this.buff.origins[idx].consumptionResources.length) {
        for(const item of this.buff.origins[idx].consumptionResources) {
          const resource = await this.$store.dispatch('resources/get', item.slug)
          this.resources.push(resource)
          console.log('this.resources: ', this.resources);
        }
      }
    }

    this.buffLoaded = true
  },
  methods: {
    test() {
      console.log(this.slug)
    },
    getBuildingIconUrl(slug) {
      const building = this.buildings.find(b => b.slug === slug)
      return building.images.icon.url
    },
    getResourceIconUrl(slug) {
      const resource = this.resources.find(r => r.slug === slug)
      return resource.imageUrl
    },

  }
}
</script>

<style scoped>
  .no-transition .v-window-item {
    transition: none!important;
  }
</style>
