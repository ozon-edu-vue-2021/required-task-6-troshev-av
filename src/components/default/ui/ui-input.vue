<template>
  <div class="ui-input" :class="[`ui-input_size_${size}`]">
    <input
      ref="field"
      class="ui-input__field"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      v-on="fieldListeners"
    />
  </div>
</template>

<script>
export default {
  name: "ui-input",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: "default",
      validator(value) {
        return ["default", "small"].includes(value);
      },
    },
  },
  computed: {
    fieldListeners() {
      return {
        input: (event) => {
          this.$emit("input", event.target.value);
        },
      };
    },
  },
  methods: {
    focus() {
      this.$refs.field.focus();
    },
  },
};
</script>

<style>
.ui-input {
  display: flex;
}

.ui-input_size_default {
  --input-padding-x: 1rem;
  --input-padding-height: 2.5rem;
  --input-font-size: 1rem;
}

.ui-input_size_small {
  --input-padding-x: 0.5rem;
  --input-padding-height: 2rem;
  --input-font-size: 0.85rem;
}

.ui-input__field {
  --input-border-color: hsl(var(--gray-light-hsl));

  flex-grow: 1;
  border: 2px solid var(--input-border-color);
  border-radius: 0.25rem;
  padding: 0 var(--input-padding-x);
  height: var(--input-padding-height);
  width: 100%;
  box-sizing: border-box;
  font-size: var(--input-font-size);
  background-color: hsl(var(--white-hsl));
  cursor: text;
  outline: none;
  transition: border-color 0.15s ease;
}

.ui-input__field:focus {
  --input-border-color: hsl(var(--primary-hsl));
}
</style>
