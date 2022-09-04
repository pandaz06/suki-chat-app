import { useContext, useState, useRef, useEffect } from 'react';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { serverTimestamp } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { format } from 'date-fns';
import { v4 } from 'uuid';

import styles from './Chat.module.scss';
import { Avatar, Button, Input, NoData } from '~/components';
import Message from './Message';
import SeenList from './SeenList';
import { addDocument, addPhoto, updateDocument } from '~/services';
import { AuthContext } from '~/contexts/AuthContext';
import { RoomsContext } from '~/contexts/RoomsContext';
import { storage } from '~/firebase/config';

const cx = className.bind(styles);

function ChatZone() {
    const { user } = useContext(AuthContext);
    const { messages, currentRoom, currentID } = useContext(RoomsContext);
    const [typingMessage, setTypingMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [image, setImage] = useState('');

    const chatListRef = useRef();
    const imageInputRef = useRef();

    useEffect(() => {
        chatListRef.current.scroll({
            top: chatListRef.current.scrollHeight,
            behavior: 'smooth',
        });

        setTypingMessage('');
    }, [messages]);

    useEffect(() => {
        if (!image) return;

        imageInputRef.current.value = '';

        const createNewImageMes = async () => {
            const imageName = image.name + v4();
            const imageRef = ref(storage, `images/${imageName}`);

            const url = await addPhoto(imageRef, image);

            // Create a new mes with image url
            const newMessage = {
                imageURL: url,
                imageName,
                sender: user.uid,
                photoURL: user.profile.photoURL,
                displayName: user.profile.displayName,
                roomID: currentID,
                seenList: [],
                createdAt: serverTimestamp(),
            };

            await addDocument('messages', newMessage);

            // Update room's latest message & latest date field
            currentRoom.latestMessage = newMessage;
            currentRoom.latestMessageDate = serverTimestamp();
            await updateDocument('rooms', currentID, currentRoom);
        };

        createNewImageMes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image, currentID, user]);

    const handleScrollChat = (e) => {
        if (e.target.scrollTop === 0) {
            console.log(messages);
        }
    };

    const handleSeen = () => {
        if (Object.keys(currentRoom.latestMessage).length === 0) return;

        const { uid, profile } = user;

        if (
            currentRoom.latestMessage.sender === uid ||
            currentRoom.latestMessage.seenList.find((item) => item.uid === uid)
        )
            return;

        currentRoom.latestMessage.seenList.push({
            uid,
            photoURL: profile.photoURL,
            displayName: profile.displayName,
            status: profile.status,
        });

        updateDocument('rooms', currentID, currentRoom);
    };

    const handleSubmit = async () => {
        if (typingMessage.trim()) {
            setTypingMessage('');
            setIsSending(true);

            // Create a new mes
            const newMessage = {
                text: typingMessage.trim(),
                sender: user.uid,
                photoURL: user.profile.photoURL,
                displayName: user.profile.displayName,
                roomID: currentID,
                seenList: [],
                createdAt: serverTimestamp(),
            };

            await addDocument('messages', newMessage);

            setIsSending(false);

            // Update room's latest message & latest date field
            currentRoom.latestMessage = newMessage;
            currentRoom.latestMessageDate = serverTimestamp();
            await updateDocument('rooms', currentID, currentRoom);
        }
    };

    return (
        <div className={cx('chat-zone')}>
            <div className={cx('chat-list')} ref={chatListRef} onScroll={handleScrollChat}>
                {messages.length > 0 ? (
                    messages.map((mes, index) => {
                        let createdAt;

                        if (mes.createdAt?.seconds) {
                            const isToday =
                                format(new Date(), 'P') === format(new Date(mes.createdAt.seconds * 1000), 'P');
                            createdAt = format(mes.createdAt.seconds * 1000, isToday ? 'p' : 'Pp');
                        }

                        return (
                            <Message
                                key={mes.id}
                                createdAt={createdAt || 'Đang tải...'}
                                right={mes.sender === user.uid}
                                left={mes.sender !== user.uid}
                                sender={mes.displayName}
                                avatar={mes.photoURL}
                                text={mes.text}
                                imageURL={mes.imageURL}
                                isSending={index === messages.length - 1 && isSending}
                                isHideSender={index > 0 && mes.sender === messages[index - 1].sender}
                            />
                        );
                    })
                ) : (
                    <NoData message="Chưa có tin nhắn nào trong phòng này" />
                )}
                {currentRoom.latestMessage.sender === user.uid && !isSending && (
                    <SeenList data={currentRoom.latestMessage.seenList} />
                )}
            </div>
            <Input
                value={typingMessage}
                onChange={(e) => setTypingMessage(e.target.value)}
                onKeyDown={(e) => {
                    const key = e.key || e.code;
                    if (key === 'Enter') {
                        handleSubmit();
                    }
                }}
                isFocusing={currentID}
                onFocus={handleSeen}
                placeholder="Nhắn điều gì đó..."
                leftIcons={[<Avatar small src={user.profile.photoURL} name="Minh Hoang" isLoading={!user} />]}
                rightIcons={[
                    <Button
                        text
                        onlyIcon
                        leftIcon={<FontAwesomeIcon icon={faImage} />}
                        className={cx('choose-file-btn')}
                        onClick={() => {
                            imageInputRef.current.click();
                        }}
                    />,
                    <Button
                        text
                        onlyIcon
                        disabled={typingMessage.length === 0}
                        leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                        onClick={handleSubmit}
                        className={cx('send-btn', {
                            active: typingMessage.trim(),
                        })}
                    />,
                ]}
                className={cx('chat-input')}
                autoComplete="off"
                spellCheck="false"
            />
            <input
                ref={imageInputRef}
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                multiple={false}
                className={cx('image-input')}
                onChange={(e) => setImage(e.target.files[0])}
            />
        </div>
    );
}

export default ChatZone;
