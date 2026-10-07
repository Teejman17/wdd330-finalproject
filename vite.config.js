import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/final_project/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/final_project/index.html"),
        // cart: resolve(__dirname, "src/cart/index.html"),
        // checkout: resolve(__dirname, "src/checkout/index.html"),
        // product: resolve(__dirname, "src/product_pages/index.html"),
        // product_listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
