<script>
const getStyleClassList = ({ size, theme, isDisabled }) => {
  const list = [
    "fc-ui-button",
    `fc-ui-button_size_${size}`,
    `fc-ui-button_theme_${theme}`,
  ];

  if (isDisabled) list.push("fc-ui-button_is-disabled");
  return list;
};

const getAttributes = ({ type, isDisabled }) => ({
  type: type,
  disabled: isDisabled,
});

const getListeners = (listeners) => ({
  click: (event) => listeners.click?.(event),
});

export default {
  name: "fc-ui-button",
  functional: true,
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
  render(h, { props, data, listeners, scopedSlots }) {
    const elmClassList = [
      ...getStyleClassList(props),
      data.class,
      data.staticClass,
    ];
    const elmAttrs = getAttributes(props);
    const elmListeners = getListeners(listeners);

    return (
      <button class={elmClassList} attrs={elmAttrs} on={elmListeners}>
        {scopedSlots.default?.() || props.label}
      </button>
    );
  },
};
</script>

<style>
.fc-ui-button {
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

.fc-ui-button_size_small {
  --button-padding-x: 0.75rem;
  --button-height: 2.5rem;
  --button-text-size: 1em;
}

.fc-ui-button_size_extra-small {
  --button-padding-x: 0.5rem;
  --button-height: 1.75rem;
  --button-text-size: 0.75em;
}

.fc-ui-button_theme_primary {
  --button-background-color: hsl(var(--primary-hsl));
  --button-text-color: hsl(var(--white-hsl));
}

.fc-ui-button_theme_primary:hover,
.fc-ui-button_theme_primary:focus-visible {
  --button-background-color: hsl(var(--primary-dark-hsl));
}

.fc-ui-button_theme_primary:active {
  --button-background-color: hsl(var(--primary-extra-dark-hsl));
}

.fc-ui-button_theme_light {
  --button-background-color: hsl(var(--silver-hsl));
  --button-text-color: hsl(var(--black-hsl));
}

.fc-ui-button_theme_light:hover,
.fc-ui-button_theme_light:focus-visible {
  --button-background-color: hsl(var(--silver-dark-hsl));
}

.fc-ui-button_theme_light:active {
  --button-background-color: hsl(var(--silver-extra-dark-hsl));
}

.fc-ui-button_theme_island {
  --button-background-color: hsl(var(--white-hsl));
  --button-border-color: hsl(var(--gray-light-hsl));
}

.fc-ui-button_theme_island:hover,
.fc-ui-button_theme_island:focus-visible {
  --button-border-color: hsl(var(--gray-hsl));
}

.fc-ui-button_theme_island:active {
  --button-background-color: hsl(var(--silver-hsl));
}

.fc-ui-button_is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
