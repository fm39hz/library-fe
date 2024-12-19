import { Typography } from "antd";
import { PropertyFieldProps } from "./props";

const PropertyField = (props: PropertyFieldProps) => {
  return (
    <Typography>
      <strong>{props.title} </strong>
      {props.content}
    </Typography>
  );
};

export default PropertyField;
