<template>
  <div
    class="ui-infinite-scroll"
    v-detect-viewport="{ callback: this._emitLoad }"
  >
    <DotsLoader />
  </div>
</template>

<script>
import DotsLoader from "../icons/dots-loader";

export default {
  name: "ui-infinite-scroll",
  components: {
    DotsLoader,
  },
  methods: {
    _emitLoad() {
      this.$emit("load");
    },
  },
};
</script>

<style>
.ui-infinite-scroll {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  color: hsl(var(--primary-hsl));
}
</style>
