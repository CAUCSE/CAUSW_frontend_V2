declare module 'react-pull-to-refresh' {
  import * as React from 'react';

  export interface PullToRefreshProps {
    onRefresh: () => Promise<any>;
    className?: string;
    style?: React.CSSProperties;
    pullDownThreshold?: number;
    backgroundColor?: string;
    resistance?: number;
    refreshingContent?: React.ReactNode;
    pullingContent?: React.ReactNode;
    children?: React.ReactNode;
  }

  export default class PullToRefresh extends React.Component<PullToRefreshProps> {}
}
