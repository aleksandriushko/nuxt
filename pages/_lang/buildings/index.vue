<template>
  <div class="Content">
    <div class="container">
      <h1 class="Content__Title">
        {{ $t('buildings.title') }}
      </h1>

      <div v-if="buildingsLoaded" class="buildings-wrap">
        <div v-for="item in buildings" :key="item.id" class="building">
          <NuxtLink :to="`/buildings/${item.slug}`" class="img-link"><img :src="item.images.icon.url" alt="" v-if="item.images.icon.url"></NuxtLink>
          <NuxtLink :to="`/buildings/${item.slug}`" class="text-link">{{ item.name.en }}</NuxtLink>
          <v-btn small class="edit-building" @click="dialogEdit(item.slug)">
            <v-icon color="primary">
              mdi-pencil
            </v-icon>
          </v-btn>
        </div>
      </div>

      <v-btn small class="edit-building" @click="dialogAdd()">
        {{ $t('buildings.addBuilding') }}
      </v-btn>

      <v-dialog v-model="dialog" persistent max-width="800px">
        <!-- <template v-slot:activator="{ on, attrs }"> -->
          <!-- <v-btn v-bind="attrs" v-on="on">

          </v-btn> -->


        <!-- </template> -->



        <v-card>
          <!-- <v-card-title><span class="text-h5">User Profile</span>/v-card-title> -->
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
                        <v-text-field v-model="building.slug" :label="$t('buildings.labelSlug')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="building.name.en" :label="$t('buildings.labelNameEn')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="building.name.ru" :label="$t('buildings.labelNameRu')" />
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
                          class="mx-2"
                          :label="$t('buildings.labelDescriptionEn')"
                          rows="1"
                          v-model="building.description.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          class="mx-2"
                          :label="$t('buildings.labelDescriptionRu')"
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
                          :label="$t('buildings.labelOriginList')"
                          multiple
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          v-model="currentTypes"
                          :items="typeList"
                          :menu-props="{ maxHeight: '400' }"
                          :label="$t('buildings.labelTypeList')"
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

                <v-btn color="primary" @click="e1 = 2">
                  Continue
                </v-btn>

                <v-btn text>
                  Cancel
                </v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        {{ $t('buildings.labelImageIcon') }}
                        <v-row>
                          <v-col cols="6" sm="6" md="6">
                            <v-text-field v-model="building.images.icon.url" :label="'i18n icon'" />

                            <!-- <v-file-input accept="image/*" @change="previewImage($event, 'icon')" label="File input"/> -->
                            <!-- <p>Progress: {{ uploadValue.toFixed() + "%" }} -->
                            <!-- <progress id="progress" :value="uploadValue" max="100" ></progress>  </p> -->
                          </v-col>
                          <v-col cols="4" sm="4" md="4">
                            <v-btn @click="onUpload('icon')">
                              {{ $t('buildings.uploadBtnName') }}
                            </v-btn>
                          </v-col>
                          <v-col cols="2" sm="2" md="2">
                            <!-- <template v-if="building.images.icon.url"> -->
                              <!-- <img class="preview" :src="building.images.icon.url"> -->
                            <!-- </template> -->
                            <!-- <template v-else> -->
                              <!-- <img v-if="images.icon.imageData != null" class="preview" :src="images.icon.picture"> -->
                            <!-- </template> -->
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" sm="12" md="12" v-for="item in 7" :key="item">
                        {{ $t('buildings.labelImage') + ` ${item}` }}
                        <v-text-field v-model="building.images[`image${item}`].url" :label="'i18n image'" />

                        <!-- <v-row>
                          <v-col cols="6" sm="6" md="6">
                            <v-file-input accept="image/*" @change="previewImage($event, `image${item}`)" label="File input"/>
                          </v-col>
                          <v-col cols="4" sm="4" md="4">
                            <v-btn @click="onUpload(`image${item}`)">
                              {{ $t('buildings.uploadBtnName') }}
                            </v-btn>
                          </v-col>
                          <v-col cols="2" sm="2" md="2">
                            <template v-if="building.images[`image${item}`].url">
                              <img class="preview" :src="building.images[`image${item}`].url">
                            </template>
                            <template v-else>
                              <img v-if="images[`image${item}`].imageData != null" class="preview" :src="images[`image${item}`].picture">
                            </template>
                          </v-col>
                        </v-row> -->
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
                    <v-text-field v-model="building.productionResource.amount" :label="$t('buildings.labelProductionResourceAmount')" />
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
                      <v-text-field v-model="building.moveCost[`level${lvl}`].resource1.amount" :label="$t('buildings.labelProductionResourceAmount')" />
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
                      <v-text-field v-model="building.moveCost[`level${lvl}`].resource2.amount" :label="$t('buildings.labelProductionResourceAmount')" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="building.moveCost[`level${lvl}`].premium.amount" :label="$t('buildings.labelMoveResourcePremium')" />
                    </v-col>
                  </v-row>
                </div>

                <v-btn color="primary">
                  Add
                </v-btn>
                <v-btn text>
                  Cancel
                </v-btn>
              </v-stepper-content>
              <!-- STEP 5 -->
              <v-stepper-content step="5">
                <div v-for="lvl in 7" :key="lvl">
                  <h2>Build resource {{ lvl }}</h2>

                                        <!-- {{ building.upgradeCost }} -->


                  <v-row>
                    <v-col cols="9" sm="9" md="9">
                      <v-select
                        v-model="building.upgradeCost[`level${lvl}`].resource1.slug"
                        :items="resourcesSelectList"
                        :menu-props="{ maxHeight: '400' }"
                        :label="$t('buildings.labelUpgradeResource') + ` ${lvl}a`"
                      >
                        <template v-slot:item="data">
                          <img :src="getResourceIconUrl(data.item)" alt="">
                          {{ data.item }}
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-text-field v-model="building.upgradeCost[`level${lvl}`].resource1.amount" :label="$t('buildings.labelProductionResourceAmount')" />
                    </v-col>
                  </v-row>
                  <v-row v-if="building.upgradeCost[`level${lvl}`].resource2">
                    <v-col cols="9" sm="9" md="9">
                      <v-select
                        v-model="building.upgradeCost[`level${lvl}`].resource2.slug"
                        :items="resourcesSelectList"
                        :menu-props="{ maxHeight: '400' }"
                        :label="$t('buildings.labelUpgradeResource') + ` ${lvl}b`"
                      >
                        <template v-slot:item="data">
                          <img :src="getResourceIconUrl(data.item)" alt="">
                          {{ data.item }}
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <v-text-field v-model="building.upgradeCost[`level${lvl}`].resource2.amount" :label="$t('buildings.labelProductionResourceAmount')" />
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
              {{ $t('buildings.dialogBtnAdd') }}
            </v-btn>

            <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editBuilding">
              {{ $t('buildings.dialogBtnEdit') }}
            </v-btn>


          </v-card-actions>
        </v-card>
      </v-dialog>
      <button @click="test">test</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  head() {
    return { title: this.$t('buildings.title') }
  },
  data() {
    return {
      originList: ['basic', 'someOne'],
      currentOrigins: ['basic'],
      typeList: ['workshop', 'someOne'],
      currentTypes: ['workshop'],

      building: {
        id: null,
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
          slug: 'shoal',
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

      images: {
        icon: {
          name: 'icon',
          imageData: null,
          picture: null,
          uploadValue: 0,
        },
        image1: {
          name: '1',
          imageData: null,
          picture: null,
          uploadValue: 0,
        },
        image2: {
          name: '2',
          imageData: null,
          picture: null,
          uploadValue: 0,
        },
        image3: {
          name: '3',
          imageData: null,
          picture: null,
          uploadValue: 0,
        },
        image4: {
          name: '4',
          imageData: null,
          picture: null,
          uploadValue: 0,
        },
        image5: {
          name: '5',
          imageData: null,
          picture: null,
          uploadValue: 0,
        },
        image6: {
          name: '6',
          imageData: null,
          picture: null,
          uploadValue: 0,
        },
        image7: {
          name: '7',
          imageData: null,
          picture: null,
          uploadValue: 0,
        },
      },

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
    setItemSize(valueX, valueY) {
      this.building.sizeMatrix[`x${valueX}`][`y${valueY}`] = !this.building.sizeMatrix[`x${valueX}`][`y${valueY}`]
    },
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
      return this.resources[slug].image.url
    },
    test() {
      this.getResourceIcon()
    },
    previewImage(event, imageProp) {
      console.log('event: ', event, imageProp);
      this.images[imageProp].uploadValue = 0
      this.images[imageProp].picture = null
      this.images[imageProp].imageData = event
      // this.images[imageProp].imageData = event.target.files[0]
    },

    onUpload(imageProp) {
      this.images[imageProp].picture = null

      const storageRef = firebase.storage()
        .ref(`img/buildings/${this.building.slug}-${this.images[imageProp].name}`)
        .put(this.images[imageProp].imageData)
      storageRef.on(
        `state_changed`,
        snapshot => { this.images[imageProp].uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 },
        error => { console.log(error.message) },
        () => { this.images[imageProp].uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            console.log('url: ', url);
            console.log('this.building: ', this.building);
            this.images[imageProp].picture = url
            console.log('this.images: ', this.images);
            this.building.images[imageProp] = { url }
            console.log('this.building.images: ', this.building.images);
          })
        }
      )
      console.log('this.building: ', this.building);
      // this.building.images[imageProp].url = this.images[imageProp].picture
      console.log('this.building: ', this.building);
    },
    dialogAdd() {
      this.dialog = true
      this.dialogCurrent = 'Add'

      // auto-name img
      for(let i = 1; i <= 7; i++) {
        this.building.images[`image${i}`].url = `/img/buildings/${this.building.slug}-${i}.png`
      }
      this.building.images.icon.url = `/img/buildings/${this.building.slug}-icon.png`
    },
    dialogEdit(slug) {
      this.dialog = true
      this.dialogCurrent = 'Edit'
      this.building = this.buildings[slug]



      // this.building.weight = 0
      // this.building.origins = {}
      // this.building.types =  {}


      if(this.building.destroyReturnResources.resource1) {
        this.showDestroyReturnResources1 = true
      }
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
            this.dialog = false
          }
        })
        .catch(error => {
          this.dialog = false
          console.log('error: ', error);
        })
    },
    addBuilding() {
      this.building.id = Object.keys(this.buildings).length + 1

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
    }
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
.edit-building {
  right: 0;
  top: 0;
  position: absolute;
}
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
</style>
