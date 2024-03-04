import 'antd/dist/antd.css';

import { ButtonModal } from '@components/index';
import { FeedbacksResponse, selectFeedbacks } from '@redux/feedbacks';
import { handleSortDate } from '@utils/index';
import { Button, Grid, Space } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CommentList, EmptyComponent, FeedbackModal } from './components';
import ModalComponent from './components/Modal';

const { useBreakpoint } = Grid;

const ReviewsPage: React.FC = () => {
    const { feedbacks, statusCode } = selectFeedbacks()
    const [isHidden, setHidden] = useState(true);
    const [listData, setListdata] = useState<FeedbacksResponse[]>([]);
    const [open, setOpen] = useState(false);

    const { xs } = useBreakpoint();

    const list = useMemo(() => {
        const sortFeedbacks = handleSortDate([...feedbacks])
        return isHidden ? sortFeedbacks.slice(0, 4) : sortFeedbacks
    }, [feedbacks, isHidden])


    const onLoadFeedbacks = useCallback(() => {
        setHidden(false);
        setListdata(list);
        window.dispatchEvent(new Event('resize'));
    }, [list]);

    const onHideFeedbacks = useCallback(() => {
        setHidden(true);
        setListdata(list);
    }, [list]);

    useEffect(() => {
        setListdata(list);
    }, [list]);

    const loadMore =
        (
            <Space
                align="start"
                size={[11, 17]}
                style={{
                    display: 'flex',
                    flexDirection: xs ? 'column' : 'row',
                    paddingTop: xs ? '45px' : '90px',
                    width: '100%'
                }}>

                <ButtonModal setOpenFeedModal={(value) => setOpen(value)} dataId={'write-review'} />

                <Button
                    data-test-id='all-reviews-button'
                    type='link'
                    style={{ fontSize: '16px' }} size='large'
                    onClick={isHidden ? onLoadFeedbacks : onHideFeedbacks}
                >
                    {isHidden ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                </Button>
            </Space>

        )

    return (
        <>{listData.length ?
            <CommentList comments={listData} loadButton={loadMore} />
            : <EmptyComponent setOpenFeedModal={(value) => setOpen(value)} />

        }
            <FeedbackModal isOpen={open} setOpenFeedModal={(value) => setOpen(value)} />
            {statusCode && <ModalComponent status={statusCode} setOpenFeedModal={(value) => setOpen(value)} />}
        </>

    );
};

export default ReviewsPage