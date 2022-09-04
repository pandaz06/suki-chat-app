import { useContext } from 'react';

import EditItem from '../EditItem';
import { ThemeContext } from '~/contexts/ThemeContext';

function EditAppearance() {
    const { dark, setDark } = useContext(ThemeContext);
    return (
        <div>
            <EditItem
                isToggle
                isActive={dark}
                title="Chủ đề"
                value={dark ? 'Tối' : 'Sáng'}
                onToggle={() => setDark(!dark)}
            />
        </div>
    );
}

export default EditAppearance;
