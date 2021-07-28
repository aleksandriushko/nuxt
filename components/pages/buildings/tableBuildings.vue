<template>
  <div>
    <div v-for="(buildingType, idx) in renderBuldingList" :key="'buildings' + idx">
      <h2 class="buiiding-type-title">{{ buildingType }}</h2>
      <div class="buildings-wrap">
        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    Lvl
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <template v-for="lvl in 7">
                    <th class="text-center" :key="lvl">
                      {{ lvl }}
                    </th>
                  </template>
                  <!-- <th class="text-left">
                    Actions
                  </th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="building in basicBuildings" :key="building.slug">
                  <template v-if="buildingType === building.origins[0]">
                    <td>
                      <div class="text-center">
                        {{ building.requiredLevel }}
                      </div>
                    </td>
                    <td>
                      <div class="d-flex">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <NuxtLink :to="`/buildings/${building.slug}`" class="img-link"><img v-bind="attrs" v-on="on" :src="building.imageIconUrl" alt=""></NuxtLink>
                          </template>
                          <span>{{ building.name[$i18n.locale] }}</span>
                        </v-tooltip>
                      </div>
                    </td>
                    <template v-for="lvl in 7">
                      <td :key="'cost' + lvl" v-if="0">
                        <div v-if="building.moveCost && building.moveCost[lvl-1]">
                          <div class="d-flex justify-center cost-res-wrap">
                            <template v-for="(resource, index) in building.moveCost[lvl-1].resources">
                              <div :key="'cost-resource' + index" class="d-flex flex-column align-center">
                                  <v-tooltip top open-delay="300">
                                    <template v-slot:activator="{ on, attrs }">
                                      <NuxtLink :to="`/resources/${resource.slug}`">
                                        <img :src="resources[resource.slug].imageUrl" v-bind="attrs" v-on="on"  alt="">
                                      </NuxtLink>
                                    </template>
                                    <span>{{ resources[resource.slug].name[$i18n.locale] }}</span>
                                  </v-tooltip>
                                  <span>{{ resource.amount }}</span>
                              </div>
                            </template>
                          </div>
                        </div>
                        <div v-else class="d-flex justify-center">-</div>
                      </td>
                    </template>


                    <template v-for="lvl in 7">
                      <td :key="'cost' + lvl">
                        <div v-if="building.upgradeCost && building.upgradeCost[lvl-1]">
                          <div class="d-flex justify-center cost-res-wrap">
                            <template v-for="(resource, index) in building.upgradeCost[lvl-1].resources">
                              <div :key="'cost-resource' + index" class="d-flex flex-column align-center">
                                  <v-tooltip top open-delay="300">
                                    <template v-slot:activator="{ on, attrs }">
                                      <NuxtLink :to="`/resources/${resource.slug}`">
                                        <img :src="resources[resource.slug].imageUrl" v-bind="attrs" v-on="on"  alt="">
                                      </NuxtLink>
                                    </template>
                                    <span>{{ resources[resource.slug].name[$i18n.locale] }}</span>
                                  </v-tooltip>
                                  <span>{{ resource.amount }}</span>
                              </div>
                            </template>
                          </div>
                        </div>
                        <div v-else class="d-flex justify-center">-</div>
                      </td>
                    </template>

                    <!-- <td>
                      <div class="d-flex">
                        <v-btn small class="edit-building" @click="dialogEdit(building.slug)">
                          <v-icon color="primary">mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </td> -->
                  </template>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    buildings: {
      type: Object
    },
    resources: {
      type: Object
    }
  },
  data() {
    return {
      renderBuldingList: ['basic', 'intermediate', 'advanced', 'expert', 'elite'],

      dialogBuilding: true,
      editingBuilding: null,

      // buildingsLoaded: false,
    }
  },
  computed: {
    basicBuildings() {
      let arrBuildings = []
      for(let building in this.buildings) {
        arrBuildings.push(this.buildings[building])
      }
      return arrBuildings.sort((a, b) => a.weight - b.weight)
    }
  },
  async created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.img-link img {
  width: 44px;
}
.cost-res-wrap > div:first-child {
  margin-right: 10px;
}
.cost-res-wrap {
  padding: 4px 0;
}
</style>
