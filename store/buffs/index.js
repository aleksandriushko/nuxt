import { database } from "@/services/firebase";

export const actions = {
  async add({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`/buffs/${data.slug}`)
        .set(data)
        .then(() => {
          var leadsRef = database.ref("buffs").child(data.slug);
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
        .ref(`/buffs/${data.slug}`)
        .update(data)
        .then(() => {
          var leadsRef = database.ref("buffs").child(data.slug);
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
    let buffs = [];
    var leadsRef = database.ref("buffs");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        buffs = snapshot.val();
        // snapshot.forEach(function(childSnapshot) {
        //   var childData = childSnapshot.val();
        // });
      }
    );
    return buffs;
  },

  async get(conext, slug) {
    let buff = {};
    var leadsRef = database.ref(`buffs/${slug}`);
    await leadsRef.once(
      "value",
      await function(snapshot) {
        buff = snapshot.val();
      }
    );
    return buff;
  }
};
