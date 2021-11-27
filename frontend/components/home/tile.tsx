import React from "react";
import styles from "./tile.module.scss";
import { Card } from "react-bootstrap";

const variantStyles = {
  region: styles.tileRegion,
};

type Props = {
  variant: keyof typeof variantStyles;
  children: React.ReactNode;
};

export function Tile({ variant, children }: Props) {
  return (
    <Card className={`${styles.tile} ${variantStyles[variant]}`}>
      {children}
    </Card>
  );
}
