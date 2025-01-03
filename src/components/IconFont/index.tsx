import clsx from 'clsx';
import React from 'react';

export type IconFontProps = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
};

export const IconFont: React.FC<IconFontProps> = (props) => {
  const { name, style, className } = props;
  return <i className={clsx('iconfont', name, className)} style={style}></i>;
};
