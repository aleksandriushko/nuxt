import { database } from "@/services/firebase";

export const actions = {
  async add({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`specialists/geologists/${data.slug}`)
        .set(data)
        .then(() => {
          let leadsRef = database.ref("geologists").child(data.slug);
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
        .ref(`/specialists/geologists/${data.slug}`)
        .update(data)
        .then(() => {
          var leadsRef = database
            .ref("specialists/geologists")
            .child(data.slug);
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
    let geologists = [];
    let leadsRef = database.ref("specialists/geologists");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        geologists = snapshot.val();
        // snapshot.forEach(function(childSnapshot) {
        //   var childData = childSnapshot.val();
        // });
      }
    );
    return geologists;
  },

  async get(conext, slug) {
    let geologist = {};
    let leadsRef = database.ref(`specialists/geologists/${slug}`);
    await leadsRef.once(
      "value",
      await function(snapshot) {
        geologist = snapshot.val();
      }
    );
    return geologist;
  }
};
