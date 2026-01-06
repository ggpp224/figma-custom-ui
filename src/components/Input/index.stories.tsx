// AI 生成 By Peng.Guo
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'borderless', 'filled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// 默认输入框
export const Default: Story = {
  args: {
    placeholder: '请输入内容',
  },
};

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input size="small" placeholder="小尺寸输入框" />
      <Input size="middle" placeholder="中尺寸输入框" />
      <Input size="large" placeholder="大尺寸输入框" />
    </div>
  ),
};

// 不同变体
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input variant="outlined" placeholder="带边框" />
      <Input variant="borderless" placeholder="无边框" />
      <Input variant="filled" placeholder="填充" />
    </div>
  ),
};

// 禁用状态
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '禁用状态',
    defaultValue: '禁用内容',
  },
};

// 只读状态
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: '只读内容',
  },
};

// 带前缀后缀
export const WithAddon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Input
        addonBefore="https://"
        addonAfter=".com"
        defaultValue="mysite"
      />
      <Input
        prefix="￥"
        suffix="RMB"
        defaultValue="100"
      />
    </div>
  ),
};

// 受控组件
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="受控输入框"
        />
        <div>当前值: {value || '(空)'}</div>
      </div>
    );
  },
};

// 密码输入框
export const Password: Story = {
  render: () => (
    <Input.Password
      placeholder="请输入密码"
      style={{ width: 300 }}
    />
  ),
};

// 搜索框
export const Search: Story = {
  render: () => (
    <Input.Search
      placeholder="请输入搜索内容"
      enterButton="搜索"
      style={{ width: 300 }}
      onSearch={(value) => console.log('搜索:', value)}
    />
  ),
};

// 文本域
export const TextArea: Story = {
  render: () => (
    <Input.TextArea
      rows={4}
      placeholder="请输入多行文本"
      style={{ width: 300 }}
    />
  ),
};
