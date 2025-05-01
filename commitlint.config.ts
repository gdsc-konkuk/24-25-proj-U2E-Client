import conventionalConfig from "@commitlint/config-conventional";

const defaultTypes = conventionalConfig.rules["type-enum"][2];
const types = [...defaultTypes, "ui"];

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", types],
  },
};
