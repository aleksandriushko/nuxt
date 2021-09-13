<template>
  <div class="Content">
    <div class="container">
      <h1 class="Content__Title">
        {{ $t('buffs.title') }}
      </h1>

      <div v-if="buffsLoaded" class="buffs-wrap">
        <div v-for="item in sortBuffs" :key="item.slug" class="buff">

          <NuxtLink :to="`/buffs/${item.slug}`" :class="item.slug.includes('add-resource') ? 'add-resources' : ''">
            <!-- <div v-if="item.slug.includes('add-resources')">
              buff
              add-resources
              <img src="" alt="">
            </div> -->
            <img :src="item.imageUrl" alt="" v-if="item.imageUrl">
          </NuxtLink>
          <NuxtLink :to="`/buffs/${item.slug}`">{{ item.name.en }}</NuxtLink>

          <v-btn small class="edit-buff">
            <v-icon color="primary" @click="dialogEdit(item.slug)">
              mdi-pencil
            </v-icon>
          </v-btn>
        </div>
      </div>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            {{ $t('buffs.addBuff') }}
          </v-btn>
        </template>
        <v-card>
          <!-- <v-card-title><span class="text-h5">User Profile</span>/v-card-title> -->
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1" editable>
                Name
              </v-stepper-step>

              <template v-for="(building, idx) in currentBuildings" >
                <v-divider :key="idx" />
                <v-stepper-step :key="`header ${building + idx}`" :complete="e1 > idx + 2" :step="idx + 2" editable>
                  {{ building }}
                </v-stepper-step>
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="buff.slug" :label="$t('labels.slug')" disabled />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="buff.name.en" :label="$t('labels.nameEn')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="buff.name.ru" :label="$t('labels.nameRu')" />
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionEn')"
                          rows="1"
                          v-model="buff.description.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionRu')"
                          rows="1"
                          v-model="buff.description.ru"
                        />
                      </v-col>

                      <v-col cols="12">
                        <v-textarea :label="$t('labels.gameDescriptionEn')" rows="1" v-model="buff.gameDescription.en" />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea :label="$t('labels.gameDescriptionRu')" rows="1" v-model="buff.gameDescription.ru" />
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="buff.imageUrl" :label="$t('labels.imageUrl')" disabled />
                      </v-col>

                      <v-col cols="6">
                        <v-select
                          v-model="currentTypes"
                          :items="typeList"
                          :menu-props="{ maxHeight: '400' }"
                          :label="$t('labels.typeList')"
                        />
                      </v-col>
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
                          v-model="currentBuildings"
                          :items="buildingList"
                          :menu-props="{ maxHeight: '400' }"
                          :label="$t('buffs.labelCurrentBuildings')"
                          multiple
                        />
                      </v-col>

                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="buff.target" :label="$t('buffs.labelTarget')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field v-model="buff.effectType" :label="$t('buffs.labelEffectType')" />
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="buff.effectName" :label="$t('buffs.labelEffectName')" />
                      </v-col>

                      <v-col cols="4" v-if="buff.effectType !== 'revives' && buff.effectType !== 'collectibles'">
                        <v-text-field v-model="buff.effectValue" :label="$t('buffs.labelEffectValue')" />
                      </v-col>

                      <template v-if="currentTypes === 'buff'">
                        <template v-if="buff.effectType !== 'revives' && buff.effectType !== 'collectibles'">
                          <v-col cols="12">
                            <h2>{{ $t('buffs.titleEffectDuration') }}</h2>
                          </v-col>
                          <v-col cols="3">
                            <v-text-field v-model="buff.effectDuration.seconds" :label="$t('labels.seconds')" />
                          </v-col>
                          <v-col cols="3">
                            <v-text-field v-model="buff.effectDuration.minutes" :label="$t('labels.minutes')" />
                          </v-col>
                          <v-col cols="3">
                            <v-text-field v-model="buff.effectDuration.hours" :label="$t('labels.hours')" />
                          </v-col>
                          <v-col cols="3">
                            <v-text-field v-model="buff.effectDuration.days" :label="$t('labels.days')" />
                          </v-col>
                        </template>
                      </template>

                    </v-row>

                    <v-row>
                      <v-col cols="3">
                        <v-checkbox v-model="buff.canTrade" :label="$t('buffs.labelCanTrade')" />
                      </v-col>
                      <v-col cols="3">
                        <v-checkbox v-model="buff.frendBuff" :label="$t('buffs.labelFrendBuff')" />
                      </v-col>
                      <v-col cols="3">
                        <v-checkbox v-model="buff.areaBuff" :label="$t('buffs.labelAreaBuff')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field  v-model="buff.weight" :label="$t('labels.weight')" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-stepper-content>


              <v-stepper-content v-for="(building, idx) in currentBuildings" :key="building + idx" :step="idx + 2">
                <v-card-text v-if="building === 'provision-house'">
                  <v-container>

                    <v-row>
                      <v-col cols="12">
                        <h2>{{ $t('buffs.titleProductionTime') }}</h2>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="buff.origins[idx].productionTime.seconds" :label="$t('labels.seconds')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="buff.origins[idx].productionTime.minutes" :label="$t('labels.minutes')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="buff.origins[idx].productionTime.hours" :label="$t('labels.hours')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="buff.origins[idx].productionTime.days" :label="$t('labels.days')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field v-model="buff.origins[idx].amount" :label="$t('labels.amount')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="buff.origins[idx].requiredLevel" :label="$t('labels.requiredLevel')" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="buff.origins[idx].buttonIconUrl" :label="$t('buffs.labelButtonIconUrl')" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="buff.origins[idx].buttonName.en" :label="$t('buffs.labelButtonName') + ' En'" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="buff.origins[idx].buttonName.ru" :label="$t('buffs.labelButtonName') + ' Ru'" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea v-model="buff.origins[idx].buttonDescription.en" :label="$t('buffs.labelButtonDescriptionEn')" rows="1"/>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea v-model="buff.origins[idx].buttonDescription.ru" :label="$t('buffs.labelButtonDescriptionRu')" rows="1" />
                      </v-col>
                    </v-row>

                    <v-row>
                      <template v-for="resourceNum in consumptionResourceCount[idx]">
                        <v-col :key="'key-consumption-slug' + resourceNum" cols="9" sm="9" md="9">
                          <v-select
                            v-model="buff.origins[idx].consumptionResources[resourceNum - 1].slug"
                            :items="resourcesSelectList"
                            :menu-props="{ maxHeight: '400' }"
                            :label="$t('labels.consumptionResource') + ` ${resourceNum}`"
                          >
                            <template v-slot:item="data">
                              <img :src="getResourceIconUrl(data.item)" alt="">
                              {{ data.item }}
                            </template>
                          </v-select>
                        </v-col>
                        <v-col cols="3" sm="3" md="3" :key="'key-consumption-amount' + resourceNum" >
                          <v-text-field v-model="buff.origins[idx].consumptionResources[resourceNum - 1].amount" :label="$t('labels.amount')" />
                        </v-col>
                      </template>
                    </v-row>

                    <v-btn color="primary" @click="addConsumptionResource(idx)">
                      {{ $t('buttons.addConsumptionResource') }}
                    </v-btn>
                    <button @click="test">test</button>

                  </v-container>
                </v-card-text>
              </v-stepper-content>

              <!-- <v-stepper-content step="3">
              </v-stepper-content> -->

            </v-stepper-items>
          </v-stepper>

          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="addPovisionHouse()">
              addPovisionHouse
            </v-btn>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn v-if="dialogCurrent === 'Add'" color="blue darken-1" text @click="addBuff">
              {{ $t('buttons.add') }}
            </v-btn>

            <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editBuff">
              {{ $t('buttons.edit') }}
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  head() {
    return { title: this.$t('buffs.title') }
  },
  data() {
    return {
      // originList: ['provision-house', 'someOne'],
      originList: ['building', 'someOne'],
      currentOrigins: ['building'],
      buildingList: ['provision-house', 'someOne'],
      currentBuildings: ['provision-house'],
      typeList: ['buff', 'deposits', 'resources', 'weekly-challange'], // какой характер бафа
      currentTypes: 'resources',

      // addSomeBuilding: '',


      consumptionResourceCount: {
        '0': 1,
        // '1': 1,
        // '2': 1,
      },

      buff: {
        slug: 'add-resource-longbows',
        //
        name: {
          en: 'Add resource: [X] Longbows',
          ru: 'Add resource: [X] Longbows',
        },
        description: {
          en: 'description en',
          ru: 'description ru',
        },
        gameDescription: {
          en: 'game description en',
          ru: 'game description ru',
        },
        imageUrl: '/img/resources/longbows.png',

        // target: 'workyard', // на какой тип здания можно наложить
        // type: 'buff',
        // effectType: 'output', // output +100%
        // outputValue: 100, // output +100%


        // target: {
        //   en: 'Generals on an adventure'
        // },
        target: 'mayors-house', // workyard, zone-all-generals, marshal, 1.island(collectibles)
        type: 'add-resource', // buff, add-to-deposit

        effectName: 'add-resource', // output, revives, 1.shuffle-collectibles, movement-speed, 2.add-to-deposit, 3.add-resource
        effectType: 'add-resource', // output, revives, 1.collectibles, zone-effect, 2.add-to-deposit, 3.add-resource
        effectValue: 1,

        // effectDuration: {
        //   seconds: 0,
        //   minutes: 0,
        //   hours: 2,
        //   days: 0
        // },

        origins: {
          '0': {
            requiredLevel: 7,
            typeOrigin: 'building',
            typeProduction: 'resources', // если например мгновенно активируется
            slugBuilding: 'provision-house', // переделать в slugBuilding
            // tabProvisionHouse: 'Buff',
            productionTime: {
              seconds: 0,
              minutes: 15,
              hours: 0,
              days: 0
            },
            amount: 10,
            buttonName: {
              'en': 'Used Longbows',
              'ru': 'Used Longbows'
            },
            buttonIconUrl: '/img/buffs/used-longbows.png',
            buttonDescription: {
              en: 'button description en',
              ru: 'button description ru',
            },
            consumptionResources: {
              '0': {
                slug: 'bows',
                amount: 500,
              },
            },
          },

        },
        canTrade: false,
        frendBuff: false,
        areaBuff: false,
        weight: 17,
        // areaSize: {
        //   x: 2,
        //   y: 2
        // }



        // note: 'This buff affects only a single adventure',

        // бафы могут быть полученны разними способами
        //    например в бандле эвента, в магазине или в здании

        // бафы могут быть: для мастерской, УМ, буст населения для школы, для грандиозной
        //                  пополнение дипозитов: рыба, мясо, залежи, ферма
        //                  глобальные уселители: проиводство, генералы, премиум, пуд, руководства
        //                  депозиты: странно но это баф (все ресурсы которые можно добавить на ратуше)
        //                  квесты: затей, сценарии, виклики
        //                  перемешать все предметы на сотрове, показать все предметы...
        //                  убирает скин дания, убирает скин острова, изменение острова, скины зданий
        //                  войска
        //                  переплетчик
        //                  военные (стрелы), аптечки
        //                  конкретные здания (фермы, охотники..)
        // бафы от зданий, как бы которые не попадают в стар меню, а сразу активируют баф


      },
      dialog: false,

      e1: 1,

      buffs: {},
      buffsLoaded: false,

      resources: {},

      dialogCurrent: 'Add',
    }
  },
  computed: {
    sortBuffs() {
      let arrBuffs = []
      for(let buffSlug in this.buffs) {
        arrBuffs.push(this.buffs[buffSlug])
      }
      return arrBuffs.sort((a, b) => a.weight - b.weight)
    },
    resourcesSelectList() {
      let list = []
      for(let item in this.resources) {
        list.push(item)
      }
      return list
    },
    slug() {
      // return 'aunt-irmas-gift-basket'
      return this.buff.name.en.toLowerCase().replace(' ', '-').replace('\'', '')
    },
    imageUrl() {
      return `/img/buffs/${this.slug}.png`
    }
  },
  async created() {
      this.buffs = await this.$store.dispatch('buffs/getAll')
      this.resources = await this.$store.dispatch('resources/getAll')
      console.log('this.resources: ', this.resources);
      console.log('this.buffs: ', this.buffs);
      this.buffsLoaded = true
  },
  methods: {
    addPovisionHouse() {
      this.buff.origins[this.buff.origins.length] = {
        requiredLevel: 1,
        typeOrigin: 'building',
        typeProduction: 'resources', // если например мгновенно активируется
        slugBuilding: 'provision-house', // переделать в slugBuilding
        productionTime: {
          seconds: 0,
          minutes: 2,
          hours: 0,
          days: 0
        },
        amount: 2,
        buttonName: 'Pumpkin Soup',
        buttonIconUrl: '/img/buffs/pumpkin-soup.png',
        buttonDescription: {
          en: 'button description en',
          ru: 'button description ru',
        },
        consumptionResources: {
          '0': {
            slug: 'pumpkins',
            amount: 5,
          },
        },
      }
      this.currentBuildings.push('provision-house')
      console.log('this.buff: ', this.buff.origins);
    },
    test() {
      this.currentBuildings.push('provision-house')
      this.buff
      console.log('this.buff: ', this.buff.origins);
    },
    dialogEdit(slug) {

      this.dialog = true
      this.dialogCurrent = 'Edit'
      // this.consumptionResourceCount = this.buffs[slug].origin[0].consumptionResources.length // переделать если зданий несколько
      this.buff = this.buffs[slug]
      this.buff.origins[0].buttonName = {
              'en': 'Used',
              'ru': 'Used'
            }

      // this.buff.origins[0].requiredLevel = 1
      // this.buff.weight = 1
      // this.buff.effectName = this.buff.effectType
      // this.buff.effectValue = this.buff.outputValue
    },
    editBuff() {
      this.$store.dispatch('buffs/edit', this.buff)
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
    addBuff() {
      this.dialogCurrent = 'Add'
      // this.buff.slug = this.slug
      // this.buff.imageUrl = this.imageUrl

      this.$store.dispatch('buffs/add', this.buff)
        .then(res => {
          // this.buff.name.en = ''
          // this.buff.name.ru = ''
          if(res) {
            this.dialog = false
            this.buffs[this.buff.slug] = res
          }
        })
        .catch(error => {
          this.dialog = false
          console.log('error: ', error);
        })
    },
    addConsumptionResource(idx) {
      this.buff.origins[idx].consumptionResources[this.consumptionResourceCount] = {}
      this.buff.origins[idx].consumptionResources[this.consumptionResourceCount].slug = ''
      this.buff.origins[idx].consumptionResources[this.consumptionResourceCount].amount = 0
      this.consumptionResourceCount++
      console.log('this.buff.origins: ', this.buff.origins);
      console.log('this.buff.origins[idx].consumptionResources: ', this.buff.origins[idx].consumptionResources);
    },
    getResourceIconUrl(slug) {
      return this.resources[slug].imageUrl
    },
  }
}
</script>

<style scoped>
.buffs-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-top: 1px solid black;
    border-left: 1px solid black;
}
.buff {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.edit-buff{
    right: 0;
    top: 0;
    position: absolute;
}
img.preview {
    width: 50px;
}
a.add-resources {
    background-image: url(/img/buffs/add-resources.png);
    width: 50px;
    height: 50px;
    background-size: contain;
    background-position: center;
}
a.add-resources img {
    position: relative;
    top: 23px;
    left: -1px;
    width: 24px;
}
</style>
