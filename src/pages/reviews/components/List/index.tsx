import 'antd/dist/antd.css';

import { UserOutlined } from '@ant-design/icons';
import { RateComponent } from '@components/index';
import { FeedbacksResponse } from '@redux/feedbacks';
import { handleFormate } from '@utils/index';
import { Avatar, Card, Comment, List, Typography } from 'antd';

import classes from './index.module.css';

type ListProps = {
    comments: FeedbacksResponse[] | undefined
    loadButton: React.ReactNode
}

const { Meta } = Card;

const CommentList: React.FC<ListProps> = ({ comments, loadButton }: ListProps) => {

    return (
        <List
            className={classes.list}
            dataSource={comments}
            itemLayout="horizontal"
            loadMore={loadButton}
            renderItem={(item) =>
                <Comment
                    className={classes.comment}
                    author={
                        <RateComponent disabled={true} defaultValue={item.rating} />
                    }
                    avatar={
                        <Meta
                            className={classes.avatar}
                            avatar={item.imageSrc ?
                                <Avatar size={42} src={item.imageSrc} /> :
                                <Avatar size={42} icon={<UserOutlined />} style={{ backgroundColor: '#F5F5F5' }} />}
                            title={item.fullName ?? 'Пользователь'}
                        />
                    }
                    content={
                        <Typography.Text
                            style={{ lineHeight: 1.3, display: 'inline-block', color: '#8C8C8C' }}>
                            {item.message}
                        </Typography.Text>
                    }
                    datetime={<Typography.Text
                        style={{ display: 'flex', color: 'var(--ant-text-secondary)', fontSize: '12px', lineHeight: '12px' }}>
                        {handleFormate(item.createdAt)}
                    </Typography.Text>}
                />
            }
        />
    );
};

export default CommentList