<template>
  <div class="Content" v-if="buildingsLoaded">
    <div class="container">

      <v-btn small @click="testDialog()">
        {{ $t('text.add') }}
      </v-btn>


      <v-btn small @click="showTableBuildings = !showTableBuildings">
        {{ $t('buildings.btnShowTable') }}
      </v-btn>

      <h1 class="Content__Title">
        {{ $t('buildings.title') }}
      </h1>

      <tableBuildings v-if="showTableBuildings" :buildings="buildings" :resources="resources" />

      <div v-for="(buildingType, idx) in renderBuldingList" :key="'buildings' + idx" v-else>
        <h2 class="buiiding-type-title">{{ buildingType }}</h2>
        <div class="buildings-wrap">
          <template v-for="building in basicBuildings">
            <div v-if="buildingType === building.origins[0]" :key="building.slug" class="building">
              <NuxtLink :to="`/buildings/${building.slug}`" class="img-link"><img :src="building.imageIconUrl" alt=""></NuxtLink>
              <NuxtLink :to="`/buildings/${building.slug}`" class="text-link">{{ building.name[$i18n.locale] }}</NuxtLink>
              <div class="level-text">{{ building.requiredLevel }}</div>
              <v-btn small class="edit-building" @click="dialogEdit(building.slug)">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
            </div>
          </template>
        </div>
      </div>


      <dialogBuilding :dialog="dialogBuilding" :resources="resources" :editingBuilding="editingBuilding" :dialogCurrent="dialogCurrent"  @clicked="onDialogBuilding" />
      <!-- <button @click="test">test</button> -->
    </div>
  </div>
</template>

<script>
import dialogBuilding from '@/components/elements/buildings/dialogBuilding'
import tableBuildings from '@/components/pages/buildings/tableBuildings'

export default {
  head() {
    return { title: this.$t('buildings.title') }
  },
  components: {
    dialogBuilding,
    tableBuildings,
  },
  data() {
    return {
      renderBuldingList: ['basic', 'intermediate', 'advanced', 'expert', 'elite'],

      showTableBuildings: true,

      dialogBuilding: true,
      editingBuilding: null,

      resources: {},
      buildings: {},

      buildingsLoaded: false,

      dialogCurrent: '',
    }
  },
  computed: {
    basicBuildings() {
      let arrBuildings = []
      for(let building in this.buildings) {
        arrBuildings.push(this.buildings[building])
      }
      return arrBuildings.sort((a, b) => a.weight - b.weight)
    }

  },
  async created() {
      this.buildings = await this.$store.dispatch('buildings/getAll')
      this.resources = await this.$store.dispatch('resources/getAll') // TODO move in component
      console.log('this.resources: ', this.resources);
      console.log('this.buildings: ', this.buildings);
      this.buildingsLoaded = true
  },
  methods: {
    testDialog() {
      // this.dialog = true
      // this.dialogBuilding = true
      // console.log('this.dialogBuilding: ', this.dialogBuilding);


        // this.editingBuilding = this.buildings.storehouse
        // console.log('this.editingBuilding: ', this.editingBuilding);
        this.dialogBuilding = true
        this.dialogCurrent = 'Add'
    },
    test() {
      this.getResourceIcon()
    },
    dialogEdit(slug) {
        this.editingBuilding = this.buildings[slug]
        console.log('this.editingBuilding: ', this.editingBuilding);
        this.dialogBuilding = true
        this.dialogCurrent = 'Edit'
    },
    addBuilding() {
      // code for push building to array
    },
    onDialogBuilding(data) {
      this.dialogBuilding = false
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
