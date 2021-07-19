<template>
  <div class="Content">
    <v-breadcrumbs :items="breadcrumps" divider="-"/>

    <div class="container">

      <v-btn small class="_edit-building" @click="dialogAdd('production')">
        {{ $t('generals.addGeneral') }}
      </v-btn>

      <!-- <v-btn small class="_edit-building" @click="dialogSpec = true">
        {{ $t('buildings.addSpecBuilding') }}
      </v-btn> -->

      <h1 class="Content__Title">
        {{ $t('generals.title') }}
      </h1>

      <div v-if="dataLoaded" class="buildings-wrap">
        <div v-for="item in sortGenerals" :key="item.id" class="building">
          <NuxtLink :to="`/specialists/generals/${item.slug}`" class="img-link"><img :src="item.imageUrl" alt="" v-if="item.imageUrl"></NuxtLink>
          <NuxtLink :to="`/specialists/generals/${item.slug}`" class="text-link">{{ item.name.en }}</NuxtLink>
          <div class="level-text">{{ item.requiredLevel }}</div>
          <v-btn small class="edit-building" @click="dialogEdit(item.slug)">
            <v-icon color="primary">
              mdi-pencil
            </v-icon>
          </v-btn>
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

              <v-stepper-step step="3" editable>
                Characteristics
              </v-stepper-step>
              <v-divider />

            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="general.slug" :label="$t('labels.slug')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="general.name.en" :label="$t('labels.nameEn')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="general.name.ru" :label="$t('labels.nameRu')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field v-model="general.weight" :label="$t('labels.weight')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="general.requiredLevel" :label="$t('labels.requiredLevel')" />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionEn')"
                          rows="1"
                          v-model="general.description.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionRu')"
                          rows="1"
                          v-model="general.description.ru"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('generals.labelGameDescriptionEn')"
                          rows="1"
                          v-model="general.gameDescription.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('generals.labelGameDescriptionRu')"
                          rows="1"
                          v-model="general.gameDescription.ru"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('generals.labelGameExclaimEn')"
                          rows="1"
                          v-model="general.gameExclaim.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('generals.labelGameExclaimRu')"
                          rows="1"
                          v-model="general.gameExclaim.ru"
                        />
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
                    </v-row>

                  </v-container>
                </v-card-text>

              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="general.imageUrl" :label="$t('labels.imageUrl')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="general.garrisonImageUrl" :label="$t('generals.labelGarrisonImageUrl')" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card-text>
                  <v-container>
                    <h2>{{ $t('generals.titleCharacteristics') }}</h2>

                    <v-row>
                      <v-col cols="3" sm="3" md="3">
                        <v-text-field v-model="general.characteristics.hitPoints" :label="$t('generals.labelHitPoints')" />
                      </v-col>
                      <v-col cols="3" sm="3" md="3">
                        <v-text-field v-model="general.characteristics.accuracy" :label="$t('generals.labelAccuracy')" />
                      </v-col>
                      <v-col cols="3" sm="3" md="3">
                        <v-text-field v-model="general.characteristics.travelTime" :label="$t('generals.labelTravelTime')" />
                      </v-col>
                      <v-col cols="3" sm="3" md="3">
                        <v-text-field v-model="general.characteristics.unitCapacity" :label="$t('generals.labelUnitCapacity')" />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="2" sm="2" md="2">
                        <v-text-field v-model="general.characteristics.minAttackDamage" :label="$t('generals.labelMinAttackDamage')" />
                      </v-col>
                      <v-col cols="2" sm="2" md="2">
                        <v-text-field v-model="general.characteristics.maxAttackDamage" :label="$t('generals.labelMaxAttackDamage')" />
                      </v-col>
                      <v-col cols="2" sm="2" md="2">
                        <v-text-field v-model="general.characteristics.initiative" :label="$t('generals.labelInitiative')" />
                      </v-col>
                      <v-col cols="3" sm="3" md="3">
                        <v-text-field v-model="general.characteristics.recoveryTime" :label="$t('generals.labelRecoveryTime')" />
                      </v-col>
                      <v-col cols="3" sm="3" md="3">
                        <v-text-field v-model="general.characteristics.combatRoundDuration" :label="$t('generals.labelCombatRoundDuration')" />
                      </v-col>
                    </v-row>

                    <h2>{{ $t('generals.titleAbilities') }}</h2>
                    <v-row>
                      <v-col v-for="(ability, idx) in abilitiesList" cols="3" sm="3" md="3" :key="idx" >
                        <v-checkbox v-model="currentAbilities" :label="ability"  />
                      </v-col>
                    </v-row>

                    <h2>{{ $t('generals.titleTrait') }}</h2>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="general.trait.name" :label="$t('generals.labelTraitName')" />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="general.trait.imageUrl" :label="$t('generals.labelTraitImageUrl')" />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('generals.labelTraitText')"
                          rows="1"
                          v-model="general.trait.text"
                        />
                      </v-col>
                    </v-row>

                  </v-container>
                </v-card-text>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn v-if="dialogCurrent === 'Add'" color="blue darken-1" text @click="addGeneral">
              {{ $t('buttons.add') }}
            </v-btn>

            <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editGeneral">
              {{ $t('buttons.edit') }}
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>


      <!-- <dialogSpecialBuilding :dialog="dialogSpec" :resources="resources" :editingSpecBuilding="editingSpecBuilding" :dialogCurrent="dialogCurrent"  @clicked="onDialogSpec" /> -->
      <!-- <button @click="test">test</button> -->
    </div>
  </div>
</template>

<script>
// import dialogSpecialBuilding from '@/components/elements/dialogSpecialBuilding'

export default {
  head() {
    return { title: this.$t('specialists.title') }
  },
  // components: {
  //   dialogSpecialBuilding
  // },
  data() {
    return {
      breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Specialists',
          disabled: false,
          href: '/specialists',
        },
        {
          text: 'Generals',
          disabled: true,
        },
      ],
      originList: ['tavern', 'someOne'],
      currentOrigins: ['tavern'],
      abilitiesList: ['Flanking', 'Splash damage', 'Demolition'],
      currentAbilities: null,


      general: {
        slug: 'general',
        name: {
          default: 'General',
          en: 'General',
          ru: 'General',
        },
        imageUrl: '/img/specialists/general.png',
        garrisonImageUrl: '/img/specialists/general-garrison.png',

        requiredLevel: 4,
        weight: 1,

        description: { // инфа моя для сео
          default: 'default description',
          en: 'description en',
          ru: 'description ru',
        },

        gameDescription: { // инфа которая в игре
          default: 'game default description',
          en: 'game description en',
          ru: 'game description ru',
        },

        gameExclaim: { // восклик, желтыми буквами
          default: null,
          en: null,
          ru: null,
        },

        origins: {}, // tavern, events, trader, present

        characteristics: {
          hitPoints: 1,
          accuracy: 80,
          travelTime: 30,
          unitCapacity: 200,
          minAttackDamage: 120,
          maxAttackDamage: 120,
          initiative: "Normal",
          recoveryTime: 240,
          combatRoundDuration: 20,
        },
        // abilities: [],
        abilities: null,
        trait: {
          name: null,
          imageUrl: null,
          text: null,
        }
        // trait: {
        //   name: null,
        //   imageUrl: null,
        //   text: null,
        // }

        // Hit points (HP)
        // Accuracy
        // Travel Time
        // Unit Capacity
        // Attack Damage (AD)
        // Initiative
        // Recovery Time
        // Combat Round Duration

        // Abilities - Flanking, Splash damage, Demolition

        // Trait





        // если событие, то тут же будет и его стоимость
        // у события так же может быть год и время проведения

        // Боевые характеристики
        // Вместимость войскВместимость войск: 280
        // Очки здоровья (ОЗ)Очки здоровья (ОЗ): 100
        // ТочностьТочность: 80%
        // Наносимый урон (НУ)Наносимый урон (НУ): 125-250
        // ИнициативаИнициатива: Первый удар
        // Время передвиженияВремя передвижения: 15 минут
        // Время восстановленияВремя восстановления: 1 час 20 минут
        // Длительность раунда битвыДлительность раунда битвы: 10 сек.
        // Способности: Обход с фланга, Урон по области.
        // Характеристика:
        // Великодушный:
        // Его сердце ещё добрее отцовского: он восстанавливает 20% от потерянных войск после каждого сражения.

      },

      dialog: false,

      e1: 1,

    //   resources: {},
      generals: {},

      dataLoaded: false,

      dialogCurrent: 'Add',
    }
  },
  computed: {
    // resourcesSelectList() {
    //   let list = []
    //   for(let item in this.resources) {
    //     list.push(item)
    //   }
    //   return list
    // },
    sortGenerals() {
      let arr = []
      for(let general in this.generals) {
        arr.push(this.generals[general])
      }
      console.log('this.arr', arr.sort((a, b) => a.weight - b.weight))
      return arr.sort((a, b) => a.weight - b.weight)
    }

  },
  async created() {
      this.generals = await this.$store.dispatch('specialists/generals/getAll')
      // this.resources = await this.$store.dispatch('resources/getAll')
      // window.buildings = this.buildings
      // console.log('this.resources: ', this.resources);
      // console.log('this.buildings: ', this.buildings);
      this.dataLoaded = true
  },
  methods: {
    dialogAdd(type) {
      // if(type === 'special') {

      // } else {
        this.dialog = true
        this.dialogCurrent = 'Add'
      // }
    },
    dialogEdit(slug) {
      this.general = this.generals[slug]

      this.currentOrigins = []
      for(const prop in this.general.origins) {
        this.currentOrigins.push(this.general.origins[prop])
      }

      this.dialogCurrent = 'Edit'
      this.dialog = true
    },
    editGeneral() {
      this.general.origins = {}
      this.currentOrigins.forEach((el, idx) => {
        this.general.origins[idx] = el
      })

      this.$store.dispatch('specialists/generals/edit', this.general)
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
    addGeneral() {
      this.currentOrigins.forEach((el, idx) => {
        this.general.origins[idx] = el
      })

      this.$store.dispatch('specialists/generals/add', this.general)
        .then(res => {
          if(res) {
            this.dialog = false
            this.generals[this.general.slug] = res
          }
        })
        .catch(error => {
          this.dialog = false
          console.log('error: ', error);
        })
    },
  //   onDialogSpec(data) {
  //     if(data.type === 'add') {
  //       this.dialogSpec = false
  //     } else if(data.type === 'edit') {

  //       this.dialogSpec = false
  //     } else if(data.type === 'close') {
  //       this.dialogSpec = false
  //     } else {
  //       this.dialogSpec = false
  //     }
  //   }
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
</style>
