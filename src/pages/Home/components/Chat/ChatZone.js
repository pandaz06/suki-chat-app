import { useState } from 'react';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import styles from './Chat.module.scss';
import { Avatar, Button, Input } from '~/components';
import Message from './Message';
import avatar from '~/assets/images/avatars/default-avatar.jpg';

const cx = className.bind(styles);

function ChatZone() {
    const [typingMessage, setTypingMessage] = useState('');
    return (
        <div className={cx('chat-zone')}>
            <div className={cx('chat-list')}>
                <Message
                    createdAt="23:08"
                    left
                    sender="Minh Hoang"
                    content="Bruh, Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh, Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh"
                />
                <Message createdAt="23:08" right sender="Minh Hoang" content="Dark" />
                <Message createdAt="23:08" left sender="Minh Hoang" content="Lmao" />
                <Message createdAt="23:08" right sender="Minh Hoang" content="Những lời đàm tiếu qua loa linh tinh" />
                <Message createdAt="23:08" right sender="Minh Hoang" content="Không thể nào cản bước được Ma Gaming" />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
                <Message
                    createdAt="23:08"
                    right
                    sender="Minh Hoang"
                    content="Cùng ý chí sinh tồn đến say Booyah đi bên đồng đội 2 3 xông pha"
                />
            </div>
            <Input
                value={typingMessage}
                onChange={(e) => setTypingMessage(e.target.value)}
                placeholder="Type something..."
                leftIcons={[<Avatar small src={avatar} name="Minh Hoang" />]}
                rightIcons={[
                    <Button
                        text
                        onlyIcon
                        disabled={typingMessage.length === 0}
                        leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                        className={cx('send-btn', {
                            active: typingMessage.length > 0,
                        })}
                    />,
                ]}
                className={cx('chat-input')}
            />
        </div>
    );
}

export default ChatZone;
