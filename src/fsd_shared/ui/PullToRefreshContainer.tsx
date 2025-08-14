'use client';

import React from 'react';
import ReactPullToRefresh from 'react-pull-to-refresh';
import { Loader2 } from 'lucide-react';

const RefreshingContent = () => (
  <div className="flex h-20 items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
  </div>
);

interface Props {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
}

export const PullToRefreshContainer = ({ children, onRefresh }: Props) => {
  return (
    <ReactPullToRefresh
      onRefresh={onRefresh}
      refreshingContent={<RefreshingContent />}
      pullingContent={<></>}
    >
      {children}
    </ReactPullToRefresh>
  );
};
