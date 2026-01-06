// AI 生成 By Peng.Guo
import React from 'react';
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';

export interface ButtonProps extends AntdButtonProps {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * Button 组件
 * 基于 Ant Design Button 的二次封装
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const { className, style, ...restProps } = props;

  return (
    <AntdButton
      className={className}
      style={style}
      {...restProps}
    />
  );
};

Button.displayName = 'Button';

export default Button;
