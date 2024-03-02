import 'antd/dist/antd.css';

import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { FeedbacksResponse, selectFeedbacks } from '@redux/feedbacks';
import { Avatar, Button, Card, Comment, Grid, List, Rate, Space, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ModalComponent from './components/modal';
import classes from './index.module.css';

const { Meta } = Card;
const { useBreakpoint } = Grid;

const ReviewsPage: React.FC = () => {
    const { feedbacks, statusCode } = selectFeedbacks()
    const [isHidden, setHidden] = useState(true);
    const [listData, setListdata] = useState<FeedbacksResponse[]>([]);
    const { xs } = useBreakpoint();

    const list = useMemo(() => {
        return feedbacks ? feedbacks.slice(0, 4) : []
    }, [feedbacks])

    useEffect(() => {
        setListdata(list);
    }, [list]);

    const onLoadFeedbacks = useCallback(() => {
        setListdata(feedbacks);
        setHidden(false);
        window.dispatchEvent(new Event('resize'));
    }, [feedbacks]);

    const onHideFeedbacks = useCallback(() => {
        setListdata(list);
        setHidden(true);
        window.dispatchEvent(new Event('resize'));
    }, [list]);

    const loadMore =
        (
            <>
                <Space
                    align="start"
                    size={[11, 17]}
                    style={{
                        display: 'flex',
                        flexDirection: xs ? 'column' : 'row',
                        paddingTop: xs ? '45px' : '90px',
                        width: '100%'
                    }}>
                    <Button data-test-id='write-review'
                        type="primary"
                        size='middle'
                        style={{ height: '40px' }}>
                        Написать отзыв
                    </Button>
                    <Button
                        data-test-id='all-reviews-button'
                        type='link'
                        style={{ fontSize: '16px' }} size='large'
                        onClick={isHidden ? onLoadFeedbacks : onHideFeedbacks}
                    >
                        {isHidden ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                    </Button>
                </Space></>
        )

    const CommentList = ({ comments }: { comments: FeedbacksResponse[] | undefined }) => (
        <List
            className={classes.list}
            dataSource={comments}
            itemLayout="horizontal"
            loadMore={loadMore}
            renderItem={item =>
                <Comment
                    className={classes.comment}
                    author={
                        <Rate disabled
                            defaultValue={item.rating}
                            character={({ value, index }) => {
                                if (value) {
                                    return index! < value
                                        ? <StarFilled />
                                        : <StarOutlined style={{ color: 'var(--ant-rate-color)' }} />
                                }
                            }}
                            className={classes.rate} />}
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
                        <Typography.Text style={{ lineHeight: 1.3, display: 'inline-block', color: '#8C8C8C' }}>{item.message}</Typography.Text>
                    }
                    datetime={item.createdAt}
                />
            }
        />
    );
    return (
        <><CommentList comments={listData} />
            {statusCode && <ModalComponent status={statusCode} />}
        </>

    );
};

export default ReviewsPage