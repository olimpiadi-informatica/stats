type Props = {
  error: any;
};

export function Error({ error }: Props) {
  return <p>Error: {JSON.stringify(error)}</p>;
}
