<template>
  <div class="Content">
    <v-breadcrumbs :items="breadcrumps" divider="-"/>

    <div class="container">

      <v-btn small class="_edit-building" @click="dialogAdd('production')">
        {{ $t('marshals.addMarshal') }}
      </v-btn>

      <h1 class="Content__Title">
        {{ $t('marshals.title') }}
      </h1>

      <div v-if="dataLoaded" class="buildings-wrap">
        <div v-for="item in sortMarshals" :key="item.id" class="building">
          <NuxtLink :to="`/specialists/marshals/${item.slug}`" class="img-link"><img :src="item.imageUrl" alt="" v-if="item.imageUrl"></NuxtLink>
          <NuxtLink :to="`/specialists/marshals/${item.slug}`" class="text-link">{{ item.name.en }}</NuxtLink>
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
                        <v-text-field v-model="marshal.slug" :label="$t('labels.slug')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="marshal.name.en" :label="$t('labels.nameEn')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="marshal.name.ru" :label="$t('labels.nameRu')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field v-model="marshal.weight" :label="$t('labels.weight')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="marshal.requiredLevel" :label="$t('labels.requiredLevel')" />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionEn')"
                          rows="1"
                          v-model="marshal.description.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionRu')"
                          rows="1"
                          v-model="marshal.description.ru"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('marshals.labelGameDescriptionEn')"
                          rows="1"
                          v-model="marshal.gameDescription.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('marshals.labelGameDescriptionRu')"
                          rows="1"
                          v-model="marshal.gameDescription.ru"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('marshals.labelGameExclaimEn')"
                          rows="1"
                          v-model="marshal.gameExclaim.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('marshals.labelGameExclaimRu')"
                          rows="1"
                          v-model="marshal.gameExclaim.ru"
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
                        <v-text-field v-model="marshal.imageUrl" :label="$t('labels.imageUrl')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="marshal.garrisonImageUrl" :label="$t('marshals.labelGarrisonImageUrl')" />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="marshal.travelTime" :label="$t('marshals.labelTravelTime')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="marshal.travelTimeBack" :label="$t('marshals.labelTravelTimeBack')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="marshal.type" :label="$t('marshals.labelType')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="marshal.unitCapacity" :label="$t('marshals.labelUnitCapacity')" />
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
            <v-btn v-if="dialogCurrent === 'Add'" color="blue darken-1" text @click="addMarshal">
              {{ $t('buttons.add') }}
            </v-btn>

            <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editMarshal">
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
          text: 'Marshals',
          disabled: true,
        },
      ],
      originList: ['tavern', 'someOne'],
      currentOrigins: ['tavern'],

      marshal: {
        slug: 'marshal',
        name: {
          default: 'Marshal',
          en: 'Marshal',
          ru: 'Marshal',
        },
        imageUrl: '/img/specialists/marshal.png',
        garrisonImageUrl: '/img/specialists/marshal-garrison.png',

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

        travelTime: 1,
        travelTimeBack: 1,
        type: "", // transport, warior
        unitCapacity: null,

      },

      dialog: false,

      e1: 1,

      marshals: {},

      dataLoaded: false,

      dialogCurrent: 'Add',
    }
  },
  computed: {
    sortMarshals() {
      let arr = []
      for(let marshal in this.marshals) {
        arr.push(this.marshals[marshal])
      }
      console.log('this.arr', arr.sort((a, b) => a.weight - b.weight))
      return arr.sort((a, b) => a.weight - b.weight)
    }
  },
  async created() {
      this.marshals = await this.$store.dispatch('specialists/marshals/getAll')
      this.dataLoaded = true
  },
  methods: {
    dialogAdd(type) {
      this.dialog = true
      this.dialogCurrent = 'Add'
    },
    dialogEdit(slug) {
      this.marshal = this.marshals[slug]
      if(!this.marshal.gameExclaim) {
        this.marshal.gameExclaim = {
          default: null,
          en: null,
          ru: null,
        }
      }

      this.currentOrigins = []
      for(const prop in this.marshal.origins) {
        this.currentOrigins.push(this.marshal.origins[prop])
      }

      this.dialogCurrent = 'Edit'
      this.dialog = true
    },
    editMarshal() {
      this.marshal.origins = {}
      this.currentOrigins.forEach((el, idx) => {
        this.marshal.origins[idx] = el
      })

      this.$store.dispatch('specialists/marshals/edit', this.marshal)
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
    addMarshal() {
      this.currentOrigins.forEach((el, idx) => {
        this.marshal.origins[idx] = el
      })

      this.$store.dispatch('specialists/marshals/add', this.marshal)
        .then(res => {
          if(res) {
            this.dialog = false
            this.marshals[this.marshal.slug] = res
          }
        })
        .catch(error => {
          this.dialog = false
          console.log('error: ', error);
        })
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
img.preview {
  width: 50px;
}
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
