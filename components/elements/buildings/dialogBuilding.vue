<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="800px" v-if="dataForReeditingLoaded">
      <v-card>
        <v-stepper v-model="currentTab">
          <v-stepper-header>
            <v-stepper-step :complete="currentTab > 1" step="1" editable>
              {{ $t('tabs.main') }}
            </v-stepper-step>
            <v-divider />

            <v-stepper-step :complete="currentTab > 2" step="2" editable>
              {{ $t('tabs.images') }}
            </v-stepper-step>
            <v-divider />

            <v-stepper-step :complete="currentTab > 3" step="3" editable>
              {{ $t('tabs.build') }}
            </v-stepper-step>
            <v-divider />

            <v-stepper-step :complete="currentTab > 4" step="4" editable>
              {{ $t('tabs.move') }}
            </v-stepper-step>
            <v-divider />

            <v-stepper-step step="5" editable v-if="specialTab">
              {{ $t(`tabs.${specialTab}`) }}
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- STEP 1 -->
            <v-stepper-content step="1" v-if="showTab[1]">
              <v-card-text>
                <v-container>

                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="building.slug" :label="$t('labels.slug')" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="building.name.en" :label="$t('labels.nameEn')" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="building.name.ru" :label="$t('labels.nameRu')" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="building.description.en" :label="$t('labels.descriptionEn')" rows="1" />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="building.description.ru" :label="$t('labels.descriptionRu')" rows="1" />
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
                    <v-col cols="3">
                      <v-checkbox v-model="building.needPatent" :label="$t('buildings.labelNeedPatent')" />
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox v-model="building.canMove" :label="$t('buildings.labelCanMove')" />
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox v-model="building.canTrade" :label="$t('buildings.labelСanTrade')" />
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox v-model="building.placedOnWater" :label="$t('buildings.labelPlacedOnWater')" />
                    </v-col>
                    <v-col cols="4">
                      <v-checkbox v-model="building.returnToStarMenu" :label="$t('buildings.labelReturnToStarMenu')" />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="building.requiredLevel" :label="$t('labels.requiredLevel')" />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="building.weight" :label="$t('labels.weight')" />
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

            <!-- STEP 2 - IMAGES -->
            <v-stepper-content step="2" v-if="showTab[2]">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="2">
                      <img :src="building.imageIconUrl" alt="">
                    </v-col>
                    <v-col cols="10">
                      <v-text-field v-model="building.imageIconUrl" :label="$t('labels.imageIconUrl')" />
                    </v-col>
                  </v-row>
                  <v-row v-for="(url, idx) in building.imageUrls" :key="'img-urls-'+idx">
                    <v-col class="img-urls" cols="2">
                      <img :src="url" alt="">
                    </v-col>
                    <v-col cols="10">
                      <v-text-field v-model="building.imageUrls[idx]" :label="`${$t('labels.imageUrl')} ${idx+1}`" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-stepper-content>

            <!-- STEP 3 upgradeCost -->
            <v-stepper-content step="3" v-if="showTab[3]">
              <div v-for="(item, costIdx) in building.upgradeCost" :key="costIdx">

                <template v-if="+costIdx + 1 === 1"><h2>{{ $t('titles.constructionCost') }}</h2></template>
                <template v-else><h2>{{ $t('titles.upgradeCost') + ` ${+costIdx + 1}` }}</h2></template>

                <v-row v-for="(resource, idx) in building.upgradeCost[costIdx].resources" :key="'resource' + idx">
                  <v-col class="resource-icon" cols="1">
                    <img :src="resources[resource.slug].imageUrl" alt="">
                  </v-col>

                  <v-col cols="8">
                    <v-select
                      v-model="resource.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('labels.upgradeResource') + ` ${idx}`"
                    >
                      <template v-slot:item="data">
                        <img :src="resources[data.item].imageUrl" alt="">
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
                    <v-text-field v-model="building.upgradeCost[costIdx].time.minutes" :label="$t('labels.minutes')" />
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.upgradeCost[costIdx].time.seconds" :label="$t('labels.seconds')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.upgradeCost[costIdx].time.hours" :label="$t('labels.hours')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.upgradeCost[costIdx].time.days" :label="$t('labels.days')" />
                  </v-col>
                </v-row>
              </div>

              <h2>{{ $t('titles.destroyReturnResources') }}</h2>
              <v-row v-for="(resource, idx) in building.destroyReturnResources" :key="'destroy-resource' + idx">
                <v-col cols="9">
                  <v-select
                    v-model="resource.slug"
                    :items="resourcesSelectList"
                    :menu-props="{ maxHeight: '400' }"
                    :label="$t('labels.destroyReturnResource') + ` ${idx}`"
                  >
                    <template v-slot:item="data">
                      <img :src="resource[data.item].imageUrl" alt="">
                      {{ data.item }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="resource.amount" :label="$t('labels.amount')" />
                </v-col>
              </v-row>
            </v-stepper-content>

            <!-- STEP 4 -->
            <v-stepper-content step="4" v-if="showTab[4]">
              <div v-for="(item, costIdx) in building.moveCost" :key="costIdx">
                <h2>{{ $t('titles.moveBuilding') + ` ${+costIdx+1}` }}</h2>
                <v-row v-for="(resource, idx) in building.moveCost[costIdx].resources" :key="'resource' + idx">
                  <v-col class="resource-icon" cols="1">
                    <img :src="resources[resource.slug].imageUrl" alt="">
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      v-model="resource.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('labels.moveResource') + ` ${idx}`"
                    >
                      <template v-slot:item="data">
                        <img :src="resources[data.item].imageUrl" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="resource.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>
              </div>
            </v-stepper-content>
            <!-- STEP 5 -->
            <v-stepper-content step="5" v-if="showTab[5]">
              <template v-if="specialTab === 'production' || specialTab === 'deposit'">
                <h2>{{ $t('titles.production') }}</h2>
                <v-row>
                  <v-col class="resource-icon" cols="1">
                    <img :src="resources[building.productionResource.slug].imageUrl" alt="">
                  </v-col>
                  <v-col cols="8">
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
                    <v-text-field v-model="building.productionResource.time.minutes" :label="$t('labels.minutes')" />
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.productionResource.time.seconds" :label="$t('labels.seconds')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.productionResource.time.hours" :label="$t('labels.hours')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.productionResource.time.days" :label="$t('labels.days')" />
                  </v-col>
                </v-row>

                <template v-if="building.consumptionResources">
                  <v-row v-for="(resource, idx) in building.consumptionResources" :key="'consumption-resource' + idx">
                    <v-col class="resource-icon" cols="1">
                      <img :src="resources[resource.slug].imageUrl" alt="">
                    </v-col>
                    <v-col cols="8">
                      <v-select
                        v-model="resource.slug"
                        :items="resourcesSelectList"
                        :menu-props="{ maxHeight: '400' }"
                        :label="$t('labels.consumptionResource') + ` ${idx}`"
                      >
                        <template v-slot:item="data">
                          <img :src="resources[data.item].imageUrl" alt="">
                          {{ data.item }}
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field v-model="resource.amount" :label="$t('labels.amount')" />
                    </v-col>
                  </v-row>
                </template>
              </template>

              <template v-if="specialTab === 'storageCapacities'">
                <h2>{{ $t('buildings.titleStorageCapacities') }}</h2>
                <v-row>
                  <v-col v-for="(storageCapacity, idx) in building.storageCapacities" :key="'storage-capacities-' + idx" cols="3">
                    <v-text-field v-model="building.storageCapacities[idx]" :label="$t('buildings.labelStorageCapacity') + ` ${+idx + 1}`" />
                  </v-col>
                </v-row>
              </template>

              <template v-if="specialTab === 'wheatfield' || specialTab === 'deposit'">
                <v-row>
                  <v-col class="resource-icon" cols="1">
                    <img :src="resources[building.deposit.resourceSlug].imageUrl" alt="">
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      v-model="building.deposit.resourceSlug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('labels.depositResource')"
                    >
                      <template v-slot:item="data">
                        <img :src="resources[data.item].imageUrl" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.deposit.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>
              </template>

              <template v-if="specialTab === 'population'">
                <h2>{{ $t('buildings.titlePopulation') }}</h2>
                <v-row>
                  <v-col v-for="(item, idx) in building.population" :key="'population-' + idx" cols="3">
                    <v-text-field v-model="building.population[idx]" :label="$t('buildings.labelPopulation') + ` ${+idx + 1}`" />
                  </v-col>
                </v-row>
              </template>

            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeDialog">
            Close
          </v-btn>
          <!-- <v-btn color="blue darken-1" text @click="test">
            test
          </v-btn> -->
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
    editingBuilding: {
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
      originList: ['basic', 'intermediate', 'advanced', 'expert', 'elite'],
      currentOrigins: ['elite'],
      typeList: ['workshop', 'special', 'storehouse', 'mine', "wheatfield", "deposit", "population", "military"], // special mean's whan no have some type building evryware
      currentTypes: ['special'],
      buildingN: {},

      building: {
        slug: 'coking-plant',
        name: {
          en: 'Coking Plant',
          ru: 'Coking Plant',
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
        requiredLevel: 10,
        weight: 10,
        needPatent: true,
        canMove: true,
        canTrade: false,
        returnToStarMenu: false, // After the demolition returns to star menu:
        placedOnWater: false,
        size: {
          x: 2,
          y: 2,
        },

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

        destroyReturnResources: {
          '0': {
            slug: 'pinewood-planks',
            amount: 9999,
          },
        },
        upgradeCost: {
          '0': {
            resources: {
              '0': {
                slug: 'pinewood',
                amount: 50,
              },
              '1': {
                slug: 'stones',
                amount: 50,
              },
              '2': {
                slug: 'tools',
                amount: 10,
              },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 2,
              hours: 0,
              days: 0,
            }
          },
          '1': {
            resources: {
              '0': {
                slug: 'hardwood-planks',
                amount: 120,
              },
              '1': {
                slug: 'marble',
                amount: 100,
              },
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
                slug: 'hardwood-planks',
                amount: 300,
              },
              '1': {
                slug: 'marble',
                amount: 150,
              },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 0,
              hours: 1,
              days: 0,
            }
          },
          '3': {
            resources: {
              '0': {
                slug: 'coins',
                amount: 500,
              },
              '1': {
                slug: 'marble',
                amount: 300,
              },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 1,
            }
          },
          '4': {
            resources: {
              '0': {
                slug: 'exotic-wood-planks',
                amount: 500,
              },
              '1': {
                slug: 'granite',
                amount: 300,
              },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 7,
            }
          },
          '5': {
            resources: {
              '0': {
                slug: 'grout',
                amount: 300,
              },
              '1': {
                slug: 'granite',
                amount: 1000,
              },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 7,
            }
          },
          '6': {
            resources: {
              '0': {
                slug: 'advanced-tools',
                amount: 1000,
              },
              '1': {
                slug: 'oil',
                amount: 1200,
              },
            },
            premiumCost: 1,
            time: {
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 7,
            }
          },
        },
        moveCost: {
          '0': {
            resources: {
              '0': {
                slug: 'pinewood',
                amount: 8,
              },
              '1': {
                slug: 'stones',
                amount: 8,
              },
            },
            premiumCost: 1,
          },
          '1': {
            resources: {
              '0': {
                slug: 'pinewood-planks',
                amount: 50,
              },
              '1': {
                slug: 'stones',
                amount: 40,
              },
            },
            premiumCost: 1,
          },
          '2': {
            resources: {
              '0': {
                slug: 'hardwood-planks',
                amount: 100,
              },
              '1': {
                slug: 'stones',
                amount: 75,
              },
            },
            premiumCost: 1,
          },
          '3': {
            resources: {
              '0': {
                slug: 'hardwood-planks',
                amount: 100,
              },
              '1': {
                slug: 'marble',
                amount: 100,
              },
            },
            premiumCost: 1,
          },
          '4': {
            resources: {
              '0': {
                slug: 'coins',
                amount: 100,
              },
              '1': {
                slug: 'marble',
                amount: 150,
              },
            },
            premiumCost: 1,
          },
          '5': {
            resources: {
              '0': {
                slug: 'coins',
                amount: 100,
              },
              '1': {
                slug: 'marble',
                amount: 150,
              },
            },
            premiumCost: 1,
          },
          '6': {
            resources: {
              '0': {
                slug: 'coins',
                amount: 200,
              },
              '1': {
                slug: 'marble',
                amount: 300,
              },
            },
            premiumCost: 1,
          },
          // '4': {
          //   resources: {
          //     '0': {
          //       slug: 'exotic-wood-planks',
          //       amount: 500,
          //     },
          //     '1': {
          //       slug: 'granite',
          //       amount: 300,
          //     },
          //   },
          //   premiumCost: 1,
          // },
          // '5': {
          //   resources: {
          //     '0': {
          //       slug: 'grout',
          //       amount: 50,
          //     },
          //     '1': {
          //       slug: 'granite',
          //       amount: 500,
          //     },
          //   },
          //   premiumCost: 1,
          // },
          // '6': {
          //   resources: {
          //     '0': {
          //       slug: 'advanced-tools',
          //       amount: 800,
          //     },
          //     '1': {
          //       slug: 'oil',
          //       amount: 500,
          //     },
          //   },
          //   premiumCost: 1,
          // },
        },

        // Props for workshops
        productionResource: {
          slug: 'coal',
          time: {
            seconds: 0,
            minutes: 3,
            hours: 0,
            days: 0,
          },
          amount: 1,
        },
        consumptionResources: {
          '0': {
            slug: 'pinewood-planks',
            amount: 2,
          },
        },

        // Props for storehouses
        // storageCapacities: {
        //   '0': 100,
        //   '1': 400,
        //   '2': 1000,
        //   '3': 1500,
        //   '4': 3000,
        //   '5': 6000,
        //   '6': 8000,
        // },


        // CAN BUFF?

        // Типы зданий:
        //    - баовые: те которые можно построить из базового меню строительства
        //    - ивент: те которые можно получить в событии (или купить у торговца?)
        // Тип по признаку:
        //      - мастерские: это те к которым можно применять усилители для мастерских (как базовые, так и ивентовые)
        //      - декор:
        //      - склады:
        //      - население:
        //      - военные: производство войск (и их уселители?)
        //      - мастерские уселителей: базовая и ивентовая мастерская (так же может производство бутербродов сюда?)

        // returnToStarMenu: false,
        // canUseBooster: true, // (buff) илипросто массив смотреть с ними, если есть то можно
        // busterList: [], // или список типов чтобы каждый раз все не перечислять
      },

      currentTab: 1,
      specialTab: 'special', // production, storageCapacities, special, wheatfield, military, deposit
      showTab: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
      },

      dataForReeditingLoaded: false
    }
  },
  watch: {
    dialogCurrent() {
      if(this.dialogCurrent === 'Add') {
        this.building = {
          slug: 'elite-barracks',
          name: {
            en: 'Elite Barracks',
            ru: 'Elite Barracks',
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
          requiredLevel: 54,
          weight: 81,
          needPatent: true,
          canMove: true,
          canTrade: false,
          returnToStarMenu: false, // After the demolition returns to star menu:
          placedOnWater: false,
          size: {
            x: 3,
            y: 3,
          },

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

          destroyReturnResources: {
            '0': {
              slug: 'pinewood-planks',
              amount: 9999,
            },
          },

          upgradeCost: {
            '0': {
              resources: {
                '0': {
                  slug: 'exotic-wood-planks',
                  amount: 6000,
                },
                '1': {
                  slug: 'granite',
                  amount: 2000,
                },
                '2': {
                  slug: 'tools',
                  amount: 8000,
                },
              },
              premiumCost: 1,
              time: {
                seconds: 0,
                minutes: 0,
                hours: 1,
                days: 0,
              }
            },
            '1': {
              resources: {
                '0': {
                  slug: 'coins',
                  amount: 5000,
                },
                '1': {
                  slug: 'grout',
                  amount: 300,
                },
              },
              premiumCost: 1,
              time: {
                seconds: 0,
                minutes: 20,
                hours: 0,
                days: 0,
              }
            },
            '2': {
              resources: {
                '0': {
                  slug: 'coins',
                  amount: 7500,
                },
                '1': {
                  slug: 'grout',
                  amount: 800,
                },
              },
              premiumCost: 1,
              time: {
                seconds: 0,
                minutes: 0,
                hours: 2,
                days: 0,
              }
            },
            '3': {
              resources: {
                '0': {
                  slug: 'mahogany-planks',
                  amount: 5000,
                },
                '1': {
                  slug: 'grout',
                  amount: 1500,
                },
              },
              premiumCost: 1,
              time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
                days: 2,
              }
            },
            '4': {
              resources: {
                '0': {
                  slug: 'mahogany-planks',
                  amount: 10000,
                },
                '1': {
                  slug: 'grout',
                  amount: 3000,
                },
              },
              premiumCost: 1,
              time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
                days: 10,
              }
            },
            '5': {
              resources: {
                '0': {
                  slug: 'mahogany-planks',
                  amount: 15000,
                },
                '1': {
                  slug: 'grout',
                  amount: 5000,
                },
              },
              premiumCost: 1,
              time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
                days: 10,
              }
            },
            '6': {
              resources: {
                '0': {
                  slug: 'advanced-tools',
                  amount: 6500,
                },
                '1': {
                  slug: 'oil',
                  amount: 7000,
                },
              },
              premiumCost: 1,
              time: {
                seconds: 0,
                minutes: 0,
                hours: 0,
                days: 10,
              }
            },
          },


          moveCost: {
            '0': {
              resources: {
                '0': {
                  slug: 'pinewood',
                  amount: 5000,
                },
                '1': {
                  slug: 'stones',
                  amount: 2200,
                },
              },
              premiumCost: 1,
            },
            '1': {
              resources: {
                '0': {
                  slug: 'pinewood-planks',
                  amount: 5000,
                },
                '1': {
                  slug: 'stones',
                  amount: 3000,
                },
              },
              premiumCost: 1,
            },
            '2': {
              resources: {
                '0': {
                  slug: 'hardwood-planks',
                  amount: 3500,
                },
                '1': {
                  slug: 'stones',
                  amount: 3000,
                },
              },
              premiumCost: 1,
            },
            '3': {
              resources: {
                '0': {
                  slug: 'hardwood-planks',
                  amount: 4000,
                },
                '1': {
                  slug: 'marble',
                  amount: 5000,
                },
              },
              premiumCost: 1,
            },
            '4': {
              resources: {
                '0': {
                  slug: 'coins',
                  amount: 5000,
                },
                '1': {
                  slug: 'marble',
                  amount: 5000,
                },
              },
              premiumCost: 1,
            },
            '5': {
              resources: {
                '0': {
                  slug: 'coins',
                  amount: 5000,
                },
                '1': {
                  slug: 'marble',
                  amount: 5000,
                },
              },
              premiumCost: 1,
            },
            '6': {
              resources: {
                '0': {
                  slug: 'coins',
                  amount: 6500,
                },
                '1': {
                  slug: 'marble',
                  amount: 6500,
                },
              },
              premiumCost: 1,
            },
          },

          // Workshops & Deposit
          // productionResource: {
          //   slug: 'granite',
          //   time: {
          //     seconds: 0,
          //     minutes: 10,
          //     hours: 0,
          //     days: 0,
          //   },
          //   amount: 1,
          // },
          // consumptionResources: {
          //   '0': {
          //     slug: 'granite-deposit',
          //     amount: 1,
          //   },
            // '1': {
            //   slug: 'wagon',
            //   amount: 1,
            // },
          // },

          // Wheatfield & Deposit
          // deposit: {
          //   amount: 800,
          //   resourceSlug: 'wheatfield'
          // }

          // Props for storehouses
          // storageCapacities: {
          //   '0': 100,
          //   '1': 400,
          //   '2': 1000,
          //   '3': 1500,
          //   '4': 3000,
          //   '5': 6000,
          //   '6': 34000,
          // },

          // Population
          // population: {
          //   '0': 50,
          //   '1': 10,
          //   '2': 10,
          //   '3': 10,
          //   '4': 10,
          //   '5': 10,
          //   '6': 30,
          // }


          // CAN BUFF?

          // Типы зданий:
          //    - баовые: те которые можно построить из базового меню строительства
          //    - ивент: те которые можно получить в событии (или купить у торговца?)
          // Тип по признаку:
          //      - мастерские: это те к которым можно применять усилители для мастерских (как базовые, так и ивентовые)
          //      - декор:
          //      - склады:
          //      - население:
          //      - военные: производство войск (и их уселители?)
          //      - мастерские уселителей: базовая и ивентовая мастерская (так же может производство бутербродов сюда?)

          // canUseBooster: true, // (buff) илипросто массив смотреть с ними, если есть то можно
          // busterList: [], // или список типов чтобы каждый раз все не перечислять
        }
        let lvl = 6
        this.building.imageIconUrl = `/img/buildings/${this.building.slug}-icon.png`
        this.building.imageUrls = {}
        for(let i = 0; i <= lvl; i++) {
          this.building.imageUrls[i] = `/img/buildings/${this.building.slug}-${i + 1}.png`
        }

      }
      // else if(this.dialogCurrent === 'Edit') {
      //   this.currentTypes = []
      //   for(const prop in this.building.types) {
      //     this.currentTypes.push(this.building.types[prop])
      //   }
      //   this.currentOrigins = []
      //   for(const prop in this.building.origins) {
      //     this.currentOrigins.push(this.building.origins[prop])
      //   }

      //   this.building = building
      // }


      // this.showTab[1] = false // main
      // this.showTab[2] = false // images
      // this.showTab[3] = false // build
      // this.showTab[4] = false // move
      // this.showTab[5] = false // spec

      console.log('this.building before data load: ', this.building);
      this.dataForReeditingLoaded = true

    },
    editingBuilding(building) {
      console.log('dialog get building: ', building);

      this.currentTab = 1
      this.building = building

      this.currentTypes = []
      for(const prop in this.building.types) {
        this.currentTypes.push(this.building.types[prop])
      }
      this.currentOrigins = []
      for(const prop in this.building.origins) {
        this.currentOrigins.push(this.building.origins[prop])
      }

      for(let i = 0; i < this.building.types.length; i++) {
        if(
          this.building.types[i] === "storehouse" ||
          this.building.types[i] === "storageCapacities" ||
          this.building.types[i] === "wheatfield" ||
          this.building.types[i] === "deposit" ||
          this.building.types[i] === "population" ||
          this.building.types[i] === "special"
        ) {
          this.specialTab = this.building.types[i]
          break
        }
        if(this.building.types[i] === "workshop" || this.building.types[i] === "mine") {
          this.specialTab = 'production'
        }
      }

      // this.building.types.forEach(type => {
        // if(type === 'special') {
          // this.showTab[1] = false // main
          // this.showTab[2] = false // images
          // this.showTab[3] = false // build
          this.showTab[4] = false // move
          // this.showTab[5] = false // spec
        // }
      // })

      if(0) {
        let lvl = 6

        // this.building.imageIconUrl = `/img/buildings/${this.building.slug}-icon.png`
        // this.building.imageUrls = {}
        // this.building.imageUrls = []
        // for(let i = 0; i <= lvl; i++) {
        //   this.building.imageUrls[i] = `/img/buildings/${this.building.slug}-${i + 1}.png`
          // this.building.imageUrls.push(`/img/buildings/${this.building.slug}-${i + 1}.png`)
        // }

        // this.building.placedOnWater = false
        // this.building.gameDescription = {}
        // this.building.gameDescription.en = 'game description en'
        // this.building.gameDescription.ru = 'game description ru'


        // let newUpgradeCost = {}
        // for(let i = 0; i <= lvl; i++) {
        //   if(i === 0) {
        //     newUpgradeCost[i] = {
        //       resources: {
        //         '0': {
        //           slug: this.building.upgradeCost[`level${i+1}`].resource1.slug,
        //           amount: this.building.upgradeCost[`level${i+1}`].resource1.amount
        //         },
        //       },
        //       premiumCost: this.building.upgradeCost[`level${i+1}`].premium,
        //       time: {
        //         seconds: this.building.upgradeCost[`level${i+1}`].time.seconds,
        //         minutes: this.building.upgradeCost[`level${i+1}`].time.minutes,
        //         hours: this.building.upgradeCost[`level${i+1}`].time.hours,
        //         days: this.building.upgradeCost[`level${i+1}`].time.days,
        //       }
        //     }
        //   } else {
        //     newUpgradeCost[i] = {
        //       resources: {
        //         '0': {
        //           slug: this.building.upgradeCost[`level${i+1}`].resource1.slug,
        //           amount: this.building.upgradeCost[`level${i+1}`].resource1.amount
        //         },
        //         '1': {
        //           slug: this.building.upgradeCost[`level${i+1}`].resource2.slug,
        //           amount: this.building.upgradeCost[`level${i+1}`].resource2.amount
        //         },
        //       },
        //       premiumCost: this.building.upgradeCost[`level${i+1}`].premium,
        //       time: {
        //         seconds: this.building.upgradeCost[`level${i+1}`].time.seconds,
        //         minutes: this.building.upgradeCost[`level${i+1}`].time.minutes,
        //         hours: this.building.upgradeCost[`level${i+1}`].time.hours,
        //         days: this.building.upgradeCost[`level${i+1}`].time.days,
        //       }
        //     }
        //   }
        // }
        // this.building.upgradeCost = newUpgradeCost

        // let destroy = {}
        // destroy[0] = {
        //   slug: 'stones',
        //   amount: 1
        // },
        // this.building.destroyReturnResources = destroy


        // let newMoveCost = {}
        // for(let i = 0; i <= lvl; i++) {
        //   newMoveCost[i] = {
        //     resources: {
        //       '0': {
        //         slug: this.building.moveCost[`level${i+1}`].resource1.slug,
        //         amount: this.building.moveCost[`level${i+1}`].resource1.amount
        //       },
        //       '1': {
        //         slug: this.building.moveCost[`level${i+1}`].resource2.slug,
        //         amount: this.building.moveCost[`level${i+1}`].resource2.amount
        //       },
        //     },
        //     premiumCost: this.building.moveCost[`level${i+1}`].premium,
        //   }
        // }
        // this.building.moveCost = newMoveCost



// this.building.moveCost['1'].resources['1'].slug
// let i = 1
// console.log('this.building.moveCost ', this.building.moveCost[i].resources['1'].slug);

        let newMoveCost = {}
        for(let i = 0; i <= lvl; i++) {
          if(i === 0) {
            newMoveCost[i] = {
              resources: {
                '0': {
                  slug: this.building.upgradeCost[i].resources['0'].slug,
                  // slug: this.building.moveCost[i].resources['0'].slug,
                  amount: this.building.upgradeCost[i].resources['0'].amount
                },
              },
              time: {
                seconds: this.building.upgradeCost[i].time.seconds,
                minutes: this.building.upgradeCost[i].time.minutes,
                hours: this.building.upgradeCost[i].time.hours,
                days: this.building.upgradeCost[i].time.days,
              },
              premiumCost: this.building.upgradeCost[i].premiumCost.amount,
            }
          } else {
            newMoveCost[i] = {
              resources: {
                '0': {
                  slug: this.building.upgradeCost[i].resources['0'].slug,
                  // slug: this.building.moveCost[i].resources['0'].slug,
                  amount: this.building.upgradeCost[i].resources['0'].amount
                },
                '1': {
                  slug: this.building.upgradeCost[i].resources['1'].slug,
                  amount: this.building.upgradeCost[i].resources['1'].amount
                },
              },
              time: {
                seconds: this.building.upgradeCost[i].time.seconds,
                minutes: this.building.upgradeCost[i].time.minutes,
                hours: this.building.upgradeCost[i].time.hours,
                days: this.building.upgradeCost[i].time.days,
              },
              premiumCost: this.building.upgradeCost[i].premiumCost.amount,
            }
          }

        }
        console.log('newMoveCost: ', newMoveCost);
        this.building.upgradeCost = newMoveCost


        // let newConsumptionResources = {}
        // for(let i = 0; i <= 0; i++) {
        //   newConsumptionResources[i] = {
        //     slug: this.building[`consumptionResource${i+1}`].slug,
        //     amount: this.building[`consumptionResource${i+1}`].amount
        //   }
        // }
        // this.building.consumptionResources = newConsumptionResources

        // if(this.building.type[0] === 'storehouse') {
        //   this.building.storageCapacities = {
        //     '0': 100,
        //     '1': 400,
        //     '2': 1000,
        //     '3': 1500,
        //     '4': 3000,
        //     '5': 6000,
        //     '6': 8000,
        //   }
        // }
      }
      console.log('-= editing.building: ',  this.building);
      this.dataForReeditingLoaded = true

    }
  },
  created() {
    console.log('created: dialog', this.dialog);

    // auto-nameing img
    for(let i = 0; i <= 6; i++) {
      this.building.imageUrls[i] = `/img/buildings/${this.building.slug}-${i+1}.png`
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
      // console.log('this.editingBuilding: ', this.editingBuilding);
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
  .resource-icon.col.col-1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-urls.col.col-2 img {
    width: 60px;
  }
</style>
