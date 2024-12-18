import { useEffect, useState } from "react";
import authenticationApi from "../../services/api/authenticationApi";
import { UserResponseDto } from "../../interfaces/authentication";
import { Button, Divider, message, Space, Spin } from "antd";
import { SubscriptionResponseDto } from "../../interfaces/subscriptions";
import subscriptionApi from "../../services/api/subscriptionApi";
import useStyles from "./styles";
import { PropertyFieldProps } from "../../components/PropertyField/props";
import PropertyCard from "../../components/PropertyCard";

const Profile = () => {
  const [user, setUser] = useState<UserResponseDto>();
  const [subscription, setSubscription] = useState<SubscriptionResponseDto>();
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const { styles } = useStyles();
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await authenticationApi.getUser();
      const subscriptionResponse = await subscriptionApi.getSubsription();
      if (response.status === 200 && subscriptionResponse.status === 200) {
        setUser(response.data);
        setSubscription(subscriptionResponse.data);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handlePayDue = async () => {
    const payDueRes = await subscriptionApi.payRemainingFee();
    const paymentUrl = payDueRes.data.paymentUrl;
    redirectToPayment(paymentUrl);
  };

  const handleRenew = async () => {
    const renewRes = await subscriptionApi.renew();
    const paymentUrl = renewRes.data.paymentUrl;
    redirectToPayment(paymentUrl);
  }

  const redirectToPayment = (paymentUrl: string) => {
    messageApi.info('Đang chuyển hướng tới cổng thanh toán...');
    setTimeout(() => {
      window.location.href = paymentUrl
    }, 1500);
  }

  const userInfo: PropertyFieldProps[] = [
    {
      title: "Thông tin người dùng",
    },
    {
      title: "Tên",
      content: user?.name,
    },
    {
      title: "Phân quyền",
      content: user?.role,
    },
    {
      title: "Email",
      content: user?.email,
    },
    {
      title: "Số điện thoại",
      content: user?.phone,
    },
  ];
  const subscriptionInfo: PropertyFieldProps[] = [
    {
      title: "Thông tin Gói đăng kí",
    },
    {
      title: "Tên gói",
      content: subscription?.name,
    },
    {
      title: "Thời hạn",
      content: `${subscription?.period} tháng`,
    },
    {
      title: "Ngày hết hạn",
      content: new Date(subscription?.endDate ?? "").toLocaleDateString(),
    },
    {
      title: "Dư nợ",
      content: `${subscription?.remainingFee} VND`,
    },
  ];
  return loading ? (
    <Spin />
  ) : (
    <>
    {contextHolder}
    <Space className={styles.container}>
      <PropertyCard className={styles.card} content={userInfo} />
      <PropertyCard className={styles.card} content={subscriptionInfo} />
    </Space>
    <Divider />
    <Button type="primary" onClick={handlePayDue}>Thanh toán dư nợ</Button>
    <Divider type="vertical"/>
    <Button type="primary" onClick={handleRenew}>Gia hạn gói thành viên</Button>
    </>
  );
};
export default Profile;
