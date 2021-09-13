<template>
  <div class="Content">
    <v-breadcrumbs :items="breadcrumps" divider="-"/>
    <div v-if="unitLoaded" class="container no-transition">
      <h1>{{ unit.name.en }}</h1>
      <img :src="unit.imageUrl" alt="" v-if="unit.imageUrl">

      <v-row>
        <v-col cols="12">
          {{ unit.description.en }}
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
            <!-- <v-list-item class="grow" v-if="unit.effectType !== 'revives'"> -->
            <v-list-item class="grow" v-if="unit.effectDuration">
                Effect Duration:
              <v-list-item-content>
                <v-list-item-title>
                  <!-- вынести логику в компьютед -->
                  <template v-if="unit.effectDuration.seconds && !unit.effectDuration.minutes">
                    {{ unit.effectDuration.seconds }} seconds
                  </template>
                  <template v-else-if="unit.effectDuration.seconds && unit.effectDuration.minutes">
                    {{ unit.effectDuration.minutes }} minutes, {{ unit.effectDuration.seconds }} seconds
                  </template>
                  <template v-else-if="unit.effectDuration.hours">
                    {{ unit.effectDuration.hours }} hours
                  </template>
                  <template v-else-if="unit.effectDuration.days">
                    {{ unit.effectDuration.days }} days
                  </template>
                  <template v-else>
                    {{ unit.effectDuration.minutes }} minutes
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
                  <div> {{ unit.type }}</div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="grow">
                Target:
              <v-list-item-content>
                <v-list-item-title>
                  {{ unit.target }}
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
          <v-card-text v-for="(origin, idx) in unit.origins" :key="'building-key' + idx">
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
            typeProduction: 'unit', // если например мгновенно активируется
            slugBuilding: 'provision-house', // переделать в slugBuilding
            productionTime: {
              seconds: 0,
              minutes: 1,
              hours: 0,
              days: 0
            },
            amount: 1,
            buttonIconUrl: '/img/units/fish-platter.png',
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
    return { title: this.$t('units.title') }
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
          text: 'Units',
          disabled: false,
          href: '/units',
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
      unit: {},
      unitLoaded: false,

      buildings: [],
      resources: [],
    }
  },
  computed: {
    effectFormat() {
      return `increace ${this.unit.effectType} on ${this.unit.effectValue}`
    }
  },
  async created() {
    this.title = this.$route.params.slug
    this.unit = await this.$store.dispatch('units/get', this.$route.params.slug)
    this.breadcrumps[2].text = this.unit.name.en

    // логика отоброжения здания для получения бафа, по идеи отоброжать(подгружать) надо, только если кликнули на таб
    for(const idx in this.unit.origins) {
      if(this.unit.origins[idx].typeOrigin === 'building') {
        const building = await this.$store.dispatch('buildings/get', this.unit.origins[idx].slugBuilding)
        this.buildings.push(building)
        console.log('this.buildings: ', this.buildings);
      }
    }

    // логика отоброжения ресурсов, плохая идея два запроса на ресурсы отправлять, надо бы map запрашивать
    for(const idx in this.unit.origins) {
      if(this.unit.origins[idx].consumptionResources.length) {
        for(const item of this.unit.origins[idx].consumptionResources) {
          const resource = await this.$store.dispatch('resources/get', item.slug)
          this.resources.push(resource)
          console.log('this.resources: ', this.resources);
        }
      }
    }

    this.unitLoaded = true
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
