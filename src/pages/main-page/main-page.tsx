import 'antd/dist/antd.css';

import { CONTENT, SiderItems } from '@constants/index';
import { ModalComponent } from '@pages/reviews/components';
import { selectError } from '@redux/error';
import { trainingActions } from '@redux/training';
import { Button, Card, Grid, List, Space } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import classes from './index.module.css';

const { useBreakpoint } = Grid;

export const MainPage: React.FC = () => {
  const { statusCode } = selectError()
  const dispatch = useDispatch()
  const { lg, md, xs } = useBreakpoint();

  const handleRequest = useCallback(async () => {
    dispatch(trainingActions.getTraining())
  }, [dispatch])

  return (
    <Space direction="vertical" size="middle"
      className={classes.main_content}
      style={{ maxWidth: lg ? '752px' : 'auto' }}>
      <Space direction="vertical" size="large">

        <Card bordered={false} bodyStyle={{ paddingRight: md ? '61px' : '32px' }}>
          {CONTENT.MAIN}
        </Card>

        <Card bordered={false} bodyStyle={{ paddingRight: lg ? '61px' : '32px' }}>
          {CONTENT.SUBMAIN}
        </Card>

      </Space>
      <List
        grid={{ gutter: xs ? 6 : 16, column: 3, sm: 1, xs: 1 }}
        dataSource={SiderItems}
        renderItem={item => (
          <List.Item key={item.title}>
            <Card
              hoverable
              title={item.title}
              headStyle={{
                textAlign: (lg || xs) ? 'center' : 'left',
                fontSize: '17px',
                fontWeight: 400,
                whiteSpace: 'nowrap'
              }}
              bodyStyle={{ padding: '10px 24px 13px', textAlign: 'center' }}>
              <Button
                data-test-id={item.dataId}
                type='link'
                icon={item.icon}
                onClick={handleRequest}
                style={{ fontSize: '15px' }}>
                {item.action}
              </Button>
            </Card>
          </List.Item>
        )}
      />
      {statusCode && <ModalComponent status={statusCode} />}
    </Space>
  );
};