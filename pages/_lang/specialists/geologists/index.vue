<template>
  <div class="Content">
    <v-breadcrumbs :items="breadcrumps" divider="-"/>

    <div class="container">

      <v-btn small class="_edit-building" @click="dialogAdd('production')">
        {{ $t('geologists.addGeologist') }}
      </v-btn>

      <!-- <v-btn small class="_edit-building" @click="dialogSpec = true">
        {{ $t('buildings.addSpecBuilding') }}
      </v-btn> -->

      <h1 class="Content__Title">
        {{ $t('geologists.title') }}
      </h1>

      <div v-if="dataLoaded" class="buildings-wrap">
        <div v-for="item in sortGeologists" :key="item.id" class="building">
          <NuxtLink :to="`/specialists/geologists/${item.slug}`" class="img-link"><img :src="item.imageUrl" alt="" v-if="item.imageUrl"></NuxtLink>
          <NuxtLink :to="`/specialists/geologists/${item.slug}`" class="text-link">{{ item.name.en }}</NuxtLink>
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
                Resources
              </v-stepper-step>
              <v-divider />

            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="geologist.slug" :label="$t('labels.slug')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="geologist.name.en" :label="$t('labels.nameEn')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="geologist.name.ru" :label="$t('labels.nameRu')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field v-model="geologist.weight" :label="$t('labels.weight')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="geologist.requiredLevel" :label="$t('labels.requiredLevel')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="geologist.speed" :label="$t('geologists.labelSpeed')" />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionEn')"
                          rows="1"
                          v-model="geologist.description.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionRu')"
                          rows="1"
                          v-model="geologist.description.ru"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('geologists.labelGameDescriptionEn')"
                          rows="1"
                          v-model="geologist.gameDescription.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('geologists.labelGameDescriptionRu')"
                          rows="1"
                          v-model="geologist.gameDescription.ru"
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
                        <v-text-field v-model="geologist.imageUrl" :label="$t('labels.imageUrl')" />
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
            <v-btn v-if="dialogCurrent === 'Add'" color="blue darken-1" text @click="addGeologist">
              {{ $t('buttons.add') }}
            </v-btn>

            <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editBuilding">
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
          text: 'Geologists',
          disabled: true,
        },
      ],
      originList: ['tavern', 'someOne'],
      currentOrigins: ['tavern'],

      geologist: {
        slug: 'geologist',
        name: {
          default: 'Geologist',
          en: 'Geologist',
          ru: 'Geologist',
        },
        imageUrl: '/img/specialists/geologist.png',

        requiredLevel: 4,
        weight: 1,
        speed: 1,


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

        // specialSkills: { // особые навыки, текст того чем он выделяется
        //   default: 'default description',
        //   en: 'description en',
        //   ru: 'description ru',
        // },

        origins: {}, // tavern, events, trader, present


        // Геологу можно поручить поиск новых залежей ресурсов.
        // Веселый геолог	х 2
        // Веселый геолог может находить новые месторождения намного быстрее, чем стандартный геолог.
        // Добросовестный геолог	х 1
        // Добросовестный геолог находит больше месторождений, чем стандартный геолог.
        // Геолог с железной волей	х 1
        // Находит месторождения железной руды в два раза больше обычного за половину обычного времени.
        // Каменный холодный геолог	х 1
        // Находит отложения камня, мрамора и гранита вдвое больше обычного и вдвое быстрее обычного.
        // Опытный геолог	х 1
        // Находит депозит на 50% больше за половину обычного времени и имеет 50% шанс найти дополнительный депозит. Работает по всем видам вкладов!
        // Очаровательный геолог	х 1
        // Очаровательные месторождения Находит на 100% большие залежи железа, титана и селитры. Кроме того, есть 100% шанс найти месторождения тех типов, которые можно добыть вдвое быстрее.
        // Геолог с золотым сердцем	х 1
        // Золотое сердце Находит месторождения золотой руды, размер которых вдвое больше обычного, за половину обычного времени, и после успешного поиска пополняет другое случайное месторождение золота 100 золотой рудой.
        // Археолог-геолог	х 2
        // Имеет шанс найти клад при успешном обнаружении определенных месторождений. Это может быть пополнитель депозита, бафф или даже книга.
        // Тщательный геолог	х 1
        // Настаивая на том, чтобы никогда не оставлять камня на камне, он тратит в три раза больше времени на поиски депозитов. Но благодаря его скрупулезности он находит и втрое больше депозитов.
        // Прилежный геолог	х 1
        // Требуется в 6 раз больше времени для большинства поисков, но есть шанс найти два великих сокровища по пути.
        // При большинстве поисковых запросов любые найденные депозиты на 50% больше.
        // Шанс найти бонус при поиске

        // Мрамор 25%
        // железо 35%
        // уголь 50%
        // золотая руда 50%
        // титан 75%
        // селитра 75%
        // гранит 75%

        // Если сокровище найдено, в нем всегда будет два минерала.

        // Приятный геолог	х 1
        // В жизни дружелюбный геолог ничего не хочет больше, чем быть вашим другом. Чтобы попытаться подружиться с вами, он либо очень быстро найдет депозиты, либо вернется со сладким шоколадом после своих долгих поисков, раз в пару поисков.


      },

      dialog: false,

      e1: 1,

    //   resources: {},
      geologists: {},

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
    sortGeologists() {
      let arr = []
      for(let geologist in this.geologists) {
        arr.push(this.geologists[geologist])
      }
      console.log('this.arr', arr.sort((a, b) => a.weight - b.weight))
      return arr.sort((a, b) => a.weight - b.weight)
    }

  },
  async created() {
      this.geologists = await this.$store.dispatch('specialists/geologists/getAll')
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
      this.geologist = this.geologists[slug]

      this.currentOrigins = []
      for(const prop in this.geologist.origins) {
        this.currentOrigins.push(this.geologist.origins[prop])
      }

      this.dialogCurrent = 'Edit'
      this.dialog = true
    },
    editBuilding() {
      this.geologist.origins = {}
      this.currentOrigins.forEach((el, idx) => {
        this.geologist.origins[idx] = el
      })

      this.$store.dispatch('specialists/geologists/edit', this.geologist)
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
    addGeologist() {
      this.currentOrigins.forEach((el, idx) => {
        this.geologist.origins[idx] = el
      })

      this.$store.dispatch('specialists/geologists/add', this.geologist)
        .then(res => {
          if(res) {
            this.dialog = false
            this.geologists[this.geologist.slug] = res
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
