import { Button, Divider } from "antd";
import Search from "antd/es/input/Search";

export const CardExtra = (onclick: () => void) => {
    return <>
        <Search placeholder="Tìm kiếm" style={{ width: 200 }} />
        <Divider type="vertical" />
        <Button
            onClick={() => onclick()}
        >
            Thêm mới
        </Button>
    </>
};