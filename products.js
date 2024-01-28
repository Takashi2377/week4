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
    /*composition API 中，欲使用ref取得DOM元素，需先創建空的ref，
    名稱與模板中定義的ref屬性值相同，在onMounted階段後便會取得對應的DOM元素，記得return*/

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
        pModal.value.openModal(); //利用ref取得元件的DOM元素，從而呼叫元件中的方法
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
    });

    return {
      products,
      tempProduct,
      pagination,
      isNew,
      pModal, //記得return
      dModal,
      getData,
      openModal,
    };
  },
});

app.mount("#app");
