import {
  onMounted,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

export default {
  template: "#delProductModal",
  props: ["item"],
  setup(props, { emit }) {
    const apiUrl = "https://vue3-course-api.hexschool.io/v2";
    const apiPath = "yuetin-hexschool";
    let delProductModal = null;
    const dModalRef = ref(null);

    const delProduct = () => {
      axios
        .delete(`${apiUrl}/api/${apiPath}/admin/product/${props.item.id}`)
        .then(() => {
          emit("update");
          hideModal();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const openModal = () => {
      delProductModal.show();
    };

    const hideModal = () => {
      delProductModal.hide();
    };

    onMounted(() => {
      delProductModal = new bootstrap.Modal(dModalRef.value, {
        keyboard: false,
        backdrop: "static",
      });
    });

    return {
      dModalRef,
      delProduct,
      openModal,
    };
  },
};
