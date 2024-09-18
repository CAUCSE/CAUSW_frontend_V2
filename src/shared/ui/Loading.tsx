import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "flex",
  margin: "0 auto",
  borderColor: "#99dfec",
  textAlign: "center",
};

export const Loading = ({
  loading,
  size,
}: {
  loading: boolean;
  size: number;
}) => (
  <div>
    <ClipLoader
      color="#99dfec"
      loading={loading}
      cssOverride={override}
      speedMultiplier={1}
      size={size}
    />
  </div>
);
