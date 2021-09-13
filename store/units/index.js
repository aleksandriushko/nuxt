import { database } from "@/services/firebase";

export const actions = {
  async add({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`/units/${data.slug}`)
        .set(data)
        .then(() => {
          var leadsRef = database.ref("units").child(data.slug);
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
        .ref(`/units/${data.slug}`)
        .update(data)
        .then(() => {
          var leadsRef = database.ref("units").child(data.slug);
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
    let units = [];
    var leadsRef = database.ref("units");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        units = snapshot.val();
        // snapshot.forEach(function(childSnapshot) {
        //   var childData = childSnapshot.val();
        // });
      }
    );
    return units;
  },

  async get(conext, slug) {
    let unit = {};
    var leadsRef = database.ref(`units/${slug}`);
    await leadsRef.once(
      "value",
      await function(snapshot) {
        unit = snapshot.val();
      }
    );
    return unit;
  }
};
