import { database } from "@/services/firebase";

export const actions = {
  async add({ dispatch, commit }, data) {
    try {
      let res;
      await database
        .ref(`specialists/marshals/${data.slug}`)
        .set(data)
        .then(() => {
          let leadsRef = database.ref("marshals").child(data.slug);
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
        .ref(`/specialists/marshals/${data.slug}`)
        .update(data)
        .then(() => {
          var leadsRef = database.ref("specialists/marshals").child(data.slug);
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
    let marshals = [];
    let leadsRef = database.ref("specialists/marshals");
    await leadsRef.once(
      "value",
      await function(snapshot) {
        marshals = snapshot.val();
        // snapshot.forEach(function(childSnapshot) {
        //   var childData = childSnapshot.val();
        // });
      }
    );
    return marshals;
  },

  async get(conext, slug) {
    let marshal = {};
    let leadsRef = database.ref(`specialists/marshals/${slug}`);
    await leadsRef.once(
      "value",
      await function(snapshot) {
        marshal = snapshot.val();
      }
    );
    return marshal;
  }
};
