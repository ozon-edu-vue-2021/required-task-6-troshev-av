<script>
import FcDotsLoader from "../fc-icons/fc-dots-loader";

const getDetectViewportOptions = (callback) => ({
  callback,
});

export default {
  name: "fc-ui-infinite-scroll",
  functional: true,
  render(createElement, { listeners }) {
    return createElement(
      "div",
      {
        class: "fc-ui-infinite-scroll",
        directives: [
          {
            name: "detect-viewport",
            value: getDetectViewportOptions(listeners.load),
          },
        ],
      },
      FcDotsLoader
    );
  },
};
</script>

<style>
.fc-ui-infinite-scroll {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  color: hsl(var(--primary-hsl));
}
</style>
