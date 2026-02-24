import checker from "vite-plugin-checker";

export default {
  preview: {
    port: 3000,
  },
  plugins: [
    checker({
      typescript: true,
    }),
  ],
};
