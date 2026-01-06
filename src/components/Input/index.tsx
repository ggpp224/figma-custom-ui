// AI 生成 By Peng.Guo
import React from 'react';
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';

export interface InputProps extends AntdInputProps {
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
 * Input 组件
 * 基于 Ant Design Input 的二次封装
 */
const InputComponent: React.FC<InputProps> = (props) => {
  const { className, style, ...restProps } = props;

  return (
    <AntdInput
      className={className}
      style={style}
      {...restProps}
    />
  );
};

InputComponent.displayName = 'Input';

// 创建包含子组件的 Input 组件类型
export const Input = Object.assign(InputComponent, {
  Password: AntdInput.Password,
  Search: AntdInput.Search,
  TextArea: AntdInput.TextArea,
  Group: AntdInput.Group,
}) as typeof InputComponent & {
  Password: typeof AntdInput.Password;
  Search: typeof AntdInput.Search;
  TextArea: typeof AntdInput.TextArea;
  Group: typeof AntdInput.Group;
};

export default Input;
