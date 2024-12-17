import { useEffect, useState } from "react";
import authenticationApi from "../../services/api/authenticationApi";
import { UserResponseDto } from "../../interfaces/authentication";
import { Col, Flex, Input, Row, Spin, Typography } from "antd";
import { SubscriptionResponseDto } from "../../interfaces/subscriptions";
import subscriptionApi from "../../services/api/subscriptionApi";

const Profile = () => {
  const [user, setUser] = useState<UserResponseDto>();
  const [editMode, setEditMode] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionResponseDto>();
  const [loading, setLoading] = useState(true);
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
  return (
    <Flex>
      <Col>
        <Typography>Thông tin người dùng</Typography>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row>
            Tên:
            <Input
              value={user?.username}
              placeholder="username"
              contentEditable={editMode}
            />
          </Row>
        )}
      </Col>
    </Flex>
  );
};
export default Profile;
