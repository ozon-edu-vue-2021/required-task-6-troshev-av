<template>
  <button
    class="ui-button"
    :class="{
      [`ui-button_size_${size}`]: true,
      [`ui-button_theme_${theme}`]: true,
      'ui-button_is-disabled': isDisabled,
    }"
    :type="type"
    :disabled="isDisabled"
    v-on="buttonListeners"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "ui-button",
  props: {
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "submit", "reset"].includes(value);
      },
    },
    size: {
      type: String,
      default: "default",
      validator(value) {
        return ["default", "small", "extra-small"].includes(value);
      },
    },
    theme: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "light", "island"].includes(value);
      },
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonListeners() {
      return {
        click: (event) => {
          this.$emit("click", event);
        },
      };
    },
  },
};
</script>

<style>
.ui-button {
  --button-height: 3rem;
  --button-padding-x: 1rem;
  --button-text-size: 1.2em;
  --button-border-color: transparent;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--button-border-color);
  border-radius: 0.25rem;
  padding: 0 var(--button-padding-x);
  height: var(--button-height);
  box-sizing: border-box;
  font-size: var(--button-text-size);
  font-weight: 700;
  color: var(--button-text-color);
  background-color: var(--button-background-color);
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.ui-button_size_small {
  --button-padding-x: 0.75rem;
  --button-height: 2.5rem;
  --button-text-size: 1em;
}

.ui-button_size_extra-small {
  --button-padding-x: 0.5rem;
  --button-height: 1.75rem;
  --button-text-size: 0.75em;
}

.ui-button_theme_primary {
  --button-background-color: hsl(var(--primary-hsl));
  --button-text-color: hsl(var(--white-hsl));
}

.ui-button_theme_primary:hover,
.ui-button_theme_primary:focus-visible {
  --button-background-color: hsl(var(--primary-dark-hsl));
}

.ui-button_theme_primary:active {
  --button-background-color: hsl(var(--primary-extra-dark-hsl));
}

.ui-button_theme_light {
  --button-background-color: hsl(var(--silver-hsl));
  --button-text-color: hsl(var(--black-hsl));
}

.ui-button_theme_light:hover,
.ui-button_theme_light:focus-visible {
  --button-background-color: hsl(var(--silver-dark-hsl));
}

.ui-button_theme_light:active {
  --button-background-color: hsl(var(--silver-extra-dark-hsl));
}

.ui-button_theme_island {
  --button-background-color: hsl(var(--white-hsl));
  --button-border-color: hsl(var(--gray-light-hsl));
}

.ui-button_theme_island:hover,
.ui-button_theme_island:focus-visible {
  --button-border-color: hsl(var(--gray-hsl));
}

.ui-button_theme_island:active {
  --button-background-color: hsl(var(--silver-hsl));
}

.ui-button_is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
