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
  </div>
</template>

<script>
export default {
  name: "specialistGeologist",
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
