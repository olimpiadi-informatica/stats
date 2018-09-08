import React from "react";
import { Link } from "react-router-dom";

import { OrdinalFrame } from "semiotic";

function WindRose() {
  return (
    <div>
      <OrdinalFrame
        size={[400, 400]}
        data={windRoseData}
        oAccessor={"angle"}
        rAccessor={"wind"}
        style={{ fill: "#00a2ce", stroke: "white" }}
        type={"bar"}
        projection={"radial"}
        axis={{
          label: { name: "Windiness", locationDistance: 15 }
        }}
        oPadding={1}
        margin={{ bottom: 40, top: 60, left: 25, right: 25 }}
        hoverAnnotation={true}
      />
    </div>
  );
}

export default WindRose;

const windRoseData = [
  { angle: "005-015", wind: 0.37 },
  { angle: "015-025", wind: 0.344 },
  { angle: "025-035", wind: 0.257 },
  { angle: "035-045", wind: 0.231 },
  { angle: "045-055", wind: 0.182 },
  { angle: "055-065", wind: 0.193 },
  { angle: "065-075", wind: 0.372 },
  { angle: "075-085", wind: 0.647 },
  { angle: "085-095", wind: 0.598 },
  { angle: "095-105", wind: 0.453 },
  { angle: "105-115", wind: 0.491 },
  { angle: "115-125", wind: 0.491 },
  { angle: "125-135", wind: 0.323 },
  { angle: "135-145", wind: 0.352 },
  { angle: "145-155", wind: 0.436 },
  { angle: "155-165", wind: 0.338 },
  { angle: "165-175", wind: 0.471 },
  { angle: "175-185", wind: 0.653 },
  { angle: "185-195", wind: 0.653 },
  { angle: "195-205", wind: 0.647 },
  { angle: "205-215", wind: 0.577 },
  { angle: "215-225", wind: 0.557 },
  { angle: "225-235", wind: 0.586 },
  { angle: "235-245", wind: 0.661 },
  { angle: "245-255", wind: 0.78 },
  { angle: "255-265", wind: 1.103 },
  { angle: "265-275", wind: 1.753 },
  { angle: "275-285", wind: 2.382 },
  { angle: "285-295", wind: 1.914 },
  { angle: "295-305", wind: 2.391 },
  { angle: "305-315", wind: 1.966 },
  { angle: "315-325", wind: 1.317 },
  { angle: "325-335", wind: 0.944 },
  { angle: "335-345", wind: 0.817 },
  { angle: "345-355", wind: 0.569 }
];
