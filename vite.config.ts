import react from "@vitejs/plugin-react";
import { PluginOption, defineConfig } from "vite";
import { stylex } from "vite-plugin-stylex-dev";

// https://stackoverflow.com/a/75689907
const fullReloadAlways: PluginOption = {
  name: "full-reload-always",
  handleHotUpdate({ server }) {
    server.ws.send({ type: "full-reload" });
    return [];
  },
};

export default defineConfig({
  plugins: [
    fullReloadAlways,

    react({
      babel: {
        plugins: [
          //// // https://react.dev/learn/react-compiler
          //// ["babel-plugin-react-compiler", {}],

          // https://www.locatorjs.com/install/react-data-id?stack=Vite
          ["@locator/babel-jsx/dist", { env: "development" }],
        ],
      },
    }),
    stylex({ enableStylexExtend: true }),
  ],
});
