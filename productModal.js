import {
  onMounted,
  ref,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

export default {
  template: "#productModal",
  props: ["isNew", "product"],
  setup(props, { emit }) {
    const apiUrl = "https://vue3-course-api.hexschool.io/v2";
    const apiPath = "yuetin-hexschool";
    let productModal = null;
    const pModalRef = ref(null);

    const updateProduct = () => {
      let api = `${apiUrl}/api/${apiPath}/admin/product`;
      let httpMethod = "post";

      if (!props.isNew) {
        api = `${apiUrl}/api/${apiPath}/admin/product/${props.product.id}`;
        httpMethod = "put";
      }

      axios[httpMethod](api, { data: props.product })
        .then((response) => {
          alert(response.data.message);
          closeModal();
          emit("update");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const createImages = () => {
      props.product.imagesUrl = [];
      props.product.imagesUrl.push("");
    };

    const openModal = () => {
      productModal.show();
    };

    const closeModal = () => {
      productModal.hide();
    };

    onMounted(() => {
      productModal = new bootstrap.Modal(pModalRef.value, {
        keyboard: false,
        backdrop: "static",
      });
    });

    return {
      updateProduct,
      createImages,
      pModalRef,
      openModal,
      closeModal,
    };
  },
};
