# Design Story 规范文档

<!-- AI 生成 By Peng.Guo -->

## 概述

本文档定义了组件库中 **Design Story** 的编写规范，用于确保设计工具（如 Figma）能够稳定、可预期、视觉正确地消费组件实例。

---

## 核心原则

### 1. 自定义 Figma 插件入口

- ✅ **自定义 Figma Plugin**（`figma-plugin/`）是 Figma ↔ Storybook 的本地集成方式
- ✅ 支持直连本地 Storybook（`localhost:6006`）
- ❌ 官方 Storybook Connect 插件不支持本地连接，不作为主要方案

### 2. 设计态专用 Story

Design Story 的目标只有一个：

> **在设计态中，稳定、可预期、视觉正确地表达一个组件实例**

### 3. 组件 Meta 暴露

组件库必须对设计工具暴露完整的 `Meta` 配置，包括：
- 完整的 `argTypes` 定义
- 清晰的 `title` 层级
- 适当的 `tags` 标记

---

## Design Story vs Interaction Story

| 特性 | Design Story | Interaction Story |
|------|--------------|-------------------|
| **目标** | 设计工具消费 | 开发测试 |
| **状态** | 完全静态 | 可包含动态状态 |
| **交互** | 禁用 | 允许 |
| **布局** | 固定尺寸 | 灵活 |
| **命名** | `Design*` 前缀 | 功能描述性命名 |
| **标签** | `tags: ['design']` | 无特殊标签 |

---

## 命名约定

### Design Story 命名

使用 `Design` 前缀，后接状态或变体名称：

```typescript
// ✅ 正确
export const DesignDefault: Story = { ... };
export const DesignPrimary: Story = { ... };
export const DesignDisabled: Story = { ... };

// ❌ 错误
export const Default: Story = { ... };  // 缺少 Design 前缀
export const ButtonPrimary: Story = { ... };  // 不符合约定
```

### Interaction Story 命名

使用功能描述性命名：

```typescript
// ✅ 正确
export const Sizes: Story = { ... };
export const Loading: Story = { ... };
export const Controlled: Story = { ... };
```

---

## 编写原则

### 1. 无动态状态

Design Story 禁止使用任何 React 状态管理：

```typescript
// ❌ 禁止
export const DesignControlled: Story = {
  render: () => {
    const [value, setValue] = useState('');  // 禁止
    return <Input value={value} onChange={e => setValue(e.target.value)} />;
  }
};

// ✅ 正确
export const DesignDefault: Story = {
  args: {
    defaultValue: '示例文本',
    placeholder: '请输入'
  }
};
```

### 2. 固定尺寸和布局

Design Story 应有可预期的尺寸：

```typescript
// ✅ 正确
export const DesignDefault: Story = {
  args: { children: '按钮' },
  decorators: [
    (Story) => (
      <div style={{ width: 120 }}>
        <Story />
      </div>
    )
  ]
};
```

### 3. 静态 Props

避免展示回调函数的效果：

```typescript
// ❌ 避免
export const DesignWithClick: Story = {
  args: {
    onClick: () => alert('clicked')  // 设计态不需要
  }
};

// ✅ 正确
export const DesignDefault: Story = {
  args: {
    children: '按钮'
    // 不提供 onClick
  }
};
```

### 4. 使用 `tags` 标记

所有 Design Story 必须包含 `design` 标签：

```typescript
export const DesignDefault: Story = {
  tags: ['design'],
  args: { ... }
};
```

---

## Meta 配置规范

每个组件的 Stories 文件必须导出完整的 Meta 配置：

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  // 必需：清晰的层级路径
  title: 'Components/Button',
  
  // 必需：关联的组件
  component: Button,
  
  // 必需：完整的 argTypes 定义
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'dashed', 'link', 'text'],
      description: '按钮类型',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
      description: '按钮尺寸'
    },
    disabled: {
      control: 'boolean',
      description: '禁用状态'
    }
  },
  
  // 推荐：布局配置
  parameters: {
    layout: 'centered',
  },
  
  // 推荐：自动生成文档
  tags: ['autodocs'],
};

export default meta;
```

---

## 与 Figma 集成（自定义插件）

### 使用方式

1. **启动 Storybook**：
   ```bash
   npm run storybook
   ```

2. **构建并加载 Figma 插件**：
   ```bash
   npm run build:plugin
   ```
   然后在 Figma Desktop 中加载 `figma-plugin/manifest.json`

3. **在 Figma 中使用**：
   - 运行插件后选择 "Storybook" 模式
   - 通过 iframe 嵌入本地 Storybook（`localhost:6006`）
   - 浏览并选择 Design Story 进行设计预览

### 自定义插件优势

| 特性 | 自定义插件 | 官方 Storybook Connect |
|------|-----------|----------------------|
| 本地 Storybook 支持 | ✅ 支持 | ❌ 不支持 |
| 无需部署 | ✅ 本地直连 | ❌ 需要公网 URL |
| 开发迭代 | ✅ 实时预览 | ❌ 需重新部署 |
| 自定义功能 | ✅ 可扩展 | ❌ 固定功能 |

---

## 检查清单

在提交 Design Story 前，请确认：

- [ ] 使用 `Design` 前缀命名
- [ ] 包含 `tags: ['design']`
- [ ] 无 `useState`、`useEffect` 等动态 Hook
- [ ] Props 为静态值
- [ ] 组件 Meta 包含完整的 `argTypes`
- [ ] 视觉表现稳定、可预期

---

## 参考资料

- [Storybook CSF 3.0](https://storybook.js.org/docs/react/api/csf)
- [自定义 Figma 插件文档](./figma-plugin/README.md)
