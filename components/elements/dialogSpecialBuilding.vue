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
              Resources
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

          <v-stepper-items v-if="1">
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
                      <v-textare
                        :label="$t('labels.descriptionEn')"
                        rows="1"
                        v-model="building.description.en"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        :label="$t('labels.descriptionRu')"
                        rows="1"
                        v-model="building.description.ru"
                      />
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

                  <v-row>
                    <v-btn v-if="!showDestroyReturnResources1" color="primary" @click="addDestroyReturnResources1">
                      Add Destroy Return Resources
                    </v-btn>
                    <v-col v-if="showDestroyReturnResources1" cols="9" sm="9" md="9">
                      <v-select
                        v-model="building.destroyReturnResources.resource1.slug"
                        :items="resourcesSelectList"
                        :menu-props="{ maxHeight: '400' }"
                        :label="$t('buildings.labelDestroyReturnResources1Slug')"
                      >
                        <template v-slot:item="data">
                          <img :src="getResourceIconUrl(data.item)" alt="">
                          {{ data.item }}
                        </template>
                      </v-select>
                    </v-col>
                    <v-col v-if="showDestroyReturnResources1" cols="3" sm="3" md="3">
                      <v-text-field v-model="building.destroyReturnResources.resource1.amount" :label="$t('buildings.labelConsumptionResource1Amount')" />
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
                    <v-col cols="12" sm="12" md="12">
                      {{ $t('labels.imageIconUrl') }}
                      <v-text-field v-model="building.images.icon.url" :label="$t('labels.imageIconUrl')" />
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      {{ $t('labels.imageUrl') + ' 1' }}
                      <v-text-field v-model="building.images.image1.url" :label="$t('labels.imageUrl')" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-stepper-content>

            <!-- STEP 3 -->
            <v-stepper-content step="3">
            </v-stepper-content>
            <!-- STEP 4 -->
            <v-stepper-content step="4">
                <h2>Move resource</h2>
                <v-row>
                  <v-col cols="9" sm="9" md="9">
                    <v-select
                      v-model="building.moveCost[`level1`].resource1.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('buildings.labelMoveResource') + ` 1a`"
                    >
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.moveCost[`level1`].resource1.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="9" sm="9" md="9">
                    <v-select
                      v-model="building.moveCost[`level1`].resource2.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('buildings.labelMoveResource') + ` 1b`"
                    >
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.moveCost[`level1`].resource2.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="building.moveCost[`level1`].premium.amount" :label="$t('buildings.labelMoveResourcePremium')" />
                  </v-col>
                </v-row>
            </v-stepper-content>
            <!-- STEP 5 -->
            <v-stepper-content step="5">
              <h2>Build resource</h2>

              <v-row>
                <v-col cols="9" sm="9" md="9">
                  <v-select
                    v-model="building.upgradeCost[`level1`].resource1.slug"
                    :items="resourcesSelectList"
                    :menu-props="{ maxHeight: '400' }"
                    :label="$t('labels.upgradeResource') + ` 1a`"
                  >
                    <template v-slot:item="data">
                      <img :src="getResourceIconUrl(data.item)" alt="">
                      {{ data.item }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <v-text-field v-model="building.upgradeCost[`level1`].resource1.amount" :label="$t('labels.amount')" />
                </v-col>
              </v-row>
              <v-row v-if="building.upgradeCost[`level1`].resource2">
                <v-col cols="9" sm="9" md="9">
                  <v-select
                    v-model="building.upgradeCost[`level1`].resource2.slug"
                    :items="resourcesSelectList"
                    :menu-props="{ maxHeight: '400' }"
                    :label="$t('labels.upgradeResource') + ` 1b`"
                  >
                    <template v-slot:item="data">
                      <img :src="getResourceIconUrl(data.item)" alt="">
                      {{ data.item }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <v-text-field v-model="building.upgradeCost[`level1`].resource2.amount" :label="$t('labels.amount')" />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3" sm="3" md="3">
                  <v-text-field v-model="building.upgradeCost[`level1`].time.minutes" :label="$t('buildings.labelProductionResourceMinutes')" />
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <v-text-field v-model="building.upgradeCost[`level1`].time.seconds" :label="$t('buildings.labelProductionResourceSeconds')" />
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="building.upgradeCost[`level1`].time.hours" :label="$t('buildings.labelProductionResourceHours')" />
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="building.upgradeCost[`level1`].time.days" :label="$t('buildings.labelProductionResourceDays')" />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="building.upgradeCost[`level1`].premium.amount" :label="$t('buildings.labelUpgradeResourcePremium')" />
                </v-col>
              </v-row>
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
    editingSpecBuilding: {
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
      originList: ['basic', 'someOne'],
      currentOrigins: ['basic'],
      typeList: ['workshop', 'special'], // special mean's whan no have some type building evryware
      currentTypes: ['special'],
      // currentTypes: ['special'],

      building: {
        slug: 'provision-house',
        name: {
          default: 'Provision House',
          en: 'Provision House',
          ru: 'Provision House',
        },
        needPatent: true,
        canMove: true,

        images: {
          icon: {
            url: `/img/buildings/provision-house-icon.png`
          },
          image1: {
            url: `/img/buildings/provision-house.png`
          },
        },

        size: {
          x: 2,
          y: 2,
        },
        destroyReturnResources: {
          resource1: {
            slug: 'pinewood-planks',
            amount: 9999,
          },
        },
        requiredLevel: 4,

        moveCost: {
          level1: {
            resource1: {
              slug: 'pinewood-planks',
              amount: 30,
            },
            resource2: {
              slug: 'stones',
              amount: 20,
            },
            premium: {
              amount: 1,
            },
          },
        },

        upgradeCost: {
          level1: {
            resource1: {
              slug: 'pinewood-planks',
              amount: 100,
            },
            resource2: {
              // slug: 'stones',
              // amount: 40,
              slug: null,
              amount: null,
            },
            premium: {
              amount: 10,
            },
            time: {
              seconds: 0,
              minutes: 10,
              hours: 0,
              days: 0,
            }
          },
        },

        description: {
          default: 'default description',
          en: 'description en',
          ru: 'description ru',
        },
        canTrade: false,
        origins: {},
        types: {},

        weight: 4,
        returnToStarMenu: false, // After the demolition returns to star menu:
      },
      showDestroyReturnResources1: false,
      showDestroyReturnResources2: false,
      showDestroyReturnResources3: false,
      showConsumption1: false,


      selectedProductionResource: [],

      // dialog: false,

      e1: 1,

      buildings: {},

      // dataLoaded: false,

    }
  },
  watch: {
    editingSpecBuilding(building) {
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
      this.editingSpecBuilding
      console.log('this.editingSpecBuilding: ', this.editingSpecBuilding);
    },
    addDestroyReturnResources1() {
      this.building.destroyReturnResources = {
        resource1: {
          slug: '',
          amount: null,
        }
      }
      this.showDestroyReturnResources1 = true
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
