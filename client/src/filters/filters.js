export default {
  filters: {
    dollarize: function(value) {
      if (value) {
        return `$${parseInt(value).toLocaleString()}`;
      } else {
        return "$0";
      }
    },
    localizeNumber: function(value) {
      if (value) {
        return value.toLocaleString();
      }
    },
    round: function(value, decimals) {
      {
        if (!value) {
          value = 0;
        }

        if (!decimals) {
          decimals = 0;
        }

        value =
          Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
        return value;
      }
    },
    percentage: function(value, decimals) {
      if (!value) {
        value = 0;
      }

      if (!decimals) {
        decimals = 0;
      }

      value = value * 100;
      value =
        Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
      value = value + "%";
      return value;
    },
  },
  create: function(Vue) {
    Object.keys(this.filters).forEach(
      function(filter) {
        Vue.filter(filter, this.filters[filter]);
      }.bind(this)
    );
  },
};
