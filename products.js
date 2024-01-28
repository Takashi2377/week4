import {
  createApp,
  ref,
  onMounted,
} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

import paginationComponent from "./pagination.js";
import productModalComponent from "./productModal.js";
import delProductModalComponent from "./delProductModal.js";

const app = createApp({
  components: {
    paginationComponent,
    productModalComponent,
    delProductModalComponent,
  },
  setup() {
    const apiUrl = "https://vue3-course-api.hexschool.io/v2";
    const apiPath = "yuetin-hexschool";

    const products = ref([]);
    const tempProduct = ref({ imagesUrl: [] });
    const pagination = ref({});
    const isNew = ref(false);
    const pModal = ref(null);
    const dModal = ref(null);

    const checkAdmin = () => {
      const url = `${apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    };

    const getData = (page = 1) => {
      const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;

      axios
        .get(url)
        .then((response) => {
          products.value = response.data.products;
          pagination.value = response.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    };

    const openModal = (type, item) => {
      if (type === "new") {
        tempProduct.value = { imagesUrl: [] };
        isNew.value = true;
        pModal.value.openModal();
      } else if (type === "edit") {
        tempProduct.value = { ...item };
        isNew.value = false;
        pModal.value.openModal();
      } else if (type === "delete") {
        tempProduct.value = { ...item };
        dModal.value.openModal();
      }
    };

    onMounted(() => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = token;
      checkAdmin();
      console.log(pModal.value);
    });

    return {
      products,
      tempProduct,
      pagination,
      isNew,
      pModal,
      dModal,
      getData,
      openModal,
    };
  },
});

// 產品新增/編輯元件
// app.component("productModal", {
//   template: "#productModal",
//   props: ["isNew", "product"],
//   setup(props, { emit }) {
//     const apiUrl = "https://vue3-course-api.hexschool.io/v2";
//     const apiPath = "hexschoolvue";

//     const updateProduct = () => {
//       let api = `${apiUrl}/api/${apiPath}/admin/product`;
//       let httpMethod = "post";

//       if (!props.isNew) {
//         api = `${apiUrl}/api/${apiPath}/admin/product/${props.product.id}`;
//         httpMethod = "put";
//       }

//       axios[httpMethod](api, { data: props.product })
//         .then((response) => {
//           alert(response.data.message);
//           hideModal();
//           emit("update");
//         })
//         .catch((err) => {
//           alert(err.response.data.message);
//         });
//     };

//     const createImages = () => {
//       props.product.imagesUrl = [];
//       props.product.imagesUrl.push("");
//     };

//     const hideModal = () => {
//       productModal.hide();
//     };

//     onMounted(() => {
//       productModal = new bootstrap.Modal(
//         document.getElementById("productModal"),
//         {
//           keyboard: false,
//           backdrop: "static",
//         }
//       );
//     });

//     return {
//       updateProduct,
//       createImages,
//     };
//   },
// });

// 產品刪除元件
// app.component("delProductModal", {
//   template: "#delProductModal",
//   props: ["item"],
//   setup(props, { emit }) {
//     const apiUrl = "https://vue3-course-api.hexschool.io/v2";
//     const apiPath = "hexschoolvue";

//     const delProduct = () => {
//       axios
//         .delete(`${apiUrl}/api/${apiPath}/admin/product/${props.item.id}`)
//         .then(() => {
//           emit("update");
//           hideModal();
//         })
//         .catch((err) => {
//           alert(err.response.data.message);
//         });
//     };

//     const openModal = () => {
//       delProductModal.show();
//     };

//     const hideModal = () => {
//       delProductModal.hide();
//     };

//     onMounted(() => {
//       delProductModal = new bootstrap.Modal(
//         document.getElementById("delProductModal"),
//         {
//           keyboard: false,
//           backdrop: "static",
//         }
//       );
//     });

//     return {
//       delProduct,
//       openModal,
//     };
//   },
// });

app.mount("#app");
