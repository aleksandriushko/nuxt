<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" editable>
              Name
            </v-stepper-step>
            <v-divider />

            <v-stepper-step :complete="e1 > 2" step="2" editable>
              Files
            </v-stepper-step>
            <v-divider />

            <v-stepper-step :complete="e1 > 3" step="3" editable>
              Storage Capacities
            </v-stepper-step>
            <v-divider />

            <v-stepper-step :complete="e1 > 4" step="4" editable>
              Move Cost
            </v-stepper-step>
            <v-divider />

            <v-stepper-step step="5" editable>
              Build Cost
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
          <!-- <v-stepper-items v-if="dataLoaded"> -->
            <!-- STEP 1 -->
            <v-stepper-content step="1">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="building.slug" :label="$t('labels.slug')" />
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="building.name.en" :label="$t('labels.nameEn')" />
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="building.name.ru" :label="$t('labels.nameRu')" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2">
                      <v-checkbox v-model="building.needPatent" :label="$t('buildings.labelNeedPatent')" />
                    </v-col>
                    <v-col cols="2">
                      <v-checkbox v-model="building.canMove" :label="$t('buildings.labelCanMove')" />
                    </v-col>
                    <v-col cols="2">
                      <v-checkbox v-model="building.canTrade" :label="$t('buildings.labelСanTrade')" />
                    </v-col>
                    <v-col cols="3">
                      <v-text-field v-model="building.requiredLevel" :label="$t('buildings.labelRequiredLevel')" />
                    </v-col>
                    <v-col cols="3">
                      <v-text-field v-model="building.weight" :label="$t('buildings.labelWeight')" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="building.description.en" :label="$t('labels.descriptionEn')" rows="1" />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="building.description.ru" :label="$t('labels.descriptionEn')" rows="1" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="building.gameDescription.en" :label="$t('labels.gameDescriptionEn')" rows="1" />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="building.gameDescription.ru" :label="$t('labels.gameDescriptionRu')" rows="1" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field v-model="building.size.x" :label="$t('buildings.labelSizeX')" />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="building.size.y" :label="$t('buildings.labelSizeY')" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-select
                        v-model="currentOrigins"
                        :items="originList"
                        :menu-props="{ maxHeight: '400' }"
                        :label="$t('labels.originList')"
                        multiple
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="currentTypes"
                        :items="typeList"
                        :menu-props="{ maxHeight: '400' }"
                        :label="$t('labels.typeList')"
                        multiple
                      />
                    </v-col>
                  </v-row>

                </v-container>
              </v-card-text>
            </v-stepper-content>

            <!-- STEP 2 -->
            <v-stepper-content step="2">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="building.imageIconUrl" :label="$t('labels.imageIconUrl')" />
                    </v-col>

                    <v-col cols="12" v-for="idx in 7" :key="idx">
                      <v-text-field v-model="building.imageUrls[idx]" :label="`${$t('labels.imageUrl')} ${idx}`" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-stepper-content>

            <!-- STEP 3 -->
            <v-stepper-content step="3" >
              <h2>{{ $t('buildings.titleStorageCapacities') }}</h2>
              <v-row v-if="0">
                <v-col v-for="(storageCapacity, idx) in building.storageCapacities" :key="'storage-capacities-' + idx" cols="3">
                  <!-- {{ storageCapacity }} -->
                  <v-text-field v-model="building.storageCapacities[idx]" :label="$t('buildings.labelStorageCapacity') + ` ${+idx + 1}`" />
                </v-col>
              </v-row>


            </v-stepper-content>

            <!-- STEP 4 -->
            <v-stepper-content step="4">

              <h2>{{ $t('labels.productionResource') }}</h2>
              <v-row>
                <v-col cols="9">
                  <v-select
                    v-model="building.productionResource.slug"
                    :items="resourcesSelectList"
                    :menu-props="{ maxHeight: '400' }"
                    :label="$t('labels.productionResource')"
                  >
                    <template v-slot:item="data">
                      <img :src="resources[data.item].imageUrl" alt="">
                      {{ data.item }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="building.productionResource.amount" :label="$t('labels.amount')" />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3" sm="3" md="3">
                  <v-text-field v-model="building.productionTime.minutes" :label="$t('buildings.labelProductionResourceMinutes')" />
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <v-text-field v-model="building.productionTime.seconds" :label="$t('buildings.labelProductionResourceSeconds')" />
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="building.productionTime.hours" :label="$t('buildings.labelProductionResourceHours')" />
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="building.productionTime.days" :label="$t('buildings.labelProductionResourceDays')" />
                </v-col>
              </v-row>

              <h2>{{ $t('labels.consumptionResource') }}</h2>
              <v-row v-for="(consumptionResource, idx) in building.consumptionResourcies" :key="'storage-capacities-' + idx">
                <v-col cols="9">
                  <v-select
                    v-model="building.consumptionResourcies[idx].slug"
                    :items="resourcesSelectList"
                    :menu-props="{ maxHeight: '400' }"
                    :label="$t('labels.consumptionResource') + ` ${+idx + 1}`"
                  >
                    <template v-slot:item="data">
                      <img :src="resources[data.item].imageUrl" alt="">
                      {{ data.item }}
                    </template>
                  </v-select>
                  <!-- <v-text-field v-model="building.consumptionResourcies[idx].slug" :label="$t('labels.consumptionResource') + ` ${+idx + 1}`" /> -->
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="building.consumptionResourcies[idx].amount" :label="$t('labels.amount')" />
                </v-col>
              </v-row>

            </v-stepper-content>
            <!-- STEP 5 -->
            <v-stepper-content step="5">

              <div v-for="lvl in 7" :key="lvl">

                <h2>{{ $t('titles.upgradeCost') + ` ${lvl}` }}</h2>
                <v-row v-for="(resource, idx) in building.upgradeCost[lvl - 1].resources" :key="'resource' + idx">
                  <v-col cols="9">
                    <v-select
                      v-model="resource.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('labels.upgradeResource') + ` ${idx}`"
                    >
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="resource.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.upgradeCost[lvl - 1].time.minutes" :label="$t('buildings.labelProductionResourceMinutes')" />
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.upgradeCost[lvl - 1].time.seconds" :label="$t('buildings.labelProductionResourceSeconds')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.upgradeCost[lvl - 1].time.hours" :label="$t('buildings.labelProductionResourceHours')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.upgradeCost[lvl - 1].time.days" :label="$t('buildings.labelProductionResourceDays')" />
                  </v-col>
                </v-row>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDialog">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="test">
            test
          </v-btn>
          <v-btn v-if="dialogCurrent === 'Add'" color="blue darken-1" text @click="addBuilding">
            {{ $t('buttons.add') }}
          </v-btn>

          <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editBuilding">
            {{ $t('buttons.edit') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    resources: {
      type: Object,
      default: {}
    },
    editingMine: {
      type: Object,
      default: null
    },
    dialogCurrent: {
      type: String,
      default: 'Add'
    }
  },
  data() {
    return {
      originList: ['basic', 'intermediate'],
      currentOrigins: ['intermediate'],
      typeList: ['workshop', 'special', 'storehouse', 'mine'], // special mean's whan no have some type building evryware
      currentTypes: ['mine'],

      building: {
        slug: 'copper-mine',
        name: {
          en: 'Copper Mine',
          ru: 'Copper Mine',
        },
        description: {
          en: 'description en',
          ru: 'description ru',
        },
        gameDescription: {
          en: 'game description en',
          ru: 'game description ru',
        },
        origins: {},
        types: {},
        requiredLevel: 9,
        weight: 9,
        needPatent: true,
        canMove: false,
        canTrade: false,
        returnToStarMenu: false,

        imageIconUrl: `/img/buildings/image-icon.png`,
        imageUrls: {
          '0': `/img/buildings/image-1.png`,
          '1': `/img/buildings/image-2.png`,
          '2': `/img/buildings/image-3.png`,
          '3': `/img/buildings/image-4.png`,
          '4': `/img/buildings/image-5.png`,
          '5': `/img/buildings/image-6.png`,
          '6': `/img/buildings/image-7.png`,
        },
        size: {
          x: 2,
          y: 2,
        },
        destroyReturnResources: {
          '0': {
            slug: 'pinewood-planks',
            amount: 9999,
          },
        },
        productionResource: {
          slug: 'copper-ore',
          amount: 1,
        },
        productionTime: {
          seconds: 0,
          minutes: 3,
          hours: 0,
          days: 0,
        },
        consumptionResourcies: {
          '0': {
            slug: 'copper-deposit',
            amount: 1,
          }
        },
        upgradeCost: {
          '0': {
            resources: {
              '0': {
                slug: 'pinewood',
                amount: 30,
              },
              '1': {
                slug: 'stones',
                amount: 45,
              },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 3,
              hours: 0,
              days: 0,
            }
          },
          '1': {
            resources: {
              '0': {
                slug: 'pinewood',
                amount: 50,
              },
              // '0': {
              //   slug: 'hardwood-planks',
              //   amount: 120,
              // },
              // '1': {
              //   slug: 'marble',
              //   amount: 100,
              // },
            },
            premiumCost: 1,
            time: {
              seconds: 30,
              minutes: 2,
              hours: 0,
              days: 0,
            }
          },
          '2': {
            resources: {
              '0': {
                slug: 'pinewood',
                amount: 150,
              },
              // '0': {
              //   slug: 'hardwood-planks',
              //   amount: 300,
              // },
              // '1': {
              //   slug: 'marble',
              //   amount: 150,
              // },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 5,
              hours: 0,
              days: 0,
            }
          },
          '3': {
            resources: {
              '0': {
                slug: 'pinewood',
                amount: 300,
              },
              // '0': {
              //   slug: 'coins',
              //   amount: 500,
              // },
              // '1': {
              //   slug: 'marble',
              //   amount: 300,
              // },
            },
            premiumCost: 1,
            time: {
              seconds: 30,
              minutes: 7,
              hours: 0,
              days: 0,
            }
          },
          '4': {
            resources: {
              '0': {
                slug: 'pinewood',
                amount: 500,
              },
              // '0': {
              //   slug: 'exotic-wood-planks',
              //   amount: 500,
              // },
              // '1': {
              //   slug: 'granite',
              //   amount: 300,
              // },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 10,
              hours: 0,
              days: 0,
            }
          },
          '5': {
            resources: {
              '0': {
                slug: 'grout',
                amount: 50,
              },
              // '1': {
              //   slug: 'granite',
              //   amount: 500,
              // },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 10,
              hours: 0,
              days: 0,
            }
          },
          '6': {
            resources: {
              '0': {
                slug: 'advanced-tools',
                amount: 500,
              },
              // '1': {
              //   slug: 'oil',
              //   amount: 500,
              // },
            },
            premiumCost: 1,
            time: {
              seconds: 20,
              minutes: 13,
              hours: 0,
              days: 0,
            }
          },
        },
        // storageCapacities: {
        //   '0': 100,
        //   '1': 400,
        //   '2': 1000,
        //   '3': 1500,
        //   '4': 3000,
        //   '5': 6000,
        //   '6': 8000,
        // }
        // Props for storehouse

      },

      e1: 1,
      buildings: {},
      // dataLoaded: false,
    }
  },
  watch: {
    editingMine(building) {
      console.log('w building 11', building)
      if(building) {
        this.building = building

        this.currentTypes = []
        for(const prop in this.building.types) {
          this.currentTypes.push(this.building.types[prop])
        }
        this.currentOrigins = []
        for(const prop in this.building.origins) {
          this.currentOrigins.push(this.building.origins[prop])
        }

      } else {
        // this.dataLoaded = false
      }
    }
  },
  created() {
    // auto-nameing img
    for(let i = 1; i <= 7; i++) {
      this.building.imageUrls[i] = `/img/buildings/${this.building.slug}-${i}.png`
    }
    this.building.imageIconUrl = `/img/buildings/${this.building.slug}-icon.png`
  },
  computed: {
    resourcesSelectList() {
      let list = []
      for(let item in this.resources) {
        list.push(item)
      }
      return list
    },
  },
  methods: {
    test() {
      this.building
      console.log('this.building: ', this.building);
      // this.editingStorehouse
      // console.log('this.editingStorehouse: ', this.editingStorehouse);
    },
    getResourceIconUrl(slug) {
      this.resources
      console.log('this.resources: ', this.resources);
      return this.resources[slug].imageUrl
    },
    addBuilding() {
      this.currentTypes.forEach((el, idx) => {
        this.building.types[idx] = el
      })
      this.currentOrigins.forEach((el, idx) => {
        this.building.origins[idx] = el
      })

      this.$store.dispatch('buildings/add', this.building)
          .then(res => {
            if(res) {
              console.log('building added')
              // this.dialogSpec = false
              this.$emit('clicked', { type: 'add', building: this.building })
            }
          })
          .catch(error => {
            // this.dialogSpec = false
            this.$emit('clicked', { type: 'add', building: this.building })
            console.log('error: ', error);
          })
    },
    editBuilding() {
      this.currentTypes.forEach((el, idx) => {
        this.building.types[idx] = el
      })
      this.currentOrigins.forEach((el, idx) => {
        this.building.origins[idx] = el
      })
      this.$store.dispatch('buildings/edit', this.building)
        .then(res => {
          if(res) {
            this.$emit('clicked', { type: 'edit', building: this.building })
          }
        })
        .catch(error => {
          this.$emit('clicked', { type: 'edit', building: this.building })
          console.log('error: ', error);
        })
    },
    closeDialog() {
      this.$emit('clicked', { type: 'close', building: this.building })
    }
  }
}
</script>

<style scoped>

</style>
