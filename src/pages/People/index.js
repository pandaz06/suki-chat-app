import classNames from 'classnames/bind';
import { useState } from 'react';

import { ProfileOverview, PeopleList } from './components';

import styles from './People.module.scss';

const cx = classNames.bind(styles);

function People() {
    const [currentID, setCurrentID] = useState(0);

    return (
        <div className={'container ' + cx('wrapper')}>
            <PeopleList currentID={currentID} setCurrentID={setCurrentID} />
            <ProfileOverview currentID={currentID} setCurrentID={setCurrentID} />
        </div>
    );
}

export default People;
