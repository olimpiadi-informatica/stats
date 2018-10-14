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
      width="68.086"
      height="65.835"
      viewBox="0 0 18.014303 17.418968"
      {...props}
    >
      <path
        d="M17.834 14.517l-.958.228-.354.223-.558.072-.227.434-.349.206-.27.05-.145-.161-.481.2-.36-.217-.05.284-.26.322.017.317-.15.178h-.359l-.238.36-.376.256-.443-.189-.558-.516-.205.005-.105.245-.625-.156.06-.31.2-.195.282.05.182-.54-.16-.545-.847.234-.47-.763-.31-.133-.254-.273-.764.662-.072-.406.078-.334-.786-.519.122-.267-.2-.33.183-.34-.16-.313.072-.463-.216-.397-.315.011-.116-.252.304-.33v-.604l-.25-.084-.115-.655-.343-.241.121-.308-.536-1.106.27-.157-.082-.32.01-.455-.314-.062-.255.534-.443-.163-.365.213-.597-.522-.625-.827-.415.056-.188-.281-.166.028-.216.31-.316-.282-.326.14-.194-.258.31-.14.277-.417-.16-.44-.61.321h-.669l-.11-.23-.277-.424.338-.118.713-.451.377.135-.023-.44.371-.107-.398-.486-.42-.186-.416.152-.315-.05-.127.333-.31-.401-.393.175-.16-.062-.105-.153.06-.31.277-.492.072-.312.288-.673L.86.71l.41.215.591-.272.21.017.271-.436.288.136.16-.164.344.187.033.617.022.08L3.454 1l.166.136.305-.068.055-.21.72.459.232-.068.121.47.216.379.564-.074.012-.333.387-.108.122-.475-.067-.38.233-.584.48.063.908.566.094-.028.576.6 1.056.826.294.323 1.643 1.45 1.444.88.592.187.27-.305.194.107.36.44.05.23.564.322-.05.652.41.85.249.82.26.69.166.212.398.92.11.425.56 1.443.055.514.376 1.562zM1.136 2.799l.377-.22.01-.17-.669-.068z"
        fill="#fff"
        stroke="#000"
        strokeWidth=".265"
      />
    </svg>
  );
};
