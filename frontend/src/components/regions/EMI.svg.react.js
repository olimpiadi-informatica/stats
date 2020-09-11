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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="131.834"
      height="73.355"
      viewBox="0 0 34.881039 19.408506"
      {...props}
    >
      <path
        d="M21.802 2.786l.072.282.293-.086.658-.012.532.346.055.265.32.04.432-.34.736-.317.022-.288.354-.086.166-.156.365.04.808-.029.404-.167.957.237.36-.023.415.593.276-.19.216.225.327.04.304-.27.238.01.138.226-.122.19.045.564.166.207.315.04.205.53.392.305-.226-.098-.648-.58-.221.01v.34l-.282.495-.133.568-.028.707.1.447.183.333.132.63-.038.962.088.709.266.749.072.622.215.662.117.57.32.757 1.179 1.439.431.415.216.073.559.682.503.476.294.193.348.062-.232.584.066.38-.122.475-.387.107-.01.334-.565.074-.216-.38-.122-.47-.232.069-.72-.459.216-.447-.094-.352-.36-.057-.326.318-.282.074-.343-.187-.16.164-.288-.136-.271.436-.21-.017-.592.272-.41-.215-.022.374-.287.673-.072.311-.277.492-.06.311.104.152-.293.176-.16-.17-.493-.141-.227.028-.326-.192-.061-.198-.885-.339-.138.108-.56-.538-.508-.21-.21-.192.066-.6-.338-.22.1-.205-.365-.289-.094-.198.481-.619.138-.425.25-.256.17-.489-.724-.006-.249.29-.537-.335.133-.472-.564-.074-.36.108-.664-.569.034-.296-.294-.245-.392.536-.371-.074-.194.313-.41.364-.447-.04-.338.244.498.336-.365.227-.526-.182-.31.034-.37.267-.586-.08-.272-.215-.083-.318-.47.727-.254.255-.15-.312-.265-.193-.703-.256-.586-.506-.686.023-.305-.068-.166.25-.006.284-.298.069-.15-.228-.514-.341-.017-.239-.37-.404-.183-.341-.299.045-.625-.587h-.277l-.448-.222-.42.234-.349-.49-.481-.337-.255-.33-.42.102-1.068-.788.172-.377-.255-.183-.1-.263-.387-.097-.664.006-.415.063-.094.212-.758.976-.15-.051-.292.234-.117.017-.193-.64-.47-.268-.465-.091-.63.194-.195.16-.154-.411.116-.423.26-.126.072-.647-.271-.48-.321-.04-.233-.161-.138-.286-.238.326-.398-.023-.387-.4-.272.165-.26-.326-.415.086-.027-.998.393-.029.564.103.094-.338.238-.402-.454-.333.011-.184.288-.156.039-.2.326-.18-.122-.799-.503-.167-.089-.19.133-.374.194-.185.32-.836.277-.312-.05-.386.664-.624.609-.14.299.348.343-.434.193.139.52-.249-.094.41.277.082.515.323.398-.387.249-.04.548.242.083-.34.381.306.172-.278-.205-.237.017-.208.332-.168.204.475.338-.382.21.035.354.485-.077.243.354.491.476.266.498-.3.354.219.166-.081.42.208.188.271.89.456.178-.18.326.018.183.479.277.08.542.335.52.052.53-.208.35-.61.226-.249.437-.07.16.399-.043.184.763.18.664.328.26-.162.238.03.548-.45.597.074.138-.19.493.162.276.248.863-.173.3.103.12-.253.41-.075.3.167.204-.11z"
        fill="#fff"
        stroke="#000"
        strokeWidth=".265"
      />
    </svg>
  );
};
