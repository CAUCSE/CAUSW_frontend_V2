'use client';

import { Badge, Box, Tab, Tabs } from '@mui/material';

import { MESSAGES } from '@/fsd_shared';

import { NotificationActionButtons } from './NotificationActionButtons';

interface Props {
  activeTab: number;
  setActiveTab: (index: number) => void;
  hasUnread: {
    alarm: boolean;
    ceremony: boolean;
  };
}

export const NotificationTabs = ({ activeTab, setActiveTab, hasUnread }: Props) => (
  <Box
    sx={{
      width: '100%',
      borderBottom: '3px solid #bababa',
      mb: '24px',
      px: {
        xs: 4,
        md: 2,
      },
      pt: '8px',
      pb: '4px',
    }}
  >
    <Tabs
      value={activeTab}
      TabIndicatorProps={{
        style: {
          height: '5px',
          backgroundColor: '#6bbeec',
          borderRadius: '20px',
        },
      }}
      sx={{
        display: 'flex',
        width: '100%',

        px: 4,
        justifyContent: {
          xs: 'center',
          md: 'flex-end',
        },
        padding: {
          xs: '8px 0 4px 0',
          md: '8px 8px 4px 16px ',
        },
      }}
    >
      <Tab
        label={
          <div style={{ display: 'flex', gap: 4 }}>
            {hasUnread.alarm && (
              <span
                style={{
                  display: 'flex',
                  marginTop: '4px',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: 'red',
                }}
              />
            )}
            <span style={{ fontSize: '20px', fontWeight: 500 }}>{MESSAGES.NOTIFICATION.GENERAL}</span>
          </div>
        }
        disableRipple
        onClick={() => setActiveTab(0)}
        sx={{
          textTransform: 'none',
          color: '#000',
          '&.Mui-selected': {
            color: '#000',
          },
          fontSize: '20px',
          fontWeight: '500',
          minWidth: {
            xs: '50%',
            md: '120px',
          },
        }}
      />

      <Tab
        label={
          <div style={{ display: 'flex', gap: 4 }}>
            {hasUnread.ceremony && (
              <span
                style={{
                  display: 'flex',
                  marginTop: '4px',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: 'red',
                }}
              />
            )}
            <span style={{ fontSize: '20px', fontWeight: 500 }}>{MESSAGES.NOTIFICATION.CEREMONY}</span>
          </div>
        }
        disableRipple
        onClick={() => setActiveTab(1)}
        sx={{
          textTransform: 'none',
          color: '#000',
          '&.Mui-selected': {
            color: '#000',
          },
          fontSize: '20px',
          minWidth: {
            xs: '50%',
            md: '120px',
          },
        }}
      />

      {activeTab === 1 && <NotificationActionButtons />}
    </Tabs>
  </Box>
);
