type BackArrowProps = {
  fillColor?: string;
  size?: string;
};

export const BackArrow = ({
  fillColor = "white",
  size = "50px",
}: BackArrowProps) => {
  return (
    <svg
      fill={fillColor}
      height={size}
      width={size}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 476.213 476.213"
    >
      <polygon
        points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
	57.427,253.107 476.213,253.107 "
      />
    </svg>
  );
};
