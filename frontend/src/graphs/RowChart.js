import React, { Component } from "react";

import { OrdinalFrame } from "semiotic";
import "../styles/axis-style";

const ma = [
  { x: "ABR", y: "0.3636", title: "Abruzzo" },
  { x: "BAS", y: "0.0769", title: "Basilicata" },
  { x: "CAL", y: "0.2632", title: "Calabria" },
  { x: "CAM", y: "0.2593", title: "Campania" },
  { x: "EMI", y: "0.4242", title: "Emilia-Romagna" },
  { x: "FRI", y: "0.5918", title: "Friuli-Venezia Giulia" },
  { x: "LAZ", y: "0.5306", title: "Lazio" },
  { x: "LIG", y: "0.5217", title: "Liguria" },
  { x: "LOM", y: "0.5205", title: "Lombardia" },
  { x: "MAR", y: "0.2500", title: "Marche" },
  { x: "MOL", y: "0.2222", title: "Molise" },
  { x: "PIE", y: "0.5000", title: "Piemonte" },
  { x: "PUG", y: "0.3529", title: "Puglia" },
  { x: "SAR", y: "0.3077", title: "Sardegna" },
  { x: "SIC", y: "0.3902", title: "Sicilia" },
  { x: "TOS", y: "0.3333", title: "Toscana" },
  { x: "TRE", y: "0.5200", title: "Trentino-Alto Adige" },
  { x: "UMB", y: "0.3077", title: "Umbria" },
  { x: "VAL", y: "0.0000", title: "Valle d'Aosta" },
  { x: "VEN", y: "0.4413", title: "Veneto" }
];

class RowChart extends Component {
  constructor(props) {
    super(props);
  }

  colorThresholds(value) {
    const colors = ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"];
    if (value < 0.2) return colors[0];
    else if (value < 0.4) return colors[1];
    else if (value < 0.6) return colors[2];
    else if (value < 0.8) return colors[3];
    else if (value < 1) return colors[4];
  }

  render() {
    const axis = {
      orient: "left",
      tickFormat: d => d,
      label: {
        name: " ",
        position: { anchor: "middle" },
        locationDistance: 50
      }
    };
    return (
      <div>
        <OrdinalFrame
          title="Medals per Contestans"
          size={[470, 600]}
          data={ma}
          axis={axis}
          rExtent={{
            onChange: d => {
              this.setState({ rExtent: d });
            }
          }}
          oExtent={{
            onChange: d => {
              this.setState({ oExtent: d });
            }
          }}
          projection={"horizontal"}
          type={"bar"}
          oLabel={(d, column, i) => (
            <g>
              <rect
                width={620}
                height={50}
                y={-25}
                style={{
                  fill: i % 2 === 0 ? "white" : "white",
                  stroke: "none",
                  opacity: 0.1
                }}
              />
              <text x={-5} y={5} textAnchor="end">
                {d}
              </text>
            </g>
          )}
          oPadding={10}
          oAccessor={"x"}
          rAccessor={"y"}
          style={d => {
            return { fill: this.colorThresholds(d.y), stroke: "black" };
          }}
          pieceHoverAnnotation={true}
          tooltipContent={d => (
            <div className="tooltip-content">
              <p>
                {d.title} <br /> {d.y}
              </p>
            </div>
          )}
          margin={{ left: 60, top: 50, bottom: 50, right: 10 }}
        />
      </div>
    );
  }
}

export default RowChart;
