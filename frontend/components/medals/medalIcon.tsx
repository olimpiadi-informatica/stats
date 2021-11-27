type Props = {
  color: string | null;
};

const COLORS: any = {
  gold: "#ffdb19",
  silver: "#c0c0c0",
  bronze: "#cd7f32",
};

export function MedalIcon({ color }: Props) {
  if (!color) return <span />;
  const colorCode = COLORS[color];
  if (!color) return <span />;
  return (
    <svg fill={colorCode} width="35px" height="35px" viewBox="0 0 1024 1024">
      <path d="M547 304.2h-451l108.2-207.8h481.4z M685.6 754.4c0 95.656-77.544 173.2-173.2 173.2s-173.2-77.544-173.2-173.2c0-95.656 77.544-173.2 173.2-173.2s173.2 77.544 173.2 173.2z M697.8 598.2l230.2-294-138.6-207.8-276.6 415.6c64.6 0 125.4 25.4 171 71 5 5 9.6 10 14 15.2z M411.6 533.2l-107-161.2h-207.8l180.2 323c10.4-42.4 32.2-81.2 64-112.8 20.8-20.6 44.6-37.2 70.6-49z" />
    </svg>
  );
}
