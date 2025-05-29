'use client';

import { Tab, Tabs } from '@mui/material';

interface TabItem {
  label: string;
  key: string;
}

interface CommonTabsProps {
  tabItems: TabItem[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const CommonTabs = ({ tabItems, activeTab, setActiveTab }: CommonTabsProps) => {
  return (
    <Tabs
      value={activeTab}
      onChange={(_, newValue) => setActiveTab(newValue)}
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
      {tabItems.map((item, index) => (
        <Tab
          key={item.key}
          label={<span style={{ fontSize: '16px', fontWeight: 500 }}>{item.label}</span>}
          disableRipple
          sx={{
            textTransform: 'none',
            color: '#000',
            '&.Mui-selected': {
              color: '#000',
            },
            fontSize: '16px',
          }}
        />
      ))}
    </Tabs>
  );
};
