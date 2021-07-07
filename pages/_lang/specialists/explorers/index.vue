<template>
  <div class="Content">
    <v-breadcrumbs :items="breadcrumps" divider="-"/>

    <div class="container">

      <v-btn small class="_edit-building" @click="dialogAdd('production')">
        {{ $t('explorers.addExplorer') }}
      </v-btn>

      <!-- <v-btn small class="_edit-building" @click="dialogSpec = true">
        {{ $t('buildings.addSpecBuilding') }}
      </v-btn> -->

      <h1 class="Content__Title">
        {{ $t('explorers.title') }}
      </h1>

      <div v-if="dataLoaded" class="buildings-wrap">
        <div v-for="item in sortExplorers" :key="item.id" class="building">
          <NuxtLink :to="`/specialists/explorers/${item.slug}`" class="img-link"><img :src="item.imageUrl" alt="" v-if="item.imageUrl"></NuxtLink>
          <NuxtLink :to="`/specialists/explorers/${item.slug}`" class="text-link">{{ item.name.en }}</NuxtLink>
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
                        <v-text-field v-model="explorer.slug" :label="$t('labels.slug')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="explorer.name.en" :label="$t('labels.nameEn')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="explorer.name.ru" :label="$t('labels.nameRu')" />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field v-model="explorer.weight" :label="$t('labels.weight')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="explorer.requiredLevel" :label="$t('labels.requiredLevel')" />
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="explorer.speed" :label="$t('explorers.labelSpeed')" />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionEn')"
                          rows="1"
                          v-model="explorer.description.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('labels.descriptionRu')"
                          rows="1"
                          v-model="explorer.description.ru"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('explorers.labelGameDescriptionEn')"
                          rows="1"
                          v-model="explorer.gameDescription.en"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          :label="$t('explorers.labelGameDescriptionRu')"
                          rows="1"
                          v-model="explorer.gameDescription.ru"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6">
                        <v-select
                          v-model="currentOrigins"
                          :items="originList"
                          :menu-props="{ maxHeight: '400' }"
                          :label="$t('explorers.labelOriginList')"
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
                        <v-text-field v-model="explorer.imageUrl" :label="$t('labels.imageUrl')" />
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
            <v-btn v-if="dialogCurrent === 'Add'" color="blue darken-1" text @click="addExplorer">
              {{ $t('buttons.add') }}
            </v-btn>

            <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editExplorer">
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
          text: 'Explorers',
          disabled: true,
        },
      ],
      originList: ['tavern', 'someOne'],
      currentOrigins: ['tavern'],

      explorer: {
        slug: 'explorer',
        name: {
          default: 'Explorer',
          en: 'Explorer',
          ru: 'Исследователь',
        },
        imageUrl: '/img/specialists/explorer.png',

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
        // если событие, то тут же будет и его стоимость
        // у события так же может быть год и время проведения

        // может быть доступно в бандлах, а это уже не высчтитать в стоимость

        // стоимость, количество которое можно купить
        // может различаться от ивента к ивенту, тут просто можно взять последний

        // аудио фразы

        // принесет бустер с поиска сокровищ
          // быстрый поиск - ничего 70%, вещь1 25%, вещь2 2% ....
        // принесет бустер с поиска прикла
        // время на поиски (*2, *0,25)
        // приносит сокровищь в 4 раза больше

        // На 1100% (в 12 раз) больше ресурсов в определённых поисках сокровищ: долгий, очень долгий и длительный.
        // При Быстром и Среднем поиске сокровищ приносит в 6 раз больше ресурсов.
        // При отправке на Поиск приключений приносит вдвое больше наград.
        // +2 слота в заданиях по поиску приключений.
        // При поиске сокровищ приносит максимальное количество ресурсов.
        // На 100% больше сокровищ (включая поиски артефактов и диковинок).
        // Приносит 4 слота с событийными ресурсами (не удвоенными предыдущим бонусом).
        // Дерзость: На 50% больше сокровищ. Гарантированно находит усилитель при поиске сокровищ или приключений

        // При поиске сокровищ имеет шанс принести усилитель и приключение.
        // При поиске приключений приносит усилитель.
        // В поиске приключений требуется меньше провизии.

        // Has a chance of finding buffs and a chance of finding adventures on all treasure search tasks.
        // все таки баф слово используеттся на польсом сайте, надо глянуть как на тестовом у разведчиков, этот текст из его описания
        // бустер не надо использовать наверное

        // сделать такую табличку, сверху все иследователи, а снизу будут подсвечиваться те обытия в которых буст, при наведении или клике
        // сделать всплывашку, если допустим где-то в тексте строкой указан иследователь, то всплывашка что он усилитель приносит и тд... чтобы не переходить
      },

      dialog: false,

      e1: 1,

    //   resources: {},
      explorers: {},

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
    sortExplorers() {
      let arr = []
      for(let explorer in this.explorers) {
        arr.push(this.explorers[explorer])
      }
      console.log('this.arr', arr.sort((a, b) => a.weight - b.weight))
      return arr.sort((a, b) => a.weight - b.weight)
    }

  },
  async created() {
      this.explorers = await this.$store.dispatch('specialists/explorers/getAll')
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
      this.explorer = this.explorers[slug]

      this.currentOrigins = []
      for(const prop in this.explorer.origins) {
        this.currentOrigins.push(this.explorer.origins[prop])
      }

      this.dialogCurrent = 'Edit'
      this.dialog = true
    },
    editExplorer() {
      this.explorer.origins = {}
      this.currentOrigins.forEach((el, idx) => {
        this.explorer.origins[idx] = el
      })

      this.$store.dispatch('specialists/explorers/edit', this.explorer)
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
    addExplorer() {
      this.currentOrigins.forEach((el, idx) => {
        this.explorer.origins[idx] = el
      })

      this.$store.dispatch('specialists/explorers/add', this.explorer)
        .then(res => {
          if(res) {
            this.dialog = false
            this.explorers[this.explorer.slug] = res
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
