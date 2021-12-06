<script>
const getStyleClassList = ({ size }, staticClass) => [
  staticClass,
  "fc-ui-input",
  `fc-ui-input_size_${size}`,
];

const getAttributes = ({ placeholder }) => ({
  placeholder,
  type: "text",
});

const getListeners = (listeners) => ({
  input: (event) => {
    listeners.input?.(event.target.value);
  },
});

export default {
  name: "fc-ui-input",
  functional: true,
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
  render(h, { props, data, listeners }) {
    const elmClassList = [
      ...getStyleClassList(props),
      data.class,
      data.staticClass,
    ];
    const elmAttrs = getAttributes(props);
    const elmListeners = getListeners(listeners);

    return (
      <div class={elmClassList}>
        <input
          class="fc-ui-input__field"
          ref={data.ref}
          value={props.value}
          attrs={elmAttrs}
          on={elmListeners}
        />
      </div>
    );
  },
};
</script>

<style>
.fc-ui-input {
  display: flex;
}

.fc-ui-input_size_default {
  --input-padding-x: 1rem;
  --input-padding-height: 2.5rem;
  --input-font-size: 1rem;
}

.fc-ui-input_size_small {
  --input-padding-x: 0.5rem;
  --input-padding-height: 2rem;
  --input-font-size: 0.85rem;
}

.fc-ui-input__field {
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

.fc-ui-input__field:focus {
  --input-border-color: hsl(var(--primary-hsl));
}
</style>
