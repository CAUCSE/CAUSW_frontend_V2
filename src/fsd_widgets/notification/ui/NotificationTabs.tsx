'use client';

import { Tab, Tabs } from '@mui/material';

import { NotificationActionButtons } from './NotificationActionButtons';

interface Props {
  activeTab: number;
  setActiveTab: (index: number) => void;
  showActionButtons: boolean;
}

export const NotificationTabs = ({ activeTab, setActiveTab, showActionButtons }: Props) => (
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
      justifyContent: 'flex-start',
      padding: '8px 8px 4px 16px',
      borderBottom: '3px solid #bababa',
      marginBottom: '24px',
    }}
  >
    <Tab
      label="알림"
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
      }}
    />
    <Tab
      label="경조사"
      disableRipple
      onClick={() => setActiveTab(1)}
      sx={{
        textTransform: 'none',
        color: '#000',
        '&.Mui-selected': {
          color: '#000',
        },
        fontSize: '20px',
      }}
    />
    {showActionButtons && <NotificationActionButtons />}
  </Tabs>
);
