import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server:{
    proxy:{
      '/graphql': {
          target: 'http://localhost:4000/graphql',
          secure:false,
          changeOrigin:true
      }
    }
  }
});
