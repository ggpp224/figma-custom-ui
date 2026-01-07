// AI 生成 By Peng.Guo
import type { Preview } from '@storybook/react';
import 'antd/dist/reset.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
  // 全局标签定义
  tags: ['autodocs'],
};

export default preview;
