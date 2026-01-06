# Figma Plugin - 组件库查看器

## 功能说明

这是一个 Figma Plugin，用于在 Figma 中查看和使用您的组件库。支持两种模式：

1. **Storybook 模式**：通过 iframe 嵌入本地运行的 Storybook（开发模式）
2. **组件库模式**：直接使用构建好的 React 组件（生产模式）

## 使用方法

### 1. 构建 Plugin

```bash
# 构建所有 Plugin 文件
npm run build:plugin

# 或者分别构建
npm run build:plugin:code  # 构建 Plugin 主代码
npm run build:plugin:ui    # 构建 React UI
```

### 2. 在 Figma 中加载 Plugin

1. 打开 Figma Desktop（注意：必须是 Desktop 版本，Web 版本不支持本地插件）
2. 点击菜单：`Plugins` → `Development` → `Import plugin from manifest...`
3. 选择 `figma-plugin/manifest.json` 文件
4. 点击 `Run` 运行插件

### 3. 使用 Storybook 模式

1. 启动 Storybook：
   ```bash
   npm run storybook
   ```
2. 在 Figma Plugin 中切换到 "Storybook" 模式
3. 在 Storybook 中浏览和测试组件

### 4. 使用组件库模式

1. 确保已构建组件库和 Plugin UI：
   ```bash
   npm run build:plugin
   ```
2. 在 Figma Plugin 中切换到 "组件库" 模式
3. 点击组件按钮，会在 Figma 中创建对应的 Frame

## 开发

### 监听模式

在开发时，可以使用监听模式自动构建：

```bash
npm run dev:plugin
```

这会自动监听文件变化并重新构建 Plugin UI。

### 文件结构

```
figma-plugin/
├── manifest.json      # Plugin 配置文件
├── code.ts           # Plugin 主代码（与 Figma 交互）
├── ui.html           # Plugin UI 入口 HTML
├── ui/
│   └── index.tsx     # React UI 组件
├── vite.config.ts    # UI 构建配置
├── tsconfig.json     # TypeScript 配置
└── dist/             # 构建输出目录
    ├── code.js       # 编译后的主代码
    └── ui/           # 编译后的 UI
```

## 注意事项

1. **Figma Desktop 必需**：Plugin 只能在 Figma Desktop 中运行，Web 版本不支持本地插件
2. **网络访问**：确保 `manifest.json` 中配置了正确的 `networkAccess` 域名
3. **Storybook 端口**：默认使用 `localhost:6006`，如需修改请在 `ui.html` 中更新

## 故障排除

- **无法加载 Storybook**：确保 Storybook 正在运行 (`npm run storybook`)
- **组件库模式无法加载**：确保已运行 `npm run build:plugin`
- **Figma 中看不到插件**：确保使用的是 Figma Desktop，不是 Web 版本

