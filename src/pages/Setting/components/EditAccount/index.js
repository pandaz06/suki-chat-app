import EditItem from '../EditItem';

function EditAccount() {
    return (
        <div>
            <EditItem
                isEditable
                title="Tiểu sử"
                content="Gia nhập Suki từ ngày 23/08/2022 - một thành viên của các tổ chức Illuminanties, Avengers, TVA, Shield. Ông hoàng tài chính, chúa tể code dạo, chuyên gia tỉa nến, fan cứng anh Ma Gêm minh, anh Nờ tờ nờ"
            />
            <EditItem isEditable title="Ngày sinh" content="10/02/2006" />
            <EditItem isEditable title="Github" content="www.github.com" />
            <EditItem isEditable title="Facebook" content="www.facebook.com" />
            <EditItem isEditable title="Instagram" content="www.instagram.com" />
            <EditItem isEditable title="Youtube" content="www.youtube.com" />
        </div>
    );
}

export default EditAccount;
