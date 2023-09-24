import React from "react";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function Image({ ...props }: Props) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        backgroundColor: "#444",
        height: "200px",
        width: "190px",
      }}
    >
      <img
        {...props}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
}

export default Image;
