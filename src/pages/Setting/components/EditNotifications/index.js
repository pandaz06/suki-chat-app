import EditItem from '../EditItem';

function EditNotifications() {
    return (
        <div>
            <EditItem isToggle title="Tổng quan" />
            <EditItem isToggle title="Tin nhắn" />
            <EditItem isToggle title="Lời mời kết bạn" />
        </div>
    );
}

export default EditNotifications;
