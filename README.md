# Figma Custom UI - 基于 Ant Design 的组件库

这是一个基于 Ant Design 的二次封装组件库，集成了 Storybook 和 Figma Plugin，让您可以在 Figma 中直接使用真实的可运行组件。

## 项目结构

```
figma-custom-ui/
├── src/                    # 组件库源码
│   ├── components/        # 组件目录
│   │   ├── Button/       # Button 组件
│   │   └── Input/        # Input 组件
│   └── index.ts          # 导出入口
├── figma-plugin/          # Figma Plugin
│   ├── manifest.json     # Plugin 配置
│   ├── code.ts          # Plugin 主代码
│   ├── ui.html          # Plugin UI 入口
│   └── ui/              # React UI 组件
├── .storybook/           # Storybook 配置
└── dist/                 # 构建输出

```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发组件库

启动 Storybook 查看组件：

```bash
npm run storybook
```

访问 http://localhost:6006 查看组件文档。

### 3. 构建组件库

```bash
npm run build
```

### 4. 在 Figma 中使用

#### 构建 Figma Plugin

```bash
npm run build:plugin
```

#### 在 Figma Desktop 中加载 Plugin

1. 打开 **Figma Desktop**（必须是 Desktop 版本）
2. 点击菜单：`Plugins` → `Development` → `Import plugin from manifest...`
3. 选择 `figma-plugin/manifest.json` 文件
4. 点击 `Run` 运行插件

#### 使用两种模式

**Storybook 模式（开发推荐）**：
1. 确保 Storybook 正在运行：`npm run storybook`
2. 在 Plugin 中切换到 "Storybook" 模式
3. 在 iframe 中浏览所有组件和 Stories

**组件库模式（生产推荐）**：
1. 在 Plugin 中切换到 "组件库" 模式
2. 直接使用封装好的组件
3. 点击组件按钮会在 Figma 中创建对应的 Frame

### 5. 开发 Plugin（监听模式）

```bash
npm run dev:plugin
```

这会自动监听文件变化并重新构建 Plugin UI。

## 可用脚本

- `npm run storybook` - 启动 Storybook 开发服务器
- `npm run build-storybook` - 构建 Storybook 静态站点
- `npm run build` - 构建组件库
- `npm run build:plugin` - 构建 Figma Plugin
- `npm run dev:plugin` - 开发模式构建 Plugin（监听模式）

## 当前组件

- ✅ **Button** - 按钮组件（支持多种类型和尺寸）
- ✅ **Input** - 输入框组件（支持多种变体和子组件）

## 添加新组件

1. 在 `src/components/` 下创建新组件目录
2. 实现组件并导出
3. 在 `src/index.ts` 中导出
4. 创建对应的 Storybook stories
5. 在 `figma-plugin/ui/index.tsx` 中添加使用示例

## 技术栈

- **React** - UI 框架
- **TypeScript** - 类型安全
- **Ant Design** - 基础组件库
- **Vite** - 构建工具
- **Storybook** - 组件文档和预览
- **Figma Plugin API** - Figma 集成

## 注意事项

1. **Figma Desktop 必需**：Plugin 只能在 Figma Desktop 中运行
2. **Storybook 端口**：默认使用 `localhost:6006`
3. **网络访问**：确保 manifest.json 中配置了正确的网络访问权限

## 故障排除

- **无法加载 Storybook**：确保 Storybook 正在运行 (`npm run storybook`)
- **组件库模式无法加载**：确保已运行 `npm run build:plugin`
- **Figma 中看不到插件**：确保使用的是 Figma Desktop，不是 Web 版本

## 许可证

MIT

