import { Card } from "antd";
import PropertyField from "../PropertyField";
import { PropertyCardProps } from "./props";
import { PropertyFieldProps } from "../PropertyField/props";

const PropertyCard = (props: PropertyCardProps) => {
  return (
    <Card className={props.className}>
      {props.content?.map((item: PropertyFieldProps, index) => (
        <PropertyField key={index} {...item} />
      ))}
    </Card>
  );
};

export default PropertyCard;
