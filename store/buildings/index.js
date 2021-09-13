import { database } from "@/services/firebase";

export const actions = {
  async add({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`/buildings/${data.slug}`)
        .set(data)
        .then(() => {
          var leadsRef = database.ref("buildings").child(data.slug);
          leadsRef.on("value", function(snapshot) {
            res = snapshot.val();
          });
        });
      return res;
    } catch (error) {
      throw error;
    }
  },
  async edit({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`/buildings/${data.slug}`)
        .update(data)
        .then(() => {
          var leadsRef = database.ref("buildings").child(data.slug);
          leadsRef.on("value", function(snapshot) {
            res = snapshot.val();
          });
        });
      return res;
    } catch (error) {
      throw error;
    }
  },
  async getAll() {
    let buildings = [];
    var leadsRef = database.ref("buildings");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        buildings = snapshot.val();
        // snapshot.forEach(function(childSnapshot) {
        //   var childData = childSnapshot.val();
        // });
      }
    );
    return buildings;
  },

  async get(conext, slug) {
    let building = {};
    // return building;
    // console.log("building: ", building);
    var leadsRef = database.ref(`buildings/${slug}`);
    // var leadsRef = database.ref("buildings/pinewood-cutter");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        building = snapshot.val();
      }
    );
    return building;
  }
};
