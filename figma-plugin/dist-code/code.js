"use strict";
// AI 生成 By Peng.Guo
// Figma Plugin 主代码
// 显示 UI
figma.showUI(__html__, {
    width: 1200,
    height: 800,
    themeColors: true,
});
// 处理来自 UI 的消息
figma.ui.onmessage = async (msg) => {
    console.log('收到消息:', msg);
    switch (msg.type) {
        case 'create-rectangle': {
            // 创建一个矩形组件
            const rect = figma.createRectangle();
            rect.name = msg.componentName || 'Component';
            rect.resize(msg.width || 100, msg.height || 100);
            // 设置颜色（如果有）
            if (msg.color) {
                rect.fills = [{ type: 'SOLID', color: msg.color }];
            }
            // 添加到当前页面
            figma.currentPage.appendChild(rect);
            figma.currentPage.selection = [rect];
            figma.viewport.scrollAndZoomIntoView([rect]);
            figma.ui.postMessage({
                type: 'success',
                message: `已创建组件: ${msg.componentName}`,
            });
            break;
        }
        case 'create-frame': {
            // 创建一个 Frame 作为组件容器
            const frame = figma.createFrame();
            frame.name = msg.componentName || 'Component Frame';
            frame.resize(msg.width || 200, msg.height || 100);
            if (msg.color) {
                frame.fills = [{ type: 'SOLID', color: msg.color }];
            }
            figma.currentPage.appendChild(frame);
            figma.currentPage.selection = [frame];
            figma.viewport.scrollAndZoomIntoView([frame]);
            figma.ui.postMessage({
                type: 'success',
                message: `已创建 Frame: ${msg.componentName}`,
            });
            break;
        }
        case 'component-selected': {
            // 组件被选中
            figma.ui.postMessage({
                type: 'component-selected-ack',
                componentName: msg.componentName,
            });
            break;
        }
        case 'resize': {
            // 调整 UI 大小
            figma.ui.resize(msg.width, msg.height);
            break;
        }
        case 'close': {
            figma.closePlugin();
            break;
        }
        case 'ready': {
            // UI 已就绪
            console.log('UI 已就绪');
            figma.ui.postMessage({
                type: 'plugin-ready',
                message: 'Plugin 已准备好接收消息',
            });
            break;
        }
        default: {
            console.warn(`未知消息类型: ${msg.type}`);
        }
    }
};
// Plugin 关闭时的清理
figma.on('close', () => {
    console.log('Plugin 已关闭');
});
