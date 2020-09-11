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
    <svg xmlns="http://www.w3.org/2000/svg" width="65.907" height="61.568" viewBox="0 0 17.437775 16.289738" {...props}>
      <path
        d="M8.857.16l.215 1.058.576 1.473.398.632.349.716.365.56.741.896.791.763.382.31.996.674.028.215.304.436.57.507.088.293 1.024.66.747.315.226.033.061.616-.055.27.2.247.403.22-.166.363.039.307-.376.192-.57.741-.045.4-.486.351-.15.472-.27.421-.194.055-.172.329-.426.399-.249-.208-.177-.794-.67-.553-.337.132-.171-.335-.216.017-.172-.187-.564.444-.094.274-.498.148-.183.197.172.23.055.389.305.17-.078.245-.343.011-.42.132h-.449l-.486.716-.244-.148-.37-.027-.15.098-.205-.383-.935-.306-.326-.027-.398-.23-.006-.17-.316-.311-.227.076-.298-.257-.233.093-.066.28-.443.213-.138.158-.487-.24-.171-.378-.393-.098-.078-.148-.47-.22-.155.23-.243-.174-.067-.471.238-.455-.27-.285H3.24l-.144-.253-.36-.071-.525-.406-.321-.066-.576-.379-.337-.137-.039.214-.454-.088-.27-.44-.078-.33.177-.576.221-.05.26-.28.006-.44.365.016.443.34.133-.11.636.414.26-.16.288.016.171-.297.437-.247-.348-.37-.116-.286-.271-.033-.615-.722-.022-.425-.713-.491.348-.32V6.7l-.332-.182-.376-.392.365-.244.172-.31.06-.354-.199-.199.332-.787.68.056.294.166.349-.122.514-.01.127-.134.012-.41.132-.277-.376-.095-.194-.25.072-.343-.132-.09.442.19.376-.256.238-.36h.36l.15-.179-.017-.316.26-.323.05-.283.36.216.48-.2.144.161.271-.05.349-.205.227-.434.559-.073L7.9.39z"
        fill="#fff"
        stroke="#000"
        strokeWidth=".265"
      />
    </svg>
  );
};
