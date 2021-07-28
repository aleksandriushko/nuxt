!(function(_, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t(require("dayjs")))
    : "function" == typeof define && define.amd
    ? define(["dayjs"], t)
    : ((_ =
        "undefined" != typeof globalThis
          ? globalThis
          : _ || self).dayjs_locale_ru = t(_.dayjs));
})(this, function(_) {
  "use strict";
  function t(_) {
    return _ && "object" == typeof _ && "default" in _ ? _ : { default: _ };
  }
  var e = t(_),
    n = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split(
      "_"
    ),
    s = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split(
      "_"
    ),
    r = "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split(
      "_"
    ),
    o = "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split(
      "_"
    ),
    i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
  function d(_, t, e) {
    var n, s;
    return "m" === e
      ? t
        ? "минута"
        : "минуту"
      : _ +
          " " +
          ((n = +_),
          (s = {
            mm: t ? "минута_минуты_минут" : "минуту_минуты_минут",
            hh: "час_часа_часов",
            dd: "день_дня_дней",
            MM: "месяц_месяца_месяцев",
            yy: "год_года_лет"
          }[e].split("_")),
          n % 10 == 1 && n % 100 != 11
            ? s[0]
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? s[1]
            : s[2]);
  }
  var u = function(_, t) {
    return i.test(t) ? n[_.month()] : s[_.month()];
  };
  (u.s = s), (u.f = n);
  var a = function(_, t) {
    return i.test(t) ? r[_.month()] : o[_.month()];
  };
  (a.s = o), (a.f = r);
  var m = {
    name: "ru",
    weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split(
      "_"
    ),
    weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
    weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
    months: u,
    monthsShort: a,
    weekStart: 1,
    yearStart: 4,
    formats: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY г.",
      LLL: "D MMMM YYYY г., H:mm",
      LLLL: "dddd, D MMMM YYYY г., H:mm"
    },
    relativeTime: {
      future: "через %s",
      past: "%s назад",
      s: "несколько секунд",
      m: d,
      mm: d,
      h: "час",
      hh: d,
      d: "день",
      dd: d,
      M: "месяц",
      MM: d,
      y: "год",
      yy: d
    },
    ordinal: function(_) {
      return _;
    },
    meridiem: function(_) {
      return _ < 4 ? "ночи" : _ < 12 ? "утра" : _ < 17 ? "дня" : "вечера";
    }
  };
  return e.default.locale(m, null, !0), m;
});

//
// !(function(e, a) {
//   "object" == typeof exports && "undefined" != typeof module
//     ? (module.exports = a(require("dayjs")))
//     : "function" == typeof define && define.amd
//     ? define(["dayjs"], a)
//     : ((e =
//         "undefined" != typeof globalThis
//           ? globalThis
//           : e || self).dayjs_locale_en_ca = a(e.dayjs));
// })(this, function(e) {
//   "use strict";
//   function a(e) {
//     return e && "object" == typeof e && "default" in e ? e : { default: e };
//   }
//   var _ = a(e),
//     t = {
//       name: "en-ca",
//       weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
//         "_"
//       ),
//       months: "January_February_March_April_May_June_July_August_September_October_November_December".split(
//         "_"
//       ),
//       weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
//       monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
//       weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
//       ordinal: function(e) {
//         return e;
//       },
//       formats: {
//         LT: "h:mm A",
//         LTS: "h:mm:ss A",
//         L: "YYYY-MM-DD",
//         LL: "MMMM D, YYYY",
//         LLL: "MMMM D, YYYY h:mm A",
//         LLLL: "dddd, MMMM D, YYYY h:mm A"
//       },
//       relativeTime: {
//         future: "in %s",
//         past: "%s ago",
//         s: "a few seconds",
//         m: "a minute",
//         mm: "%d minutes",
//         h: "an hour",
//         hh: "%d hours",
//         d: "a day",
//         dd: "%d days",
//         M: "a month",
//         MM: "%d months",
//         y: "a year",
//         yy: "%d years"
//       }
//     };
//   return _.default.locale(t, null, !0), t;
// });
