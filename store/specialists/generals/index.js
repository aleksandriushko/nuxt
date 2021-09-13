import { database } from "@/services/firebase";

export const actions = {
  async add({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`specialists/generals/${data.slug}`)
        .set(data)
        .then(() => {
          let leadsRef = database.ref("generals").child(data.slug);
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
        .ref(`/specialists/generals/${data.slug}`)
        .update(data)
        .then(() => {
          var leadsRef = database.ref("specialists/generals").child(data.slug);
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
    let generals = [];
    let leadsRef = database.ref("specialists/generals");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        generals = snapshot.val();
        // snapshot.forEach(function(childSnapshot) {
        //   var childData = childSnapshot.val();
        // });
      }
    );
    return generals;
  },

  async get(conext, slug) {
    let general = {};
    let leadsRef = database.ref(`specialists/generals/${slug}`);
    await leadsRef.once(
      "value",
      await function(snapshot) {
        general = snapshot.val();
      }
    );
    return general;
  }
};
