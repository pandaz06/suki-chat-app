import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faPinterest,
    faTiktok,
    faTwitter,
    faYoutube,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';

import styles from './InfoList.module.scss';
import { Button } from '~/components';

const cx = classnames.bind(styles);

const FAKE_CONTACT_DATA = [
    {
        brand: 'facebook',
        logo: <FontAwesomeIcon icon={faFacebook} />,
        link: 'www.facebook.com',
    },
    {
        brand: 'instagram',
        logo: <FontAwesomeIcon icon={faInstagram} />,
        link: 'www.instagram.com',
    },
    {
        brand: 'tiktok',
        logo: <FontAwesomeIcon icon={faTiktok} />,
        link: 'www.tiktok.com',
    },
    {
        brand: 'twitter',
        logo: <FontAwesomeIcon icon={faTwitter} />,
        link: 'www.twitter.com',
    },
    {
        brand: 'pinterest',
        logo: <FontAwesomeIcon icon={faPinterest} />,
        link: 'www.pinterest.com',
    },
    {
        brand: 'youtube',
        logo: <FontAwesomeIcon icon={faYoutube} />,
        link: 'www.youtube.com',
    },
    {
        brand: 'github',
        logo: <FontAwesomeIcon icon={faGithub} />,
        link: 'www.github.com',
    },
];

function ContactList() {
    return (
        <div className={cx('contact-list')}>
            {FAKE_CONTACT_DATA.map((item, index) => (
                <div key={index} className={cx('item')}>
                    <h3 className={cx('brand-logo')}>{item.logo}</h3>
                    <Button text href={item.link} className={cx('link')}>
                        {item.link}
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default ContactList;
