import { database } from "@/services/firebase";

export const actions = {
  async add({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`specialists/explorers/${data.slug}`)
        .set(data)
        .then(() => {
          let leadsRef = database.ref("explorers").child(data.slug);
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
        .ref(`/specialists/explorers/${data.slug}`)
        .update(data)
        .then(() => {
          var leadsRef = database.ref("specialists/explorers").child(data.slug);
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
    let explorers = [];
    let leadsRef = database.ref("specialists/explorers");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        explorers = snapshot.val();
        // snapshot.forEach(function(childSnapshot) {
        //   var childData = childSnapshot.val();
        // });
      }
    );
    return explorers;
  },

  async get(conext, slug) {
    let explorer = {};
    let leadsRef = database.ref(`specialists/explorers/${slug}`);
    await leadsRef.once(
      "value",
      await function(snapshot) {
        explorer = snapshot.val();
      }
    );
    return explorer;
  }
};
