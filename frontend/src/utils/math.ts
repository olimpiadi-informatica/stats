exports.round = function(num: number, scale: number) {
  let num_as_str: string = "" + num;
  let scale_as_str: string = "" + scale;
  if (!num_as_str.includes("e")) {
    return +(
      Math.round(parseFloat(num_as_str + "e+" + scale_as_str)) +
      "e-" +
      scale_as_str
    );
  } else {
    var arr = num_as_str.split("e");
    var sig = "";
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    let base: any = +arr[0] + "e" + sig + (+arr[1] + scale);
    return +(Math.round(base) + "e-" + scale_as_str);
  }
};
