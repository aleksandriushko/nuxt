<template>
  <div class="Content" v-if="unitsLoaded">
    <div class="container">

      <v-row>
        <v-col cols="6">
          <v-btn small @click="testDialog()">
            {{ $t('text.add') }}
          </v-btn>
        </v-col>
        <v-col cols="6">
          <!-- <v-btn small @click="showTableUnits = !showTableUnits">
            {{ showTableUnits ? $t('units.btnShowTable') : $t('units.btnHideTable') }}
          </v-btn>
          <v-radio-group v-model="filters.type" row>
            <v-radio label="Move" value="move" />
            <v-radio label="Upgrade" value="upgrade" />
          </v-radio-group> -->
        </v-col>
      </v-row>

      <h1 class="Content__Title">
        {{ $t('units.title') }}
      </h1>

      <!-- <tableUnits v-if="showTableUnits" :filters="filters" :units="units" :resources="resources" /> -->

      <div v-for="(unitType, idx) in renderBuldingList" :key="'units' + idx">
        <h2 class="buiiding-type-title">{{ unitType }}</h2>
        <div class="units-wrap">
          <template v-for="unit in basicUnits">
            <div v-if="unitType === unit.origin.buildingSlug" :key="unit.slug" class="unit">
              <NuxtLink :to="`/units/${unit.slug}`" class="img-link"><img :src="unit.imageUrl" alt=""></NuxtLink>
              <NuxtLink :to="`/units/${unit.slug}`" class="text-link">{{ unit.name[$i18n.locale] }}</NuxtLink>
              <div class="level-text">{{ unit.requiredLevel }}</div>
              <v-btn small class="edit-unit" @click="dialogEdit(unit.slug)">
                <v-icon color="primary">mdi-pencil</v-icon>
              </v-btn>
            </div>
          </template>
        </div>
      </div>


      <dialogUnit :dialog="dialogUnit" :resources="resources" :editingUnit="editingUnit" :dialogCurrent="dialogCurrent"  @clicked="onDialogUnit" />
      <!-- <button @click="test">test</button> -->
    </div>
  </div>
</template>

<script>
import dialogUnit from '@/components/elements/units/dialogUnit'
// import tableUnits from '@/components/pages/units/tableUnits'

export default {
  head() {
    return { title: this.$t('units.title') }
  },
  components: {
    dialogUnit,
    // tableUnits,
  },
  data() {
    return {
      renderBuldingList: ['barracks', 'elite-barracks', 'combat-academy'],


      dialogUnit: true,
      editingUnit: null,

      resources: {},
      units: {},

      unitsLoaded: false,

      dialogCurrent: '',

      showTableUnits: false,
      filters: {
        type: 'upgrade',
        showElements: {
          premium: false
        }
      }
    }
  },
  computed: {
    basicUnits() {
      let arrUnits = []
      for(let unit in this.units) {
        arrUnits.push(this.units[unit])
      }
      return arrUnits.sort((a, b) => a.weight - b.weight)
    }

  },
  async created() {
      this.units = await this.$store.dispatch('units/getAll')
      this.resources = await this.$store.dispatch('resources/getAll') // TODO move in component
      console.log('this.resources: ', this.resources);
      console.log('this.units: ', this.units);
      this.unitsLoaded = true
  },
  methods: {
    testDialog() {
      // this.dialog = true
      // this.dialogUnit = true
      // console.log('this.dialogUnit: ', this.dialogUnit);


        // this.editingUnit = this.units.storehouse
        // console.log('this.editingUnit: ', this.editingUnit);
        this.dialogUnit = true
        this.dialogCurrent = 'Add'
    },
    test() {
      this.getResourceIcon()
    },
    dialogEdit(slug) {
        this.editingUnit = this.units[slug]
        console.log('this.editingUnit: ', this.editingUnit);
        this.dialogUnit = true
        this.dialogCurrent = 'Edit'
    },
    addUnit() {
      // code for push unit to array
    },
    onDialogUnit(data) {
      this.dialogUnit = false
    },
  }
}
</script>

<style scoped>
.units-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-top: 1px solid black;
    border-left: 1px solid black;
}
.unit {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  position: relative;
  display: flex;
}
/* .edit-unit {
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
.edit-unit {
  position: absolute;
  right: 5px;
  top: 5px;
  display: none;
}
.unit:hover .edit-unit {
  display: block;
}
</style>
