function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

import React from "react";
export default _ref => {
  let { styles = {} } = _ref,
    props = _objectWithoutProperties(_ref, ["styles"]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="139.343"
      height="154.071"
      viewBox="0 0 36.867779 40.764614"
      {...props}
    >
      <path
        d="M6.085 40.244l.818.09.117.27-.426.026zM.397 24.44l.448.23.144-.031.36.29.044.469-.32.33-.4-.127-.132-.27-.404-.427.028-.301zm3.458-13.662l.603.414-.138.228-.194-.186-.487.051-.144-.264zm-2.379-.466l.16.44-.343-.005-.154-.43zM35.336 6.5l.608.338.448.114-.642.208-.133.177-.138.452.044.171-.415.716-.166.456-.243.425-.36.378-.896 1.248-.039.17-.365.368-.376.594.05.15-.293.284-.382.68.144.398-.16.31-.034.35-.238.273.017.7-.305.376-.287.175-.305.592.067.93-.011.58.138.595.299.01.282.262.586.22.31.339-.63.087-.061.487.166.22.022.276.326.481.542.098.078.332-.205.563.343-.036-.127.27-.37.236-.056.27-.233.016-.464.311-.288.337-.2.633-.298.32-.005.429-.116.092.072.443.188.24.039.488.143.208-.542.418-.254-.148-.072-.214-.26-.244-.659.076-.426-.366-.575-.071-.243.178-.42.132-.388-.203-.559-.01-.15-.245-.403-.285-.725-.209-.609-.046-.343-.362.017-.142-.227-.683-.597-.99-.753-.854-.542-.378-.824-.363-.847-.18-.348.042-.565-.02-.437.173-.276-.005-.437-.2-.133-.26-.21-.144-.709-.056-.248-.256-.626-.292-.215-.44-.16-.046-.681-.651-.399-.062-.315.056-.304-.071-.415-.462-.41-.21-.138-.154-.26-.031-.266-.313-.21.005-.122-.334-.232-.216-.216-.35-.177-.03-.227-.309-.403-.036-.526-.16-.376.13-.238-.176-.266-.406-.381-.35-.858-.15-.769.027-1.051.262-.426-.51-.144-.427-.487-.32-.437.02-.47-.546.01-.48-.21-.433-.254-.289.37-.17.023-.393.188-.119-.177-.692.282-.513-.011-.32.432-.145-.21-.254.43-.637h.482l.327-.156.182-.435.47.041.26-.389-.182-.311L8.33 8l-.006.224.233.337-.011.311.376.555.641.507.592-.108.941-.487.243-.197-.21-.54.476-.736.537.067.044.192.277.01.392-.155.1-.208.288.01.215-.249.222-.083.077.26.327.156.166.493-.1.306.177.228.548.166.481-.083.155-.208.315.073.022.674.25.238.547.352 1.19.497.874-.155.658-.295.415-.259.36-.02.503-.14.293.264.437.046.449-.108.719.17.42-.03.404.051.282-.134.305.04.48-.294.493.088.581-.15.177-.156.327-.015.442-.14.432-.327.686-.835.41.156 1.012-.265.227-.234.31.182.215.306.764.021.127.28.221.094.299-.078.553-.296.437-.467.122-.25.62.032.57-.125.957-.425.702-.593zm-5.672-1.629l-.005.183.36.25.1.28-.294.094-.265-.187-.133-.26zm.005-1.13l.045.218-.094.84-.227-.271-.332-.22.077-.448zm-1.4-.757l.548.042-.016.553-.16.042-.582-.34zm-2.622-.021l.304.094-.038.266-.2-.016zm-13.3-1.677l.133.23-.365.136.022-.23zM32.197.15l.21.084-.149.356-.143.068-.244-.261z"
        fill="#fff"
        stroke="#000"
        strokeWidth=".265"
      />
    </svg>
  );
};
