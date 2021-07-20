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
                      <v-textarea
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
                      <v-col cols="12" sm="12" md="12" v-for="idx in 7" :key="idx">
                        {{ $t('labels.imageUrl') + ` ${idx}` }}
                        <v-text-field v-model="building.images[`image${idx}`].url" :label="`${$t('labels.imageUrl')} ${idx}`" />
                      </v-col>
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
              <div v-for="lvl in 7" :key="lvl">
                <h2>Move resource {{ lvl }}</h2>
                <v-row>
                  <v-col cols="9" sm="9" md="9">
                    <v-select
                      v-model="building.moveCost[`level${lvl}`].resource1.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('buildings.labelMoveResource') + ` ${lvl}a`"
                    >
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.moveCost[`level${lvl}`].resource1.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="9" sm="9" md="9">
                    <v-select
                      v-model="building.moveCost[`level${lvl}`].resource2.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('buildings.labelMoveResource') + ` ${lvl}b`"
                    >
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.moveCost[`level${lvl}`].resource2.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="building.moveCost[`level${lvl}`].premium.amount" :label="$t('buildings.labelMoveResourcePremium')" />
                  </v-col>
                </v-row>
              </div>
            </v-stepper-content>
            <!-- STEP 5 -->
            <v-stepper-content step="5">
              <div v-for="lvl in 7" :key="lvl">
                <h2>Build resource {{ lvl }}</h2>
                <v-row>
                  <v-col cols="9" sm="9" md="9">
                    <v-select
                      v-model="building.upgradeCost[`level${lvl}`].resource1.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('labels.upgradeResource') + ` ${lvl}a`"
                    >
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.upgradeCost[`level${lvl}`].resource1.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>
                <v-row v-if="building.upgradeCost[`level${lvl}`].resource2">
                  <v-col cols="9" sm="9" md="9">
                    <v-select
                      v-model="building.upgradeCost[`level${lvl}`].resource2.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('labels.upgradeResource') + ` ${lvl}b`"
                    >
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.upgradeCost[`level${lvl}`].resource2.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.upgradeCost[`level${lvl}`].time.minutes" :label="$t('buildings.labelProductionResourceMinutes')" />
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.upgradeCost[`level${lvl}`].time.seconds" :label="$t('buildings.labelProductionResourceSeconds')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.upgradeCost[`level${lvl}`].time.hours" :label="$t('buildings.labelProductionResourceHours')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.upgradeCost[`level${lvl}`].time.days" :label="$t('buildings.labelProductionResourceDays')" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="building.upgradeCost[`level${lvl}`].premium.amount" :label="$t('buildings.labelUpgradeResourcePremium')" />
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
    editingProvisionHouse: {
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
            url: `/img/buildings/image-icon.png`
          },
          image1: {
            url: `/img/buildings/image-1.png`
          },
          image2: {
            url: `/img/buildings/image-2.png`
          },
          image3: {
            url: `/img/buildings/image-3.png`
          },
          image4: {
            url: `/img/buildings/image-4.png`
          },
          image5: {
            url: `/img/buildings/image-5.png`
          },
          image6: {
            url: `/img/buildings/image-6.png`
          },
          image7: {
            url: `/img/buildings/image-7.png`
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
        requiredLevel: 7,

        moveCost: {
          level1: {
            resource1: {
              slug: 'pinewood-planks',
              amount: 10,
            },
            resource2: {
              slug: 'stones',
              amount: 10,
            },
            premium: {
              amount: 1,
            },
          },

          level2: {
            resource1: {
              slug: 'pinewood-planks',
              amount: 200,
            },
            resource2: {
              slug: 'stones',
              amount: 200,
            },
            premium: {
              amount: 1,
            },
          },

          level3: {
            resource1: {
              slug: 'hardwood-planks',
              amount: 1000,
            },
            resource2: {
              slug: 'stones',
              amount: 500,
            },
            premium: {
              amount: 1,
            },
          },

          level4: {
            resource1: {
              slug: 'hardwood-planks',
              amount: 800,
            },
            resource2: {
              slug: 'marble',
              amount: 800,
            },
            premium: {
              amount: 1,
            },
          },

          level5: {
            resource1: {
              slug: 'coins',
              amount: 250,
            },
            resource2: {
              slug: 'marble',
              amount: 1000,
            },
            premium: {
              amount: 1,
            },
          },

          level6: {
            resource1: {
              slug: 'coins',
              amount: 250,
            },
            resource2: {
              slug: 'marble',
              amount: 1000,
            },
            premium: {
              amount: 1,
            },
          },

          level7: {
            resource1: {
              slug: 'coins',
              amount: 350,
            },
            resource2: {
              slug: 'marble',
              amount: 1400,
            },
            premium: {
              amount: 1,
            },
          },
        },

        upgradeCost: {
          level1: {
            resource1: {
              slug: 'pinewood',
              amount: 20,
            },
            resource2: {
              slug: 'stones',
              amount: 80,
            },
            premium: {
              amount: 1,
            },
            time: {
              seconds: 0,
              minutes: 5,
              hours: 0,
              days: 0,
            }
          },
          level2: {
            resource1: {
              slug: 'hardwood-planks',
              amount: 500,
            },
            resource2: {
              slug: 'marble',
              amount: 650,
            },
            premium: {
              amount: 1,
            },
            time: {
              seconds: 30,
              minutes: 2,
              hours: 0,
              days: 0,
            }
          },
          level3: {
            resource1: {
              slug: 'hardwood-planks',
              amount: 1000,
            },
            resource2: {
              slug: 'marble',
              amount: 3000,
            },
            premium: {
              amount: 1,
            },
            time: {
              seconds: 0,
              minutes: 0,
              hours: 1,
              days: 0,
            }
          },
          level4: {
            resource1: {
              slug: 'coins',
              amount: 5000,
            },
            resource2: {
              slug: 'marble',
              amount: 2000,
            },
            premium: {
              amount: 1,
            },
            time: {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 1,
            }
          },
          level5: {
            resource1: {
              slug: 'exotic-wood-planks',
              amount: 9000,
            },
            resource2: {
              slug: 'granite',
              amount: 5000,
            },
            premium: {
              amount: 1,
            },
            time: {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 7,
            }
          },
          level6: {
            resource1: {
              slug: 'grout',
              amount: 800,
            },
            resource2: {
              slug: 'granite',
              amount: 5000,
            },
            premium: {
              amount: 1,
            },
            time: {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 7,
            }
          },
          level7: {
            resource1: {
              slug: 'advanced-tools',
              amount: 4200,
            },
            resource2: {
              slug: 'oil',
              amount: 5050,
            },
            premium: {
              amount: 1,
            },
            time: {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 7,
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

        weight: 7,
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
    editingProvisionHouse(building) {
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
      this.building.images[`image${i}`].url = `/img/buildings/${this.building.slug}-${i}.png`
    }
    this.building.images.icon.url = `/img/buildings/${this.building.slug}-icon.png`
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
      this.editingProvisionHouse
      console.log('this.editingProvisionHouse: ', this.editingProvisionHouse);
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
