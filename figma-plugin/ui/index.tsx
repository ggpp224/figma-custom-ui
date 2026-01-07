// AI 生成 By Peng.Guo
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
// 使用 alias 导入组件（仅用于预览）
import { Button, Input } from '@/index';

(window as any).__componentLibraryReady = false;

// 组件配置类型
interface ButtonConfig {
  name: string;
  type: 'default' | 'primary' | 'dashed' | 'text' | 'link';
  size: 'small' | 'middle' | 'large';
  disabled?: boolean;
  loading?: boolean;
  text: string;
  hasIcon?: boolean;
  preview: React.ReactNode;
}

interface InputConfig {
  name: string;
  size: 'small' | 'middle' | 'large';
  disabled?: boolean;
  placeholder: string;
  value?: string;
  prefix?: string;
  suffix?: string;
  preview: React.ReactNode;
}

function ComponentLibraryUI() {
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  // 创建 Button 组件
  const createButton = (config: ButtonConfig) => {
    if (isCreating) return;
    setIsCreating(true);
    setSelectedComponent(config.name);

    parent.postMessage({
      pluginMessage: {
        type: 'create-button',
        buttonType: config.type,
        size: config.size,
        disabled: config.disabled,
        loading: config.loading,
        text: config.text,
        hasIcon: config.hasIcon,
      },
    }, '*');

    setTimeout(() => setIsCreating(false), 300);
  };

  // 创建 Input 组件
  const createInput = (config: InputConfig) => {
    if (isCreating) return;
    setIsCreating(true);
    setSelectedComponent(config.name);

    parent.postMessage({
      pluginMessage: {
        type: 'create-input',
        size: config.size,
        disabled: config.disabled,
        placeholder: config.placeholder,
        value: config.value,
        prefix: config.prefix,
        suffix: config.suffix,
      },
    }, '*');

    setTimeout(() => setIsCreating(false), 300);
  };

  // Button 组件列表
  const buttonConfigs: ButtonConfig[] = [
    {
      name: 'Button - Default',
      type: 'default',
      size: 'middle',
      text: '默认按钮',
      preview: <Button>默认按钮</Button>,
    },
    {
      name: 'Button - Primary',
      type: 'primary',
      size: 'middle',
      text: '主要按钮',
      preview: <Button type="primary">主要按钮</Button>,
    },
    {
      name: 'Button - Dashed',
      type: 'dashed',
      size: 'middle',
      text: '虚线按钮',
      preview: <Button type="dashed">虚线按钮</Button>,
    },
    {
      name: 'Button - Text',
      type: 'text',
      size: 'middle',
      text: '文本按钮',
      preview: <Button type="text">文本按钮</Button>,
    },
    {
      name: 'Button - Link',
      type: 'link',
      size: 'middle',
      text: '链接按钮',
      preview: <Button type="link">链接按钮</Button>,
    },
    {
      name: 'Button - Small',
      type: 'primary',
      size: 'small',
      text: '小按钮',
      preview: <Button type="primary" size="small">小按钮</Button>,
    },
    {
      name: 'Button - Large',
      type: 'primary',
      size: 'large',
      text: '大按钮',
      preview: <Button type="primary" size="large">大按钮</Button>,
    },
    {
      name: 'Button - Disabled',
      type: 'primary',
      size: 'middle',
      disabled: true,
      text: '禁用按钮',
      preview: <Button type="primary" disabled>禁用按钮</Button>,
    },
    {
      name: 'Button - Loading',
      type: 'primary',
      size: 'middle',
      loading: true,
      text: '加载中',
      preview: <Button type="primary" loading>加载中</Button>,
    },
    {
      name: 'Button - With Icon',
      type: 'primary',
      size: 'middle',
      text: '带图标',
      hasIcon: true,
      preview: (
        <Button type="primary" icon={<span style={{ marginRight: 4 }}>🎨</span>}>
          带图标
        </Button>
      ),
    },
  ];

  // Input 组件列表
  const inputConfigs: InputConfig[] = [
    {
      name: 'Input - Default',
      size: 'middle',
      placeholder: '请输入内容',
      preview: <Input placeholder="请输入内容" style={{ width: 200 }} />,
    },
    {
      name: 'Input - Small',
      size: 'small',
      placeholder: '小尺寸',
      preview: <Input size="small" placeholder="小尺寸" style={{ width: 200 }} />,
    },
    {
      name: 'Input - Large',
      size: 'large',
      placeholder: '大尺寸',
      preview: <Input size="large" placeholder="大尺寸" style={{ width: 200 }} />,
    },
    {
      name: 'Input - Disabled',
      size: 'middle',
      disabled: true,
      placeholder: '禁用状态',
      value: '禁用内容',
      preview: <Input disabled placeholder="禁用状态" defaultValue="禁用内容" style={{ width: 200 }} />,
    },
    {
      name: 'Input - With Prefix',
      size: 'middle',
      placeholder: '金额',
      prefix: '￥',
      preview: <Input prefix="￥" placeholder="金额" style={{ width: 200 }} />,
    },
    {
      name: 'Input - With Suffix',
      size: 'middle',
      placeholder: '请输入',
      suffix: 'RMB',
      preview: <Input suffix="RMB" placeholder="请输入" style={{ width: 200 }} />,
    },
  ];

  return (
    <div style={{ 
      padding: '24px', 
      height: '100vh', 
      overflow: 'auto',
      background: '#fafafa'
    }}>
      <h1 style={{ 
        fontSize: '20px', 
        fontWeight: 600, 
        marginBottom: '8px',
        color: '#333'
      }}>
        组件库
      </h1>
      
      <p style={{ 
        fontSize: '12px', 
        color: '#666', 
        marginBottom: '24px' 
      }}>
        点击组件创建可编辑的 Figma Component（带属性面板）
      </p>

      {/* Button 组件区域 */}
      <div style={{ 
        marginBottom: '32px',
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          marginBottom: '16px',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ 
            background: '#1677ff', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            Component
          </span>
          Button 按钮
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          gap: '12px' 
        }}>
          {buttonConfigs.map((config) => (
            <div 
              key={config.name}
              onClick={() => createButton(config)}
              style={{
                cursor: isCreating ? 'wait' : 'pointer',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #e8e8e8',
                transition: 'all 0.2s',
                background: selectedComponent === config.name ? '#e6f7ff' : 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                minWidth: '100px',
              }}
              onMouseEnter={(e) => {
                if (!isCreating) {
                  e.currentTarget.style.borderColor = '#1677ff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(22,119,255,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e8e8e8';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>{config.preview}</div>
              <p style={{ 
                fontSize: '10px', 
                color: '#1677ff', 
                margin: 0, 
                fontWeight: 500 
              }}>
                + 插入组件
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Input 组件区域 */}
      <div style={{ 
        marginBottom: '32px',
        padding: '20px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          marginBottom: '16px',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ 
            background: '#1677ff', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            Component
          </span>
          Input 输入框
        </h2>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '12px' 
        }}>
          {inputConfigs.map((config) => (
            <div 
              key={config.name}
              onClick={() => createInput(config)}
              style={{
                cursor: isCreating ? 'wait' : 'pointer',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid #e8e8e8',
                transition: 'all 0.2s',
                background: selectedComponent === config.name ? '#e6f7ff' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                if (!isCreating) {
                  e.currentTarget.style.borderColor = '#1677ff';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(22,119,255,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e8e8e8';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>{config.preview}</div>
              <span style={{ 
                fontSize: '10px', 
                color: '#1677ff', 
                marginLeft: '16px',
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}>
                + 插入组件
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 更新按钮 */}
      <div style={{ 
        marginBottom: '16px',
        padding: '12px 16px',
        background: '#fff7e6',
        borderRadius: '8px',
        border: '1px solid #ffd591'
      }}>
        <button
          onClick={() => {
            parent.postMessage({
              pluginMessage: {
                type: 'update-button',
              },
            }, '*');
          }}
          style={{
            width: '100%',
            padding: '8px 16px',
            background: '#1677ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#4096ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1677ff';
          }}
        >
          🔄 更新选中的 Button 样式
        </button>
        <p style={{ fontSize: '11px', color: '#666', marginTop: '8px', marginBottom: 0, lineHeight: '1.5' }}>
          修改属性后，选中 Button 组件，点击此按钮更新样式
        </p>
      </div>

      {/* 状态显示 */}
      {selectedComponent && (
        <div style={{ 
          padding: '12px 16px', 
          background: '#f6ffed', 
          borderRadius: '8px',
          border: '1px solid #b7eb8f',
          marginBottom: '16px'
        }}>
          <p style={{ fontSize: '13px', color: '#52c41a', margin: 0 }}>
            ✓ 已创建: <strong>{selectedComponent}</strong>
          </p>
          <p style={{ fontSize: '11px', color: '#666', marginTop: '4px', marginBottom: 0 }}>
            在 Figma 右侧面板可编辑组件属性，修改后会自动更新样式
          </p>
        </div>
      )}

      {/* 说明 */}
      <div style={{ 
        padding: '16px', 
        background: '#e6f7ff',
        borderRadius: '8px',
        border: '1px solid #91d5ff'
      }}>
        <p style={{ fontSize: '13px', color: '#1677ff', margin: 0, fontWeight: 500 }}>
          ✨ 真正的 Figma 组件（带变体属性）
        </p>
        <ul style={{ 
          fontSize: '12px', 
          color: '#666', 
          margin: '8px 0 0 0',
          paddingLeft: '20px',
          lineHeight: '1.8'
        }}>
          <li>创建的是 <strong>Component</strong>，不是图片</li>
          <li>右侧属性面板可编辑：</li>
          <ul style={{ marginLeft: '16px', marginTop: '4px' }}>
            <li><strong>Label</strong> - 按钮文字（实时更新）</li>
            <li><strong>Type</strong> - 类型（default/primary/dashed/text/link）</li>
            <li><strong>Size</strong> - 尺寸（small/middle/large）</li>
            <li><strong>Disabled</strong> - 禁用状态</li>
            <li><strong>Loading</strong> - 加载状态</li>
          </ul>
          <li>支持 <strong>Auto Layout</strong>，内容自适应</li>
          <li>可转换为 <strong>Instance</strong> 复用</li>
        </ul>
      </div>
    </div>
  );
}

// 渲染 React 应用
(window as any).initComponentLibraryUI = function() {
  const tryInit = () => {
    const container = document.getElementById('react-root');
    if (container && !container.querySelector('*')) {
      if (!document.querySelector('link[href*="antd"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/antd@5.12.8/dist/reset.css';
        document.head.appendChild(link);
      }
      
      try {
        const root = createRoot(container);
        root.render(React.createElement(ComponentLibraryUI));
        (window as any).__componentLibraryReady = true;
        console.log('React UI 初始化成功');
        return true;
      } catch (error) {
        console.error('React UI 初始化失败:', error);
        return false;
      }
    } else if (!container) {
      setTimeout(tryInit, 100);
      return false;
    }
    return true;
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
    return true;
  } else {
    return tryInit();
  }
};
