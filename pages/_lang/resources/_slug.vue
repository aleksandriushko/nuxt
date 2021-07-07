<template>
  <div class="Content">
    <v-breadcrumbs :items="breadcrumps" divider="-"/>
    <div v-if="buildingLoaded" class="container no-transition">
      <h1>{{ building.name.en }}</h1>
      <img :src="building.images.icon.url" alt="" v-if="building.images.icon.url">

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
        </v-tabs-items>

      <!-- <div @click="test">test2</div> -->
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  head() {
    return { title: this.$t('buildings.title') }
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
      items: [
        { tab: 'One', content: 'Tab 1 Content' },
        { tab: 'Images', content: 'Tab 2 Content' },
      ],
      building: {},
      buildingLoaded: false
    }
  },
  async created() {
    this.title = this.$route.params.slug
    this.building = await this.$store.dispatch('buildings/get', this.$route.params.slug)
    this.breadcrumps[2].text = this.building.name.en
    this.buildingLoaded = true
  },
  methods: {
    test() {
      console.log(this.slug)
    },
  }
}
</script>

<style scoped>
  .no-transition .v-window-item {
    transition: none!important;
  }
</style>
