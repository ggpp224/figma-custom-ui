// AI 生成 By Peng.Guo
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
// 使用 alias 导入组件
import { Button, Input } from '@/index';

(window as any).__componentLibraryReady = false;

function ComponentLibraryUI() {
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [inputValue, setInputValue] = useState('');

  const handleComponentClick = (componentName: string, props?: any) => {
    setSelectedComponent(componentName);
    
    // 通知 Figma Plugin
    parent.postMessage({
      pluginMessage: {
        type: 'create-frame',
        componentName,
        width: props?.width || 200,
        height: props?.height || 100,
        color: props?.color || { r: 0.2, g: 0.5, b: 1 }, // 默认蓝色
      },
    }, '*');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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
        marginBottom: '24px',
        color: '#333'
      }}>
        组件库
      </h1>

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
          color: '#333'
        }}>
          Button 组件
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px' 
        }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              默认按钮
            </p>
            <Button 
              onClick={() => handleComponentClick('Button - Default')}
            >
              默认按钮
            </Button>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              主要按钮
            </p>
            <Button 
              type="primary"
              onClick={() => handleComponentClick('Button - Primary')}
            >
              主要按钮
            </Button>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              虚线按钮
            </p>
            <Button 
              type="dashed"
              onClick={() => handleComponentClick('Button - Dashed')}
            >
              虚线按钮
            </Button>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              不同尺寸
            </p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Button 
                size="small"
                onClick={() => handleComponentClick('Button - Small')}
              >
                小
              </Button>
              <Button 
                size="middle"
                onClick={() => handleComponentClick('Button - Middle')}
              >
                中
              </Button>
              <Button 
                size="large"
                onClick={() => handleComponentClick('Button - Large')}
              >
                大
              </Button>
            </div>
          </div>
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
          color: '#333'
        }}>
          Input 组件
        </h2>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px' 
        }}>
          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              默认输入框
            </p>
            <Input 
              placeholder="请输入内容"
              value={inputValue}
              onChange={handleInputChange}
              style={{ width: '300px' }}
            />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              不同尺寸
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Input 
                size="small"
                placeholder="小尺寸"
                style={{ width: '300px' }}
              />
              <Input 
                size="middle"
                placeholder="中尺寸"
                style={{ width: '300px' }}
              />
              <Input 
                size="large"
                placeholder="大尺寸"
                style={{ width: '300px' }}
              />
            </div>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              密码输入框
            </p>
            <Input.Password 
              placeholder="请输入密码"
              style={{ width: '300px' }}
              onChange={() => handleComponentClick('Input - Password')}
            />
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              搜索框
            </p>
            <Input.Search 
              placeholder="请输入搜索内容"
              enterButton="搜索"
              style={{ width: '300px' }}
              onSearch={(value) => {
                console.log('搜索:', value);
                handleComponentClick('Input - Search');
              }}
            />
          </div>
        </div>
      </div>

      {/* 状态显示 */}
      {selectedComponent && (
        <div style={{ 
          padding: '12px', 
          background: '#e6f7ff', 
          borderRadius: '4px',
          border: '1px solid #91d5ff',
          marginTop: '16px'
        }}>
          <p style={{ fontSize: '12px', color: '#1890ff' }}>
            ✓ 已选择组件: {selectedComponent}
          </p>
          <p style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
            已在 Figma 中创建对应的 Frame
          </p>
        </div>
      )}

      <div style={{ 
        marginTop: '32px', 
        padding: '16px', 
        background: '#fff7e6',
        borderRadius: '4px',
        border: '1px solid #ffd591'
      }}>
        <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.6' }}>
          💡 提示：点击组件按钮会在 Figma 中创建对应的 Frame。您可以在 Figma 中进一步编辑这些 Frame。
        </p>
      </div>
    </div>
  );
}

// 渲染 React 应用
// 导出初始化函数，供外部调用
(window as any).initComponentLibraryUI = function() {
  const tryInit = () => {
    const container = document.getElementById('react-root');
    if (container && !container.querySelector('*')) {
      // 动态加载 antd 样式
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
      // 如果容器还不存在，稍后重试
      setTimeout(tryInit, 100);
      return false;
    }
    return true;
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
    return true; // 返回 true 表示已注册监听器
  } else {
    // DOM 已准备好，直接执行初始化
    return tryInit();
  }
};

