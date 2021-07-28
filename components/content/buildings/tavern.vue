<template>
  <div>
    <div v-if="dataLoaded">
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>{{ $t('building.tavern.specialist') }}</th>
                  <th class="text-center">1</th>
                  <th class="text-center">2</th>
                  <th class="text-center">3</th>
                  <th class="text-center">4</th>
                  <th class="text-center">5</th>
                  <th class="text-center">6</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="spec-name-wrap">
                      <NuxtLink to="/specialists/geologists/geologist"><img :src="geologist.imageUrl" alt=""></NuxtLink>
                      <NuxtLink to="/specialists/geologists/geologist">{{ geologist.name[$i18n.locale] }}</NuxtLink>
                    </div>
                  </td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>100</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>300</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>600</div></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="spec-name-wrap">
                      <NuxtLink to="/specialists/explorers/explorer"><img :src="explorer.imageUrl" alt=""></NuxtLink>
                      <NuxtLink to="/specialists/explorers/explorer">{{ explorer.name[$i18n.locale] }}</NuxtLink>
                    </div>
                  </td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>200</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>800</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>1600</div></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="spec-name-wrap">
                      <NuxtLink to="/specialists/generals/general"><img :src="general.imageUrl" alt=""></NuxtLink>
                      <NuxtLink to="/specialists/generals/general">{{ general.name[$i18n.locale] }}</NuxtLink>
                    </div>
                  </td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>100</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>200</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>500</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>2000</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>5000</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>20000</div></td>
                </tr>
                <tr>
                  <td>
                    <div class="spec-name-wrap">
                      <NuxtLink to="/specialists/marshals/marshal"><img :src="marshal.imageUrl" alt=""></NuxtLink>
                      <NuxtLink to="/specialists/marshals/marshal">{{ marshal.name[$i18n.locale] }}</NuxtLink>
                    </div>
                  </td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>50</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>100</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>150</div></td>
                  <td><div class="spec-cost-wrap"><NuxtLink to="/resources/coins"><img :src="resourceCoins.imageUrl" alt=""></NuxtLink>1000</div></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </div>
    <v-progress-circular v-else indeterminate color="primary" />
  </div>
</template>

<script>
export default {
  props: {
    resourceCoins: {
      type: Object
    }
  },
  data() {
    return {
      explorer: null,
      geologist: null,
      general: null,
      marshal: null,
      dataLoaded: false,
    }
  },
  async created() {
    this.explorer = await this.$store.dispatch('specialists/explorers/get', 'explorer')
    this.geologist = await this.$store.dispatch('specialists/geologists/get', "geologist")
    this.general = await this.$store.dispatch('specialists/generals/get', "general")
    this.marshal = await this.$store.dispatch('specialists/marshals/get', "marshal")
    this.dataLoaded = true
  },
}
</script>

<style scoped>
.spec-name-wrap {
  display: flex;
  align-items: center;
}
.spec-name-wrap a img {
  width: 40px;
  margin-right: 7px;
}
.spec-cost-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.spec-cost-wrap img {
    margin-right: 6px;
}
</style>
