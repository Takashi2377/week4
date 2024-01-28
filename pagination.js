export default {
  template: "#pagination",
  props: ["pages"],
  setup(props, { emit }) {
    const emitPages = (item) => {
      emit("emit-pages", item);
    };

    return {
      emitPages,
    };
  },
};
