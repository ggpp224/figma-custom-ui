// AI 生成 By Peng.Guo
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

/**
 * Button 组件 Meta 配置
 * 
 * 遵循 Design Story 规范，暴露完整的 argTypes 供设计工具消费
 */
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
      description: '按钮类型',
      table: {
        type: { summary: "'default' | 'primary' | 'dashed' | 'link' | 'text'" },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: '按钮尺寸',
      table: {
        type: { summary: "'small' | 'middle' | 'large'" },
        defaultValue: { summary: 'middle' },
      },
    },
    shape: {
      control: 'select',
      options: ['default', 'circle', 'round'],
      description: '按钮形状',
      table: {
        type: { summary: "'default' | 'circle' | 'round'" },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '禁用状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: '加载状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: '按钮文本内容',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// =============================================================================
// Design Stories - 设计工具专用
// 特点：静态、无交互、可预期的视觉表现
// =============================================================================

/**
 * 默认按钮 - Design Story
 * 
 * 设计态下的默认按钮样式
 */
export const DesignDefault: Story = {
  tags: ['design'],
  args: {
    children: '默认按钮',
  },
};

/**
 * 主要按钮 - Design Story
 */
export const DesignPrimary: Story = {
  tags: ['design'],
  args: {
    type: 'primary',
    children: '主要按钮',
  },
};

/**
 * 虚线按钮 - Design Story
 */
export const DesignDashed: Story = {
  tags: ['design'],
  args: {
    type: 'dashed',
    children: '虚线按钮',
  },
};

/**
 * 文本按钮 - Design Story
 */
export const DesignText: Story = {
  tags: ['design'],
  args: {
    type: 'text',
    children: '文本按钮',
  },
};

/**
 * 链接按钮 - Design Story
 */
export const DesignLink: Story = {
  tags: ['design'],
  args: {
    type: 'link',
    children: '链接按钮',
  },
};

/**
 * 禁用按钮 - Design Story
 */
export const DesignDisabled: Story = {
  tags: ['design'],
  args: {
    disabled: true,
    children: '禁用按钮',
  },
};

/**
 * 禁用主要按钮 - Design Story
 */
export const DesignPrimaryDisabled: Story = {
  tags: ['design'],
  args: {
    type: 'primary',
    disabled: true,
    children: '禁用主要按钮',
  },
};

/**
 * 小尺寸按钮 - Design Story
 */
export const DesignSmall: Story = {
  tags: ['design'],
  args: {
    size: 'small',
    children: '小按钮',
  },
};

/**
 * 大尺寸按钮 - Design Story
 */
export const DesignLarge: Story = {
  tags: ['design'],
  args: {
    size: 'large',
    children: '大按钮',
  },
};

/**
 * 圆角按钮 - Design Story
 */
export const DesignRound: Story = {
  tags: ['design'],
  args: {
    shape: 'round',
    children: '圆角按钮',
  },
};

/**
 * 圆形按钮 - Design Story
 */
export const DesignCircle: Story = {
  tags: ['design'],
  args: {
    shape: 'circle',
    children: '圆',
  },
};

/**
 * 加载中按钮 - Design Story
 */
export const DesignLoading: Story = {
  tags: ['design'],
  args: {
    loading: true,
    children: '加载中',
  },
};

// =============================================================================
// Interaction Stories - 开发测试专用
// 特点：展示组合效果、交互状态、多变体对比
// =============================================================================

/**
 * 不同尺寸对比 - Interaction Story
 * 
 * 展示所有尺寸变体的对比效果
 */
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

/**
 * 不同形状对比 - Interaction Story
 */
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

/**
 * 禁用状态对比 - Interaction Story
 */
export const DisabledVariants: Story = {
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

/**
 * 加载状态对比 - Interaction Story
 */
export const LoadingVariants: Story = {
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

/**
 * 所有类型对比 - Interaction Story
 */
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button type="default">Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
    </div>
  ),
};
