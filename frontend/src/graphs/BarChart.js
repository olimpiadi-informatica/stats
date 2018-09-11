import React from "react";
// import { Link } from "react-router-dom";

import { OrdinalFrame } from "semiotic";

function BarChart() {
  const colorHash = {
    tweets: "#4d430c",
    retweets: "#b3331d",
    favorites: "#b6a756"
  };
  return (
    <div>
      <OrdinalFrame
        size={[300, 500]}
        data={inflatedBarChartData}
        oAccessor={"user"}
        rAccessor={"value"}
        style={d => ({ fill: colorHash[d.action], stroke: "white" })}
        type={"bar"}
        oLabel={d => <text transform="translate(-15,0)rotate(45)">{d}</text>}
        axis={{ orient: "left", label: "Tweets + Favorites + Retweets" }}
        margin={{ left: 70, bottom: 50, right: 5, top: 5 }}
        oPadding={5}
      />
    </div>
  );
}

export default BarChart;

const inflatedBarChartData = [
  { user: "Jason", type: "tweets", value: 10 },
  { user: "Susie", type: "tweets", value: 5 },
  { user: "Matt", type: "tweets", value: 20 },
  { user: "Betty", type: "tweets", value: 30 },
  { user: "Jason", type: "retweets", value: 5 },
  { user: "Susie", type: "retweets", value: 100 },
  { user: "Matt", type: "retweets", value: 25 },
  { user: "Betty", type: "retweets", value: 20 },
  { user: "Jason", type: "favorites", value: 15 },
  { user: "Susie", type: "favorites", value: 100 },
  { user: "Matt", type: "favorites", value: 50 },
  { user: "Betty", type: "favorites", value: 10 }
];
