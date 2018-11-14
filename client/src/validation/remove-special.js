const removeSpecial = value => {
  var lower = value.toLowerCase();
  var upper = value.toUpperCase();

  var allowed = ["-", "&", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  var res = "";
  for (var i = 0; i < lower.length; ++i) {
    if (allowed.indexOf(lower[i]) > -1) {
      res += value[i];
    } else {
      if (lower[i] !== upper[i] || lower[i].trim() === "") {
        res += value[i];
      }
    }
  }
  return res;
};

export default removeSpecial;
