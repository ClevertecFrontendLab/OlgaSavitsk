import React from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Grid, Layout, Space } from 'antd';

import { AndroidFilled, AppleFilled } from '@ant-design/icons';

const { Footer } = Layout;
const { useBreakpoint } = Grid;
const { Meta } = Card;

const FooterComponent: React.FC = () => {
  const { md, xs } = useBreakpoint();

  return (
    <>
      <Footer style={{ background: 'none', padding: xs ? '10px 16px 42px' : '24px 24px 42px' }}>
        <Space
          align={xs ? 'center' : 'end'}
          style={{
            display: 'flex',
            justifyContent: md ? 'space-between' : !md ? 'center' : 'center',
            flexDirection: md ? 'row' : !md ? 'column-reverse' : 'row',
            gap: xs ? '18px' : '8px'
          }}>

          <Button type='link' href='#' style={{ fontSize: '16px', letterSpacing: '0.9px' }} size='large'>
            Смотреть отзывы
          </Button>

          <Card
            hoverable
            bodyStyle={{ padding: '11px 24px', textAlign: xs ? 'center' : 'left' }}
            actions={
              [<><Button type='link' icon={<AndroidFilled />} href="#" style={{ color: 'var(--ant-button-download)' }}>
                Android OS
              </Button><Button type='link' icon={<AppleFilled />} href="#" style={{ color: 'var(--ant-button-download)' }}>
                  Apple iOS
                </Button></>]
            }
            style={{ width: '100%' }}
          >
            <Meta
              title={<Button type='link' href='#' style={{ fontSize: '16px' }}>
                Скачать на телефон
              </Button>}
              description="Доступно в PRO-тарифе"
              style={{ letterSpacing: '0.5px' }}
            />
          </Card>
        </Space>
      </Footer>
    </>
  );
};

export default FooterComponent