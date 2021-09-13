import { database } from "@/services/firebase";

export const actions = {
  async add({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`/resources/${data.slug}`)
        .set(data)
        .then(() => {
          var leadsRef = database.ref("resources").child(data.slug);
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
        .ref(`/resources/${data.slug}`)
        .update(data)
        .then(() => {
          var leadsRef = database.ref("resources").child(data.slug);
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
    let resources = [];
    var leadsRef = database.ref("resources");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        resources = snapshot.val();
        // snapshot.forEach(function(childSnapshot) {
        //   var childData = childSnapshot.val();
        // });
      }
    );
    return resources;
  },

  async get(conext, slug) {
    let resource = {};
    var leadsRef = database.ref(`resources/${slug}`);
    await leadsRef.once(
      "value",
      await function(snapshot) {
        resource = snapshot.val();
      }
    );
    return resource;
  }
};
