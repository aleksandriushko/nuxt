<template>
  <div v-if="dataLoaded">
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
  </div>
</template>

<script>
export default {
  name: "specialistGeneral",
  data() {
    return {
      resourceCoins: null,
      dataLoaded: false,
    }
  },
  computed: {

  },
  async created() {
    this.resourceCoins = await this.$store.dispatch('resources/get', 'coins')
    console.log('this.resourceCoins: ', this.resourceCoins);
    this.dataLoaded = true
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
