<template>
  <div v-if="dataLoaded">
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
  </div>
</template>

<script>
export default {
  name: "specialistMarshal",
  data() {
    return {
      resourceCoins: null,
      dataLoaded: false,
    }
  },
  async created() {
    this.resourceCoins = await this.$store.dispatch('resources/get', 'coins')
    this.dataLoaded = true
  }
}
</script>
