import Vue from "vue";
import App from "./app";

import VTooltipPlugin from "v-tooltip";
import VueVirtualScroller from "vue-virtual-scroller";

import { Directive } from "@/directives/detect-viewport";

import "v-tooltip/dist/v-tooltip.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

Vue.config.productionTip = false;

Vue.use(VTooltipPlugin);
Vue.use(VueVirtualScroller);

Vue.directive("detect-viewport", Directive);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
