import React from "react";
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

export default _ref => {
  let props = _objectWithoutProperties(_ref, ["styles"]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="59.25" height="106.157" viewBox="0 0 15.676529 28.087376" {...props}>
      <path
        d="M10.002.343L9.62.855l-.061.543.188.773.11.122-.254.463-.354.373-.37.51-.35.6-.066.282.045.51.354.323-.033.822.868.472.714.015.503.07.16-.107.255.122.349.323.077.249.443.418 1.018.566.415.069.354.602.625.412.354.084-.166.26-.26.764-.05.812.399.585-.305.79-.05.593.227.452.377.331.276.084-.265.237-.139.357.1.335-.21.11-.338.425-.199.048-.487-.168-.21.173-.36-.404-.249-.021-1.145.278-.907.414-.686.482-.708.409-.327.502-.006.23-.32.398-.023.23.227.309-.028.313.166 1.065-.006.449.106.928-.155.427-.67.78-.448.323-1.25.5-.504.68-1.084 1.35-.155 1.228-.426.875-.365.445-.659.104-.708-.171-.957.13-.592.03-.52-.243-.31-.217-.387-.59-.039-.197.188-.166-.033-.45-.155-.11-.033-.331.25-.4-.04-.274-.193-.416.027-.514.626-.254.475-.047.449-.291.332-.54.066-.5.127-.089.321-.739.2-.099.165-.875.122-.392-.636-.636-.371-.423.232-.46.415-.23.526-.13.36-.398.542-.052.57.204.331-.073.493-.403.249-.623.105-.44v-.959l-.221-.267-.42-.247-.25-.603-.27-.315-.178-.846-.171-.537-.095-1.7-.204-1.013-.393-1.156-.32-.386-.377-.671-.404-.19-.077-.133-.421-1.472-.16-.101-.067-.759-.21-1.003-.166-.255.205-.175-.1-.548-.232-.383.155-.41.232-.202.243-.383.238-.032.52.287.294-.245.498.235.497-.139L3.8 2.4l.155.42.298.325.288.022.47-.139.266-.16.542.304.022-.404.205.032.299-.133.464.09.26.335.16-.218-.21-.213.592-1.049-.055-.293.205-.49-.05-.512.42-.176.759.208.536-.187.415.043z"
        fill="#fff"
        stroke="#000"
        strokeWidth=".265"
      />
    </svg>
  );
};
