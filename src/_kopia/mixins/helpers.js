export const helpers = {
  data() {
    return {
      tabs: ""
    };
  },
  methods: {
    to_slug(value) {
      if (value === undefined) {
        return "";
      }
      // if first number
      if (/^\d/.test(value)) {
        value = "x" + value;
      }
      return value
        .toString()
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .replace(/\„/g, "")
        .replace(/\”/g, "")
        .replace(/\,/g, "")
        .replace(/\:/g, "")
        .replace(/\//g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\./g, "")
        .replace(/\%/g, "")
        .replace(/\+/g, "")
        .replace(/\~/g, "")
        .toLowerCase();
    },
    slash_to_comma(value) {
      if (value === undefined) {
        return "";
      }
      return value.toString().replace(/\//g, ",");
    },
    slash_to_double_comma(value) {
      if (value === undefined) {
        return "";
      }
      return value.toString().replace(/\//g, ",,");
    },
    camelToKebab(str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
  }
};
