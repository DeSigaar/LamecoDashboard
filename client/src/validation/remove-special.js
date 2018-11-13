const removeSpecial = value => {
  var lower = value.toLowerCase();
  var upper = value.toUpperCase();

  var res = "";
  for (var i = 0; i < lower.length; ++i) {
    if (allowed.indexOf(lower[i]) > -1) {
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
