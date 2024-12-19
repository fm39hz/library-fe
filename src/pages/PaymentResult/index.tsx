import { useLocation } from "react-router-dom";
import { PropertyFieldProps } from "../../components/PropertyField/props";
import PropertyCard from "../../components/PropertyCard";

const PaymentResult = () => {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("id")!;
  const status = query.get("status")!;
  const amount = query.get("amount")!;
  const invoice: PropertyFieldProps[] = [
    {
      title: "Thông tin hóa đơn",
      content: status === "success" ? "Thành công" : "Thất bại",
    },
  ].concat([
    {
      title: "Mã hóa đơn",
      content: id!,
    },
    {
      title: "Trạng thái",
      content: status!,
    },
    {
      title: "Giá tiền",
      content: `${amount} VNĐ`,
    },
  ]);

  return <PropertyCard content={invoice} />;
};

export default PaymentResult;
