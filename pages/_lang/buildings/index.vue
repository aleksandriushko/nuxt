<template>
  <div class="Content" v-if="buildingsLoaded">
    <div class="container">

      <v-btn small class="_edit-building" @click="dialogAdd('production')">
        {{ $t('buildings.addProdBuilding') }}
      </v-btn>

      <v-btn small class="_edit-building" @click="dialogSpec = true">
        {{ $t('buildings.addSpecBuilding') }}
      </v-btn>

      <v-btn small @click="dialogStorehouse = true">
        {{ $t('buildings.addStorehouse') }}
      </v-btn>

      <v-btn small @click="dialogMine = true">
        {{ $t('buildings.addMine') }}
      </v-btn>

      <!-- <v-btn small @click="dialogProvisionHouse = true">
        {{ $t('buildings.addProvisionHouse') }}
      </v-btn> -->

      <h1 class="Content__Title">
        {{ $t('buildings.title') }}
      </h1>

      <!-- <div v-for="(origin, idx) in building.origins"> -->
      <!-- <div v-for="(bilding, idx) in buildings" :key="'buildings' + idx">
        {{ bilding }}
      </div> -->

      <div v-for="(buildingType, idx) in renderBuldingList" :key="'buildings' + idx">
        <h2 class="buiiding-type-title">{{ buildingType }}</h2>
        <div class="buildings-wrap">
          <template v-for="building in basicBuildings">
            <div v-if="buildingType === building.origins[0]" :key="building.id" class="building">
              <template v-if="building.images">
                <NuxtLink :to="`/buildings/${building.slug}`" class="img-link"><img :src="building.images.icon.url" alt="" v-if="building.images.icon.url"></NuxtLink>
              </template>
              <template v-else>
                <NuxtLink :to="`/buildings/${building.slug}`" class="img-link"><img :src="building.imageIconUrl" alt=""></NuxtLink>
              </template>

              <NuxtLink :to="`/buildings/${building.slug}`" class="text-link">{{ building.name.en }}</NuxtLink>
              <div class="level-text">{{ building.requiredLevel }}</div>
              <v-btn small class="edit-building" @click="dialogEdit(building.slug)">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
            </div>
          </template>
        </div>
      </div>

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

            <v-stepper-items>
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
                          :label="$t('labels.typeList')"
                          multiple
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          v-model="currentTypes"
                          :items="typeList"
                          :menu-props="{ maxHeight: '400' }"
                          :label="$t('labels.originList')"
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

              <v-stepper-content step="2">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="building.images.icon.url" :label="$t('labels.imageIconUrl')" />
                      </v-col>

                      <v-col cols="12" sm="12" md="12" v-for="item in 7" :key="item">
                        <v-text-field v-model="building.images[`image${item}`].url" :label="`${$t('labels.imageUrl')} ${item}`" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-btn color="primary" @click="e1 = 3">
                  Continue
                </v-btn>
                <v-btn text>
                  Cancel
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-row>
                  <v-col cols="9" sm="9" md="9">
                    <v-select
                      v-model="building.productionResource.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('buildings.labelProductionResourceSlug')"
                    >
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.productionResource.amount" :label="$t('labels.amount')" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.productionResource.time.minutes" :label="$t('buildings.labelProductionResourceMinutes')" />
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.productionResource.time.seconds" :label="$t('buildings.labelProductionResourceSeconds')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.productionResource.time.hours" :label="$t('buildings.labelProductionResourceHours')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.productionResource.time.days" :label="$t('buildings.labelProductionResourceDays')" />
                  </v-col>
                </v-row>

                <v-row v-if="building.consumptionResource1 || showConsumption1">
                  <v-col cols="9" sm="9" md="9">
                    <v-select
                      v-model="building.consumptionResource1.slug"
                      :items="resourcesSelectList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('buildings.labelConsumptionResource1Slug')"
                    >
                      <!-- <template slot="selection" v-slot:selection="data"> -->
                        <!-- {{ data.item.name }} -->
                      <!-- </template> -->
                      <template v-slot:item="data">
                        <img :src="getResourceIconUrl(data.item)" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.consumptionResource1.amount" :label="$t('buildings.labelConsumptionResource1Amount')" />
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-btn color="primary" @click="addConsumption1">
                    Add Consumption
                  </v-btn>
                </v-row>

                <v-btn color="primary">
                  Add
                </v-btn>
                <v-btn text>
                  Cancel
                </v-btn>
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
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
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
      <dialogSpecialBuilding :dialog="dialogSpec" :resources="resources" :editingSpecBuilding="editingSpecBuilding" :dialogCurrent="dialogCurrent"  @clicked="onDialogSpec" />
      <dialogProvisionHouse :dialog="dialogProvisionHouse" :resources="resources" :editingProvisionHouse="editingProvisionHouse" :dialogCurrent="dialogCurrent"  @clicked="onDialogProvisionHouse" />
      <dialogStorehouse :dialog="dialogStorehouse" :resources="resources" :editingStorehouse="editingStorehouse" :dialogCurrent="dialogCurrent"  @clicked="onDialogStorehouse" />
      <dialogMine :dialog="dialogMine" :resources="resources" :editingMine="editingMine" :dialogCurrent="dialogCurrent"  @clicked="onDialogMine" />
      <!-- <button @click="test">test</button> -->
    </div>
  </div>
</template>

<script>
import dialogSpecialBuilding from '@/components/elements/dialogSpecialBuilding'
import dialogProvisionHouse from '@/components/elements/buildings/dialogProvisionHouse'
import dialogStorehouse from '@/components/elements/buildings/dialogStorehouse'
import dialogMine from '@/components/elements/buildings/dialogMine'

export default {
  head() {
    return { title: this.$t('buildings.title') }
  },
  components: {
    dialogSpecialBuilding,
    dialogProvisionHouse,
    dialogStorehouse,
    dialogMine,
  },
  data() {
    return {
      renderBuldingList: ['basic', 'intermediate'],

      originList: ['basic', 'someOne'],
      currentOrigins: ['basic'],
      typeList: ['workshop', 'special'], // special mean's whan no have some type building evryware
      // currentTypes: ['workshop'],
      currentTypes: ['special'],

      building: {
        slug: 'mason',
        name: {
          default: 'Mason',
          en: 'Mason',
          ru: 'Mason',
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

        productionResource: {
          slug: 'stones',
          time: {
            seconds: 0,
            minutes: 5,
            hours: 0,
            days: 0,
          },
          amount: 1,
        },
        consumptionResource1: {
          slug: 'stone-deposit',
          amount: 1,
        },
        size: {
          x: 2,
          y: 2,
        },
        destroyReturnResources: {
          resource1: {
            slug: 'tools',
            amount: 2,
          },
        },
        requiredLevel: 5,


        moveCost: {
          level1: {
            resource1: {
              slug: 'pinewood-planks',
              amount: 6,
            },
            resource2: {
              slug: 'stones',
              amount: 6,
            },
            premium: {
              amount: 1,
            },
          },

          level2: {
            resource1: {
              slug: 'pinewood-planks',
              amount: 40,
            },
            resource2: {
              slug: 'stones',
              amount: 40,
            },
            premium: {
              amount: 2,
            },
          },

          level3: {
            resource1: {
              slug: 'hardwood-planks',
              amount: 100,
            },
            resource2: {
              slug: 'stones',
              amount: 75,
            },
            premium: {
              amount: 7,
            },
          },

          level4: {
            resource1: {
              slug: 'hardwood-planks',
              amount: 100,
            },
            resource2: {
              slug: 'marble',
              amount: 100,
            },
            premium: {
              amount: 11,
            },
          },

          level5: {
            resource1: {
              slug: 'coins',
              amount: 100,
            },
            resource2: {
              slug: 'marble',
              amount: 200,
            },
            premium: {
              amount: 29,
            },
          },

          level6: {
            resource1: {
              slug: 'coins',
              amount: 100,
            },
            resource2: {
              slug: 'marble',
              amount: 200,
            },
            premium: {
              amount: 29,
            },
          },

          level7: {
            resource1: {
              slug: 'coins',
              amount: 200,
            },
            resource2: {
              slug: 'marble',
              amount: 300,
            },
            premium: {
              amount: 53,
            },
          },
        },

        upgradeCost: {
          level1: {
            resource1: {
              slug: 'pinewood',
              amount: 40,
            },
            resource2: {
              // slug: 'stones',
              // amount: 40,
              slug: null,
              amount: null,
            },
            premium: {
              amount: 2,
            },
            time: {
              seconds: 0,
              minutes: 1,
              hours: 0,
              days: 0,
            }
          },
          level2: {
            resource1: {
              slug: 'hardwood-planks',
              amount: 120,
            },
            resource2: {
              slug: 'marble',
              amount: 100,
            },
            premium: {
              amount: 221,
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
              amount: 300,
            },
            resource2: {
              slug: 'marble',
              amount: 150,
            },
            premium: {
              amount: 439,
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
              amount: 500,
            },
            resource2: {
              slug: 'marble',
              amount: 300,
            },
            premium: {
              amount: 1913,
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
              amount: 500,
            },
            resource2: {
              slug: 'granite',
              amount: 300,
            },
            premium: {
              amount: 2061,
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
              amount: 50,
            },
            resource2: {
              slug: 'granite',
              amount: 500,
            },
            premium: {
              amount: 1253,
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
              amount: 500,
            },
            resource2: {
              slug: 'oil',
              amount: 200,
            },
            premium: {
              amount: 630,
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
        weight: 0,
        returnToStarMenu: false, // After the demolition returns to star menu:
        // placedOnWater: false,




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
      showDestroyReturnResources1: false,
      showDestroyReturnResources2: false,
      showDestroyReturnResources3: false,
      showConsumption1: false,

      selectedProductionResource: [],

      dialog: false,

      dialogSpec: false,
      editingSpecBuilding: null,

      dialogProvisionHouse: false,
      editingProvisionHouse: null,

      dialogStorehouse: false,
      editingStorehouse: null,

      dialogMine: false,
      editingMine: null,

      e1: 1,

      resources: {},
      buildings: {},

      buildingsLoaded: false,

      dialogCurrent: 'Add',
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
    basicBuildings() {
      let arrBuildings = []
      for(let building in this.buildings) {
        // if(building)
        arrBuildings.push(this.buildings[building])
      }
      return arrBuildings.sort((a, b) => a.weight - b.weight)
    }

  },
  async created() {
      this.buildings = await this.$store.dispatch('buildings/getAll')
      this.resources = await this.$store.dispatch('resources/getAll')
      window.buildings = this.buildings
      console.log('this.resources: ', this.resources);
      console.log('this.buildings: ', this.buildings);
      this.buildingsLoaded = true
  },
  methods: {
    addConsumption1() {
      this.building.consumptionResource1 = {
        slug: '',
        amount: null,
      }
      this.showConsumption1 = true
    },
    addDestroyReturnResources1() {
      console.log('addDestroyReturnResources1: ');
      this.building.destroyReturnResources = {
        resource1: {
          slug: '',
          amount: null,
        }
      }

      this.showDestroyReturnResources1 = true
    },
    getResourceIconUrl(slug) {
      return this.resources[slug].imageUrl
    },
    test() {
      this.getResourceIcon()
    },
    dialogAdd(type) {
      // if(type === 'special') {

      // } else {
        this.dialog = true
        this.dialogCurrent = 'Add'
        // auto-name img
        for(let i = 1; i <= 7; i++) {
          this.building.images[`image${i}`].url = `/img/buildings/${this.building.slug}-${i}.png`
        }
        this.building.images.icon.url = `/img/buildings/${this.building.slug}-icon.png`
      // }
    },
    dialogEdit(slug) {
      console.log('slug: ', slug);

      if(slug === 'tavern') {
        this.editingSpecBuilding = this.buildings[slug]
        this.dialogCurrent = 'Edit'
        this.dialogSpec = true
      } else if(slug === 'provision-house') {
        this.editingProvisionHouse = this.buildings[slug]
        this.dialogCurrent = 'Edit'
        this.dialogProvisionHouse = true
      } else if(slug === 'storehouse') {
        this.editingStorehouse = this.buildings[slug]
        this.dialogCurrent = 'Edit'
        this.dialogStorehouse= true
      } else if(slug === 'copper-mine') {
        this.editingMine = this.buildings[slug]
        this.dialogCurrent = 'Edit'
        this.dialogMine= true
      } else {

        this.building = this.buildings[slug]

        this.currentTypes = []
        for(const prop in this.building.types) {
          this.currentTypes.push(this.building.types[prop])
        }
        this.currentOrigins = []
        for(const prop in this.building.origins) {
          this.currentOrigins.push(this.building.origins[prop])
        }

        this.dialogCurrent = 'Edit'
        this.dialog = true

        if(this.building.destroyReturnResources.resource1) {
          this.showDestroyReturnResources1 = true
        }
      }
    },
    editBuilding() {
      console.log('editBuilding: ');
      this.building.types = {}
      this.building.origins = {}
      this.currentTypes.forEach((el, idx) => {
        console.log('el, idx: ', el, idx);
        this.building.types[idx] = el
      })
      this.currentOrigins.forEach((el, idx) => {
        console.log('el, idx: ', el, idx);
        this.building.origins[idx] = el
      })
      console.log('editBuilding: 2');

      this.$store.dispatch('buildings/edit', this.building)
        .then(res => {
          if(res) {
            this.dialog = false
          }
        })
        .catch(error => {
          this.dialog = false
          console.log('error: ', error);
        })
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
            this.dialog = false
            this.buildings[this.building.slug] = res
          }
        })
        .catch(error => {
          this.dialog = false
          console.log('error: ', error);
        })
    },
    onDialogSpec(data) {
      if(data.type === 'add') {
        this.dialogSpec = false
      } else if(data.type === 'edit') {
        this.dialogSpec = false
      } else if(data.type === 'close') {
        this.dialogSpec = false
      } else {
        this.dialogSpec = false
      }
    },
    onDialogProvisionHouse(data) {
      if(data.type === 'add') {
        this.dialogProvisionHouse = false
      } else if(data.type === 'edit') {
        this.dialogProvisionHouse = false
      } else if(data.type === 'close') {
        this.dialogProvisionHouse = false
      } else {
        this.dialogProvisionHouse = false
      }
    },
    onDialogStorehouse(data) {
      this.dialogStorehouse = false
    },
    onDialogMine(data) {
      this.dialogMine = false
    },
  }
}
</script>

<style scoped>
.buildings-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-top: 1px solid black;
    border-left: 1px solid black;
}
.building {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  position: relative;
  display: flex;
}
/* .edit-building {
  right: 0;
  top: 0;
  position: absolute;
} */
img.preview {
  width: 50px;
}
/* .size-matrix-wrap { */
  /* transform: rotate(-30deg);
  width: 80px; */
/* } */
.size-matrix-line {
  display: flex;
}
.size-item {
  cursor: pointer;
  background: #cccccc;
  border: 1px solid #6d6d6d;
  width: 10px;
  height: 10px;
}
.size-item:hover {
  background: #ababab;
}
.size-item-active {
  background-color: #4aad49;
}
.level-text {
  width: 100%;
}
.text-link, .level-text {
  align-self: center;
}
.buiiding-type-title {
  text-transform: capitalize;
  margin-top: 20px;
}
.edit-building {
  position: absolute;
  right: 5px;
  top: 5px;
  display: none;
}
.building:hover .edit-building {
  display: block;
}
</style>
