import Vue from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

dayjs.extend(duration);
dayjs.extend(relativeTime);
Vue.prototype.$dayjs = dayjs;

// import Vue from "vue";
// import dayjs from "dayjs";

// import duration from "dayjs/plugin/duration";
// import relativeTime from "dayjs/plugin/relativeTime";
// dayjs.extend(duration);
// dayjs.extend(relativeTime);

// en adding  number 1 before string
// import updateLocale from "dayjs/plugin/updateLocale";
// dayjs.extend(updateLocale);
// dayjs.updateLocale("en", {
//   relativeTime: {
//     future: "in %s",
//     past: "%s ago",
//     s: "a few seconds - %s - %d",
//     ss: "a few secondsss - %s - %d",
//     m: "1 minute",
//     mm: "%d minutes",
//     h: "1 hour",
//     hh: "%d hours",
//     d: "1 day",
//     dd: "%d days",
//     M: "1 month",
//     MM: "%d months",
//     y: "1 year",
//     yy: "%d years"
//   }
// });

// // ru adding  number 1 before string
// // // TODO переместить и сжать файл dayjs-ru.js
// // import localeObject from "@/plugins/dayjs-ru.js";
// // dayjs.locale("ru", localeObject);

// Vue.prototype.$dayjs = dayjs;
