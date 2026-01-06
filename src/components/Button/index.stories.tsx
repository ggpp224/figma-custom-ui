// AI 生成 By Peng.Guo
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'dashed', 'link', 'text'],
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
    },
    shape: {
      control: 'select',
      options: ['default', 'circle', 'round'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 默认按钮
export const Default: Story = {
  args: {
    children: '默认按钮',
  },
};

// 主要按钮
export const Primary: Story = {
  args: {
    type: 'primary',
    children: '主要按钮',
  },
};

// 虚线按钮
export const Dashed: Story = {
  args: {
    type: 'dashed',
    children: '虚线按钮',
  },
};

// 文本按钮
export const Text: Story = {
  args: {
    type: 'text',
    children: '文本按钮',
  },
};

// 链接按钮
export const Link: Story = {
  args: {
    type: 'link',
    children: '链接按钮',
  },
};

// 不同尺寸
export const Sizes: Story = {
  render: () => (
    <>
      <Button size="small" style={{ marginRight: 8 }}>
        小按钮
      </Button>
      <Button size="middle" style={{ marginRight: 8 }}>
        中按钮
      </Button>
      <Button size="large">大按钮</Button>
    </>
  ),
};

// 不同形状
export const Shapes: Story = {
  render: () => (
    <>
      <Button shape="default" style={{ marginRight: 8 }}>
        默认
      </Button>
      <Button shape="round" style={{ marginRight: 8 }}>
        圆角
      </Button>
      <Button shape="circle">圆</Button>
    </>
  ),
};

// 禁用状态
export const Disabled: Story = {
  render: () => (
    <>
      <Button disabled style={{ marginRight: 8 }}>
        禁用按钮
      </Button>
      <Button type="primary" disabled>
        禁用主要按钮
      </Button>
    </>
  ),
};

// 加载状态
export const Loading: Story = {
  render: () => (
    <>
      <Button loading style={{ marginRight: 8 }}>
        加载中
      </Button>
      <Button type="primary" loading>
        加载中
      </Button>
    </>
  ),
};
