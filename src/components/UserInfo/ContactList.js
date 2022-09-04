import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useContext } from 'react';

import styles from './UserInfo.module.scss';
import Button from '../Button';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classnames.bind(styles);

function ContactList() {
    const {
        user: {
            profile: { facebookRef, githubRef, youtubeRef, twitterRef, tiktokRef },
        },
    } = useContext(AuthContext);

    return (
        <div className={cx('contact-list')}>
            {facebookRef && (
                <div className={cx('item')}>
                    <div className={cx('brand')}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </div>
                    <Button
                        text
                        className={cx('link')}
                        rel="noreferrer"
                        target="_blank"
                        href={`https://${facebookRef}`}
                    >
                        {facebookRef}
                    </Button>
                </div>
            )}
            {githubRef && (
                <div className={cx('item')}>
                    <div className={cx('brand')}>
                        <FontAwesomeIcon icon={faGithub} />
                    </div>
                    <Button text className={cx('link')} rel="noreferrer" target="_blank" href={`https://${githubRef}`}>
                        {githubRef}
                    </Button>
                </div>
            )}
            {youtubeRef && (
                <div className={cx('item')}>
                    <div className={cx('brand')}>
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                    <Button text className={cx('link')} rel="noreferrer" target="_blank" href={`https://${youtubeRef}`}>
                        {youtubeRef}
                    </Button>
                </div>
            )}
            {twitterRef && (
                <div className={cx('item')}>
                    <div className={cx('brand')}>
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                    <Button text className={cx('link')} rel="noreferrer" target="_blank" href={`https://${twitterRef}`}>
                        {twitterRef}
                    </Button>
                </div>
            )}
            {tiktokRef && (
                <div className={cx('item')}>
                    <div className={cx('brand')}>
                        <FontAwesomeIcon icon={faTiktok} />
                    </div>
                    <Button text className={cx('link')} rel="noreferrer" target="_blank" href={`https://${tiktokRef}`}>
                        {tiktokRef}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ContactList;
