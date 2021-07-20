<template>
  <div class="Content">
    <div class="container">
      <h1 class="Content__Title">
        {{ $t('resources.title') }}
      </h1>

      <div v-if="resourcesLoaded" class="resources-wrap">
        <div v-for="item in resources" :key="item.slug" class="resource">

          <NuxtLink :to="`/resources/${item.slug}`"><img :src="item.imageUrl" alt="" v-if="item.imageUrl"></NuxtLink>

          {{ item.name.en }}
          <v-btn small class="edit-resource">
            <v-icon color="primary" @click="dialogEdit(item.slug)">
              mdi-pencil
            </v-icon>
          </v-btn>
        </div>
      </div>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            {{ $t('resources.addResource') }}
          </v-btn>
        </template>
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

              <v-stepper-step step="3" editable>
                Other data
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="resource.name.en" :label="$t('labels.nameEn')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="resource.name.ru" :label="$t('labels.nameRu')" />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="resource.slug" :label="$t('labels.slug')" disabled_ />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="imageUrl" label="$t('labels.imageUrl')" disabled_ />
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
                        {{ $t('labels.imageIconUrl') }}
                        <v-row>
                          <!-- <v-col cols="6" sm="6" md="6"> -->
                            <!-- <v-file-input accept="image/*" @change="previewImage" label="File input"/> -->
                            <!-- <p>Progress: {{ uploadValue.toFixed() + "%" }} -->
                            <!-- <progress id="progress" :value="uploadValue" max="100" ></progress>  </p> -->
                          <!-- </v-col> -->
                          <!-- <v-col cols="4" sm="4" md="4">
                            <v-btn @click="onUpload" :disabled="!image.imageData">
                              {{ $t('resources.uploadBtnName') }}
                            </v-btn>
                          </v-col> -->
                          <!-- <v-col cols="2" sm="2" md="2">
                            <template v-if="resource.imageUrl">
                              <img class="preview" :src="resource.imageUrl">
                            </template>
                            <template v-else>
                              <img v-if="image.imageData != null" class="preview" :src="image.picture">
                            </template>
                          </v-col> -->
                        </v-row>
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
                <!-- <v-row>
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
                </v-row> -->

                <!-- <v-row>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.productionResource.minutes" :label="$t('buildings.labelProductionResourceMinutes')" />
                  </v-col>
                  <v-col cols="3" sm="3" md="3">
                    <v-text-field v-model="building.productionResource.seconds" :label="$t('buildings.labelProductionResourceSeconds')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.productionResource.hours" :label="$t('buildings.labelProductionResourceHours')" />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="building.productionResource.days" :label="$t('buildings.labelProductionResourceDays')" />
                  </v-col>
                </v-row> -->

                <v-btn color="primary">
                  Add
                </v-btn>
                <v-btn text>
                  Cancel
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>

          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn v-if="dialogCurrent === 'Add'" color="blue darken-1" text @click="addResource">
              {{ $t('buttons.add') }}
            </v-btn>

            <v-btn v-if="dialogCurrent === 'Edit'"  color="blue darken-1" text @click="editResource">
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
    return { title: this.$t('resources.title') }
  },
  data() {
    return {
      resource: {
        slug: 'none',
        name: {
          default: 'none',
          en: 'none',
          ru: 'none',
        },
        imageUrl: '/img/resources/'
          // productionTime: {
          //   seconds: null,
          //   minutes: null,
          //   hours: null,
          //   days: null,
          //   amount: null,
          // },
        // weight: 0

      },
      dialog: false,

      image: {
        imageData: null,
        picture: null,
        uploadValue: 0,
      },

      e1: 1,

      resources: {},
      resourcesLoaded: false,

      dialogCurrent: 'Add',
    }
  },
  computed: {
    slug() {
      // return 'stripy-easter-egg'
      return this.resource.name.en.toLowerCase().replace(' ', '-')
    },
    imageUrl() {
      // return `/img/resources/stripy-easter-egg.png`
      return `/img/resources/${this.slug}.png`
    }
  },
  async created() {
      this.resources = await this.$store.dispatch('resources/getAll')
      console.log('this.resources: ', this.resources);
      this.resourcesLoaded = true
  },
  methods: {
    previewImage(event) {
      console.log('event: ', event);
      this.image.uploadValue = 0
      this.image.picture = null
      this.image.imageData = event
    },

    onUpload() {
      this.resource.image.picture = null

      const storageRef = firebase.storage()
        .ref(`img/resources/${this.resource.slug}`)
        .put(this.image.imageData)
      storageRef.on(
        `state_changed`,
        snapshot => { this.image.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 },
        error => { console.log(error.message) },
        () => { this.image.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.image.picture = url
            this.resource.image = { url }
          })
        }
      )
    },
    dialogEdit(slug) {
      this.dialog = true
      this.dialogCurrent = 'Edit'
      this.resource = this.resources[slug]
    },
    editResource() {
      this.$store.dispatch('resources/edit', this.resource)
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
    addResource() {
      this.resource.slug = this.slug
      this.resource.imageUrl = this.imageUrl
      this.resource.name.default = this.resource.name.en

      this.$store.dispatch('resources/add', this.resource)
        .then(res => {
          this.resource.name.en = ''
          this.resource.name.ru = ''
          if(res) {
            this.dialog = false
            this.resources[this.resource.slug] = res
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
.resources-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-top: 1px solid black;
    border-left: 1px solid black;
}
.resource {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.edit-resource{
    right: 0;
    top: 0;
    position: absolute;
}
img.preview {
    width: 50px;
}
</style>
