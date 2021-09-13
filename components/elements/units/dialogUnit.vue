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
              {{ $t('tabs.characteristics') }}
            </v-stepper-step>
            <v-divider />

            <v-stepper-step step="3" editable>
              {{ $t(`units.tabBarracks`) }}
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- STEP 1 -->
            <v-stepper-content step="1" v-if="showTab[1]">
              <v-card-text>
                <v-container>

                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="unit.slug" :label="$t('labels.slug')" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="unit.name.en" :label="$t('labels.nameEn')" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="unit.name.ru" :label="$t('labels.nameRu')" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="2">
                      <img :src="unit.imageUrl" alt="">
                    </v-col>
                    <v-col cols="10">
                      <v-text-field v-model="unit.imageUrl" :label="$t('labels.imageUrl')" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="unit.description.en" :label="$t('labels.descriptionEn')" rows="1" />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="unit.description.ru" :label="$t('labels.descriptionRu')" rows="1" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <v-textarea v-model="unit.gameDescription.en" :label="$t('labels.gameDescriptionEn')" rows="1" />
                    </v-col>
                    <v-col cols="12">
                      <v-textarea v-model="unit.gameDescription.ru" :label="$t('labels.gameDescriptionRu')" rows="1" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-text-field v-model="unit.requiredLevel" :label="$t('labels.requiredLevel')" />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field v-model="unit.weight" :label="$t('labels.weight')" />
                    </v-col>
                    <v-col class="resource-icon" cols="1">
                      <img :src="`img/app/${unit.type}.png`" alt="">
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        v-model="unit.type"
                        :items="typeList"
                        :menu-props="{ maxHeight: '400' }"
                        :label="$t('labels.typeList')"
                      >
                        <template v-slot:item="data">
                          <img :src="`img/app/${data.item}.png`" alt="">
                          {{ data.item }}
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>



                </v-container>
              </v-card-text>
            </v-stepper-content>

            <!-- STEP 2 upgradeCost -->
            <v-stepper-content step="2" v-if="showTab[2]">

              <template v-if="unit.origin.buildingSlug === 'combat-academy'">
                <v-row>
                  <v-col cols="3">
                    <v-text-field v-model="unit.hitpoints" :label="$t('units.labelHitpoints')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.damage" :label="$t('units.labelDamage')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.stackSize" :label="$t('units.labelStackSize')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.experiencePoints" :label="$t('units.labelExperiencePoints')" />
                  </v-col>
                </v-row>
              </template>

              <template v-else>
                <v-row>
                  <v-col cols="3">
                    <v-text-field v-model="unit.hitpoints" :label="$t('units.labelHitpoints')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.accuracy" :label="$t('units.labelAccuracy')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.minDamage" :label="$t('units.labelMinDamage')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.maxDamage" :label="$t('units.labelMaxDamage')" />
                  </v-col>
                </v-row>
              </template>

              <template v-if="unit.origin.buildingSlug === 'combat-academy'">
                <v-row>
                  <!-- <v-col class="resource-icon" cols="1">
                    <img :src="`img/app/${unit.initiative}.png`" alt="">
                  </v-col> -->
                  <v-col cols="5">
                    <v-select
                      v-model="unit.bonusVsUnit"
                      :items="bonusVsUnitList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('units.labelBonusVsUnit')"
                    >
                      <template v-slot:item="data">
                        <img :src="`img/app/${data.item}.png`" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>

                  <v-col cols="3">
                    <v-text-field v-model="unit.bonusAmount" :label="$t('units.labelBonusAmount')" />
                  </v-col>
                </v-row>
              </template>

              <template v-else>
                <v-row>
                  <v-col class="resource-icon" cols="1">
                    <img :src="`img/app/${unit.initiative}.png`" alt="">
                  </v-col>
                  <v-col cols="5">
                    <v-select
                      v-model="unit.initiative"
                      :items="initiativeList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('units.labelInitiativeList')"
                    >
                      <template v-slot:item="data">
                        <img :src="`img/app/${data.item}.png`" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      v-model="unit.abilities"
                      :items="abilitiesList"
                      :menu-props="{ maxHeight: '400' }"
                      :label="$t('units.labelAbilitiesList')"
                      multiple
                    >
                      <template v-slot:item="data">
                        <img :src="`img/app/${data.item}.png`" alt="">
                        {{ data.item }}
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </template>


            </v-stepper-content>

            <!-- STEP 3 -->
            <v-stepper-content step="3" v-if="showTab[3]">

              <template>
                <h2>{{ $t('titles.production') }}</h2>

                <v-row>
                  <v-col cols="3">
                    <v-text-field v-model="unit.origin.productionTime.minutes" :label="$t('labels.minutes')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.origin.productionTime.seconds" :label="$t('labels.seconds')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.origin.productionTime.hours" :label="$t('labels.hours')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="unit.origin.productionTime.days" :label="$t('labels.days')" />
                  </v-col>
                </v-row>

                <template>
                  <v-row v-for="(resource, idx) in unit.origin.consumptionResources" :key="'consumption-resource' + idx">
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
          <v-btn v-if="dialogCurrent === 'Add'" color="blue darken-1" text @click="addUnit">
            {{ $t('buttons.add') }}
          </v-btn>

          <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editUnit">
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
    editingUnit: {
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
      initiativeList: ['last-strike', 'normal', 'first-strike'],
      bonusVsUnitList: ['cavalry', 'melee', 'ranged'],
      abilitiesList: ['flanking', 'demolition', 'splash-damage'],
      // typeList: ['defense', 'offense', 'heavy', 'swift'], // Offensive units, defensive units,  heavy units, swift units
      typeList: ['melee', 'ranged', 'cavalry', 'elite'], // melee, ranged, cavalry
      // currentTypes: 'defense',

      unit: {
        slug: 'recruit',
        name: {
          en: 'Recruit',
          ru: 'Recruit',
        },
        description: {
          en: 'description en',
          ru: 'description ru',
        },
        gameDescription: {
          en: 'game description en',
          ru: 'game description ru',
        },
        imageUrl: '/img/units/recruit.png',

        hitpoints: 0,
        minDamage: 0,
        maxDamage: 0,
        accuracy: 0,
        // Attributes
        // Experience Points


        // type: 'unit',
        // effectType: 'output', // output +100%
        // outputValue: 100, // output +100%



        type: 'add-resource', // unit, add-to-deposit

        origins: {
          '0': {
            requiredLevel: 15,
            typeOrigin: 'building',
            typeProduction: 'resources', // если например мгновенно активируется
            slugBuilding: 'provision-house', // переделать в slugBuilding

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
            buttonIconUrl: '/img/units/used-longbows.png',
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
        weight: 1,
      },

      e1: 1,

      units: {},
      unitsLoaded: false,

      currentTab: 1,
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
        this.unit = {
          slug: 'guardsman',
          name: {
            en: 'Guardsman',
            ru: 'Guardsman',
          },
          description: {
            en: 'description en',
            ru: 'description ru',
          },
          gameDescription: {
            en: 'game description en',
            ru: 'game description ru',
          },
          imageUrl: `/img/units/none.png`,

          hitpoints: 400,
          // accuracy: 100,
          // minDamage: 30,
          // maxDamage: 30,
          // initiative: 'normal', // normal, first-strike, last-strike

          damage: 10,
          bonusVsUnit: null, // melee, ranged, cavalry
          bonusAmount: null,
          stackSize: 10,
          experiencePoints: 1,




          // abilities: [], // demolition, splash-damage, flanking
          // Attributes

          requiredLevel: 30,
          weight: 23,

          type: 'elite', // defense, offense, heavy, swift  && melee, ranged, cavalry, elite

          origin: {
            buildingSlug: 'combat-academy', // barracks, elite-barracks, combat-academy
            productionTime: {
              seconds: 0,
              minutes: 6,
              hours: 0,
              days: 0
            },
            consumptionResources: {
              '0': {
                slug: 'settlers',
                amount: 1,
              },
              '1': {
                slug: 'brew',
                amount: 4,
              },
              // '2': {
              //   slug: 'platinum-sword',
              //   amount: 3,
              // },
              // '3': {
              //   slug: 'platinum-sword',
              //   amount: 1,
              // },
            },
          },
        }

        this.unit.imageUrl = `/img/units/${this.unit.slug}.png`

      }



      // this.showTab[1] = false // main
      // this.showTab[2] = false // images
      // this.showTab[3] = false // build
      this.showTab[4] = false // move
      this.showTab[5] = false // spec

      console.log('this.unit before data load: ', this.unit);
      this.dataForReeditingLoaded = true

    },
    editingUnit(unit) {
      console.log('dialog get unit: ', unit);

      this.unit = unit

      // this.showTab[1] = false // main
      // this.showTab[2] = false // images
      // this.showTab[3] = false // build
      this.showTab[4] = false // move
      // this.showTab[5] = false // spec

      console.log('-= editing.unit: ',  this.unit);
      this.dataForReeditingLoaded = true

    }
  },
  created() {
    console.log('created: dialog', this.dialog);
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
      this.unit
      console.log('this.unit: ', this.unit);
      // console.log('this.editingUnit: ', this.editingUnit);
    },
    addUnit() {
      this.$store.dispatch('units/add', this.unit)
          .then(res => {
            if(res) {
              console.log('unit added')
              // this.dialogSpec = false
              this.$emit('clicked', { type: 'add', unit: this.unit })
            }
          })
          .catch(error => {
            // this.dialogSpec = false
            this.$emit('clicked', { type: 'add', unit: this.unit })
            console.log('error: ', error);
          })
    },
    editUnit() {
      this.$store.dispatch('units/edit', this.unit)
        .then(res => {
          if(res) {
            this.$emit('clicked', { type: 'edit', unit: this.unit })
          }
        })
        .catch(error => {
          this.$emit('clicked', { type: 'edit', unit: this.unit })
          console.log('error: ', error);
        })
    },
    closeDialog() {
      this.$emit('clicked', { type: 'close', unit: this.unit })
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
