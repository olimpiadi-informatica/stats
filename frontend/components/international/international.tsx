import { International } from "lib/remote/common";
import React from "react";
import { Badge } from "react-bootstrap";
import styles from "./international.module.scss";

type Props = {
  international: International;
};

function getContrastYIQ(hexcolor: string) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substring(0, 2), 16);
  var g = parseInt(hexcolor.substring(2, 4), 16);
  var b = parseInt(hexcolor.substring(4, 6), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq > 150 ? "black" : "white";
}

export function International({ international }: Props) {
  const color = getContrastYIQ(international.color);
  return (
    <Badge
      pill
      bg=""
      className={styles.international}
      style={
        {
          "--background": international.color,
          "--color": color,
        } as React.CSSProperties
      }
    >
      {international.link ? (
        <a href={international.link} target="_blank" rel="noreferrer">
          <abbr title={international.name}>{international.code}</abbr>
        </a>
      ) : (
        <abbr title={international.name}>{international.code}</abbr>
      )}
    </Badge>
  );
}
