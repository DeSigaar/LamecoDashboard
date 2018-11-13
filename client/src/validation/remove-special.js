const removeSpecial = value => {
  var lower = value.toLowerCase();
  var upper = value.toUpperCase();

  var res = "";
  for (var i = 0; i < lower.length; ++i) {
    if (lower[i] !== "-") {
      if (lower[i] !== upper[i] || lower[i].trim() === "") {
        res += value[i];
      }
    } else {
      res += value[i];
    }
  }

  return res;
};

export default removeSpecial;
