// AI 生成 By Peng.Guo
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';
import { useState } from 'react';

/**
 * Input 组件 Meta 配置
 * 
 * 遵循 Design Story 规范，暴露完整的 argTypes 供设计工具消费
 */
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
      description: '输入框尺寸',
      table: {
        type: { summary: "'small' | 'middle' | 'large'" },
        defaultValue: { summary: 'middle' },
      },
    },
    variant: {
      control: 'select',
      options: ['outlined', 'borderless', 'filled'],
      description: '输入框变体样式',
      table: {
        type: { summary: "'outlined' | 'borderless' | 'filled'" },
        defaultValue: { summary: 'outlined' },
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
    readOnly: {
      control: 'boolean',
      description: '只读状态',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: '占位文本',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: '默认值',
      table: {
        type: { summary: 'string' },
      },
    },
    prefix: {
      control: 'text',
      description: '前缀图标/文本',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    suffix: {
      control: 'text',
      description: '后缀图标/文本',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    addonBefore: {
      control: 'text',
      description: '前置标签',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    addonAfter: {
      control: 'text',
      description: '后置标签',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// =============================================================================
// Design Stories - 设计工具专用
// 特点：静态、无交互、可预期的视觉表现
// =============================================================================

/**
 * 默认输入框 - Design Story
 * 
 * 设计态下的默认输入框样式
 */
export const DesignDefault: Story = {
  tags: ['design'],
  args: {
    placeholder: '请输入内容',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 带默认值的输入框 - Design Story
 */
export const DesignWithValue: Story = {
  tags: ['design'],
  args: {
    defaultValue: '示例文本内容',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 禁用状态输入框 - Design Story
 */
export const DesignDisabled: Story = {
  tags: ['design'],
  args: {
    disabled: true,
    placeholder: '禁用状态',
    defaultValue: '禁用内容',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 只读状态输入框 - Design Story
 */
export const DesignReadOnly: Story = {
  tags: ['design'],
  args: {
    readOnly: true,
    defaultValue: '只读内容',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 小尺寸输入框 - Design Story
 */
export const DesignSmall: Story = {
  tags: ['design'],
  args: {
    size: 'small',
    placeholder: '小尺寸输入框',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 大尺寸输入框 - Design Story
 */
export const DesignLarge: Story = {
  tags: ['design'],
  args: {
    size: 'large',
    placeholder: '大尺寸输入框',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 带边框变体 - Design Story
 */
export const DesignOutlined: Story = {
  tags: ['design'],
  args: {
    variant: 'outlined',
    placeholder: '带边框',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 无边框变体 - Design Story
 */
export const DesignBorderless: Story = {
  tags: ['design'],
  args: {
    variant: 'borderless',
    placeholder: '无边框',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 填充变体 - Design Story
 */
export const DesignFilled: Story = {
  tags: ['design'],
  args: {
    variant: 'filled',
    placeholder: '填充样式',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 带前缀的输入框 - Design Story
 */
export const DesignWithPrefix: Story = {
  tags: ['design'],
  args: {
    prefix: '￥',
    placeholder: '请输入金额',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 带后缀的输入框 - Design Story
 */
export const DesignWithSuffix: Story = {
  tags: ['design'],
  args: {
    suffix: 'RMB',
    placeholder: '请输入金额',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 带前置标签的输入框 - Design Story
 */
export const DesignWithAddonBefore: Story = {
  tags: ['design'],
  args: {
    addonBefore: 'https://',
    placeholder: 'mysite',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 带前后标签的输入框 - Design Story
 */
export const DesignWithAddon: Story = {
  tags: ['design'],
  args: {
    addonBefore: 'https://',
    addonAfter: '.com',
    defaultValue: 'mysite',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

// =============================================================================
// Interaction Stories - 开发测试专用
// 特点：展示组合效果、交互状态、多变体对比
// =============================================================================

/**
 * 不同尺寸对比 - Interaction Story
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Input size="small" placeholder="小尺寸输入框" />
      <Input size="middle" placeholder="中尺寸输入框" />
      <Input size="large" placeholder="大尺寸输入框" />
    </div>
  ),
};

/**
 * 不同变体对比 - Interaction Story
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Input variant="outlined" placeholder="带边框" />
      <Input variant="borderless" placeholder="无边框" />
      <Input variant="filled" placeholder="填充" />
    </div>
  ),
};

/**
 * 受控组件示例 - Interaction Story
 * 
 * 展示输入框的双向绑定效果
 */
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

/**
 * 带前缀后缀组合 - Interaction Story
 */
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

/**
 * 密码输入框 - Interaction Story
 */
export const Password: Story = {
  render: () => (
    <Input.Password
      placeholder="请输入密码"
      style={{ width: 300 }}
    />
  ),
};

/**
 * 搜索框 - Interaction Story
 */
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

/**
 * 文本域 - Interaction Story
 */
export const TextArea: Story = {
  render: () => (
    <Input.TextArea
      rows={4}
      placeholder="请输入多行文本"
      style={{ width: 300 }}
    />
  ),
};

/**
 * 状态对比 - Interaction Story
 */
export const StateVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Input placeholder="正常状态" />
      <Input disabled placeholder="禁用状态" defaultValue="禁用内容" />
      <Input readOnly defaultValue="只读内容" />
    </div>
  ),
};
