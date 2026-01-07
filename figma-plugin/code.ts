// AI 生成 By Peng.Guo
// Figma Plugin 主代码 - 创建真正的 Figma 组件

console.log('🔥 Plugin 代码已加载');

// 颜色配置
const COLORS = {
  primary: { r: 0.09, g: 0.46, b: 0.82 },        // #1677ff
  primaryHover: { r: 0.25, g: 0.55, b: 0.89 },   // #4096ff
  default: { r: 1, g: 1, b: 1 },                  // #ffffff
  defaultBorder: { r: 0.85, g: 0.85, b: 0.85 },  // #d9d9d9
  text: { r: 0, g: 0, b: 0 },                     // #000000 (rgba 0.88)
  textWhite: { r: 1, g: 1, b: 1 },               // #ffffff
  disabled: { r: 0.96, g: 0.96, b: 0.96 },       // #f5f5f5
  disabledText: { r: 0.75, g: 0.75, b: 0.75 },   // #bfbfbf
  disabledBorder: { r: 0.85, g: 0.85, b: 0.85 }, // #d9d9d9
  dashed: { r: 1, g: 1, b: 1 },                  // #ffffff
  link: { r: 0.09, g: 0.46, b: 0.82 },           // #1677ff
  inputBorder: { r: 0.85, g: 0.85, b: 0.85 },    // #d9d9d9
  inputBg: { r: 1, g: 1, b: 1 },                 // #ffffff
  placeholder: { r: 0.75, g: 0.75, b: 0.75 },    // #bfbfbf
};

// 尺寸配置
const SIZES = {
  small: { height: 24, padding: 7, fontSize: 14, borderRadius: 4 },
  middle: { height: 32, padding: 15, fontSize: 14, borderRadius: 6 },
  large: { height: 40, padding: 15, fontSize: 16, borderRadius: 8 },
};

// 加载字体
async function loadFonts() {
  try {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  } catch (e) {
    // 如果 Inter 不可用，尝试其他字体
    try {
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
      await figma.loadFontAsync({ family: "Roboto", style: "Medium" });
    } catch (e2) {
      console.warn('字体加载失败，使用默认字体');
    }
  }
}

// 创建图标组件（用于 icon 属性）
async function createIconComponent(name: string, path: string): Promise<ComponentNode> {
  const iconComponent = figma.createComponent();
  iconComponent.name = name;
  
  // 创建一个简单的图标占位符（实际应用中可以用 SVG 或更复杂的形状）
  const iconFrame = figma.createFrame();
  iconFrame.name = 'icon';
  iconFrame.resize(16, 16);
  iconFrame.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.65 }];
  
  // 可以根据 path 或 name 创建不同的图标形状
  // 这里创建一个通用的占位图标
  const iconShape = figma.createEllipse();
  iconShape.resize(16, 16);
  iconShape.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.65 }];
  iconFrame.appendChild(iconShape);
  
  iconComponent.appendChild(iconFrame);
  
  return iconComponent;
}

// 创建 Button 组件
async function createButtonComponent(props: {
  type: 'default' | 'primary' | 'dashed' | 'text' | 'link';
  size: 'small' | 'middle' | 'large';
  disabled?: boolean;
  loading?: boolean;
  text: string;
  hasIcon?: boolean;
}): Promise<ComponentNode> {
  await loadFonts();
  
  const { type, size, disabled, loading, text, hasIcon } = props;
  const sizeConfig = SIZES[size];
  
  // 创建组件
  const component = figma.createComponent();
  component.name = `Button`;
  
  // 设置自动布局
  component.layoutMode = 'HORIZONTAL';
  component.primaryAxisAlignItems = 'CENTER';
  component.counterAxisAlignItems = 'CENTER';
  component.paddingLeft = sizeConfig.padding;
  component.paddingRight = sizeConfig.padding;
  component.paddingTop = 0;
  component.paddingBottom = 0;
  component.itemSpacing = hasIcon ? 8 : 0;
  component.cornerRadius = sizeConfig.borderRadius;
  component.minHeight = sizeConfig.height;
  
  // 先添加所有组件属性
  const labelPropertyName = component.addComponentProperty('label', 'TEXT', text);
  // 注意：VARIANT 类型只能用于 Component Set，单独 Component 只能用 TEXT
  // 用户可以在属性面板输入 type 值：default/primary/dashed/text/link
  component.addComponentProperty('type', 'TEXT', type);
  component.addComponentProperty('size', 'TEXT', size);
  component.addComponentProperty('disabled', 'BOOLEAN', disabled || false);
  component.addComponentProperty('loading', 'BOOLEAN', loading || false);
  component.addComponentProperty('hasIcon', 'BOOLEAN', hasIcon || false);
  
  // 创建图标占位符（始终创建，通过 hasIcon 控制显示）
  const iconContainer = figma.createFrame();
  iconContainer.name = 'icon-container';
  iconContainer.resize(16, 16);
  iconContainer.fills = [];
  iconContainer.layoutMode = 'HORIZONTAL';
  iconContainer.primaryAxisAlignItems = 'CENTER';
  iconContainer.counterAxisAlignItems = 'CENTER';
  iconContainer.visible = hasIcon || false;
  const placeholderIcon = figma.createEllipse();
  placeholderIcon.name = 'icon';
  placeholderIcon.resize(16, 16);
  placeholderIcon.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.65 }];
  iconContainer.appendChild(placeholderIcon);
  component.appendChild(iconContainer);
  
  // 添加 loading 图标占位符（条件显示）
  const loadingIconContainer = figma.createFrame();
  loadingIconContainer.name = 'loading-icon-container';
  loadingIconContainer.resize(14, 14);
  loadingIconContainer.visible = loading || false;
  loadingIconContainer.fills = [];
  
  const loadingIcon = figma.createEllipse();
  loadingIcon.name = 'loading-icon';
  loadingIcon.resize(14, 14);
  loadingIcon.fills = [];
  loadingIcon.strokes = [{ 
    type: 'SOLID', 
    color: type === 'primary' && !disabled ? COLORS.textWhite : COLORS.primary 
  }];
  loadingIcon.strokeWeight = 2;
  loadingIcon.arcData = { startingAngle: 0, endingAngle: 4.5, innerRadius: 0.5 };
  loadingIconContainer.appendChild(loadingIcon);
  component.appendChild(loadingIconContainer);
  
  // 创建文字
  const textNode = figma.createText();
  textNode.name = 'label-text';
  textNode.fontSize = sizeConfig.fontSize;
  textNode.characters = text;
  
  // 设置文字颜色（根据初始状态）
  updateButtonStyles(component, textNode, loadingIconContainer, {
    type,
    size,
    disabled: disabled || false,
    loading: loading || false,
  });
  
  component.appendChild(textNode);
  
  // 将文字绑定到组件属性
  textNode.componentPropertyReferences = { characters: labelPropertyName };
  
  return component;
}

// 更新按钮样式（根据属性值）
async function updateButtonStyles(
  component: ComponentNode,
  textNode: TextNode,
  loadingIconContainer: FrameNode,
  props: {
    type: string;
    size: string;
    disabled: boolean;
    loading: boolean;
  }
) {
  await loadFonts();
  
  const { type, size, disabled, loading } = props;
  const sizeConfig = SIZES[size as 'small' | 'middle' | 'large'];
  
  // 更新尺寸
  component.minHeight = sizeConfig.height;
  component.cornerRadius = sizeConfig.borderRadius;
  component.paddingLeft = sizeConfig.padding;
  component.paddingRight = sizeConfig.padding;
  textNode.fontSize = sizeConfig.fontSize;
  
  // 更新 loading 图标可见性
  loadingIconContainer.visible = loading;
  
  // 根据类型和状态设置样式
  if (disabled) {
    component.fills = [{ type: 'SOLID', color: COLORS.disabled }];
    component.strokes = [{ type: 'SOLID', color: COLORS.disabledBorder }];
    component.strokeWeight = 1;
    component.dashPattern = [];
    textNode.fills = [{ type: 'SOLID', color: COLORS.disabledText }];
  } else {
    switch (type) {
      case 'primary':
        component.fills = [{ type: 'SOLID', color: COLORS.primary }];
        component.strokes = [];
        component.dashPattern = [];
        textNode.fills = [{ type: 'SOLID', color: COLORS.textWhite }];
        break;
      case 'dashed':
        component.fills = [{ type: 'SOLID', color: COLORS.dashed }];
        component.strokes = [{ type: 'SOLID', color: COLORS.defaultBorder }];
        component.strokeWeight = 1;
        component.dashPattern = [4, 4];
        textNode.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.88 }];
        break;
      case 'text':
        component.fills = [];
        component.strokes = [];
        component.dashPattern = [];
        textNode.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.88 }];
        break;
      case 'link':
        component.fills = [];
        component.strokes = [];
        component.dashPattern = [];
        textNode.fills = [{ type: 'SOLID', color: COLORS.link }];
        break;
      default: // default
        component.fills = [{ type: 'SOLID', color: COLORS.default }];
        component.strokes = [{ type: 'SOLID', color: COLORS.defaultBorder }];
        component.strokeWeight = 1;
        component.dashPattern = [];
        textNode.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.88 }];
    }
  }
}

// 更新 Button 组件样式（根据当前属性值）
async function refreshButtonComponent(node: ComponentNode | InstanceNode) {
  try {
    // 获取组件定义（如果是 Instance，从异步 API 获取 mainComponent）
    const component = node.type === 'INSTANCE'
      ? await (node as InstanceNode).getMainComponentAsync()
      : node;
    if (!component) {
      figma.notify('选中的不是 Button 组件或实例', { timeout: 2000, error: true });
      return;
    }
    
    // 获取属性值（从 Instance 或 Component 本身）
    const properties = component.componentPropertyDefinitions;
    let type = 'default';
    let size = 'middle';
    let disabled = false;
    let loading = false;
    let hasIcon = false;
    
    // 查找属性值
    if (node.type === 'INSTANCE') {
      // 从 Instance 获取属性值（通过 componentProperties）
      const instance = node as InstanceNode;
      
      // 遍历所有属性定义，找到对应的属性值
      for (const [propName, propDef] of Object.entries(properties)) {
        const propValue = instance.componentProperties && instance.componentProperties[propName];
        let value: any = null;
        
        if (propValue && (propValue as any).value !== undefined) {
          value = (propValue as any).value;
        } else {
          value = propDef.defaultValue;
        }
        
        // 通过属性键名或类型判断属性类型（propName 可能是 "Type#123:456" 这样的格式）
        const propNameLower = propName.toLowerCase();
        
        if (propNameLower.includes('type') && propDef.type === 'VARIANT' && typeof value === 'string') {
          if (['default', 'primary', 'dashed', 'text', 'link'].includes(value)) {
            type = value;
          }
        } else if (propNameLower.includes('size') && propDef.type === 'VARIANT' && typeof value === 'string') {
          if (['small', 'middle', 'large'].includes(value)) {
            size = value;
          }
        } else if (propNameLower.includes('disabled') && propDef.type === 'BOOLEAN') {
          disabled = value === true;
        } else if (propNameLower.includes('loading') && propDef.type === 'BOOLEAN') {
          loading = value === true;
        } else if (propNameLower.includes('hasicon') && propDef.type === 'BOOLEAN') {
          hasIcon = value === true;
        }
      }
    } else {
      // 从 Component 获取默认值
      for (const [propName, propDef] of Object.entries(properties)) {
        if (propName.toLowerCase().includes('type') && propDef.type === 'VARIANT') {
          const defaultValue = (propDef.defaultValue || 'default') as string;
          if (['default', 'primary', 'dashed', 'text', 'link'].includes(defaultValue)) {
            type = defaultValue;
          }
        } else if (propName.toLowerCase().includes('size') && propDef.type === 'VARIANT') {
          const defaultValue = (propDef.defaultValue || 'middle') as string;
          if (['small', 'middle', 'large'].includes(defaultValue)) {
            size = defaultValue;
          }
        } else if (propName.toLowerCase().includes('disabled') && propDef.type === 'BOOLEAN') {
          disabled = (propDef.defaultValue || false) as boolean;
        } else if (propName.toLowerCase().includes('loading') && propDef.type === 'BOOLEAN') {
          loading = (propDef.defaultValue || false) as boolean;
        } else if (propName.toLowerCase().includes('hasicon') && propDef.type === 'BOOLEAN') {
          hasIcon = (propDef.defaultValue || false) as boolean;
        }
      }
    }
    
    // 对于 Instance，需要直接修改实例节点
    let targetNode: ComponentNode | InstanceNode;
    if (node.type === 'INSTANCE') {
      targetNode = node; // 直接使用 Instance
    } else {
      targetNode = component;
    }
    
    // 查找子元素
    const textNode = targetNode.findChild(n => n.name === 'label-text') as TextNode | null;
    const loadingIconContainer = targetNode.findChild(n => n.name === 'loading-icon-container') as FrameNode | null;
    const iconContainer = targetNode.findChild(n => n.name === 'icon-container') as FrameNode | null;
    
    if (!textNode || !loadingIconContainer) {
      console.warn('无法找到 Button 子元素', { 
        textNode: !!textNode, 
        loadingIconContainer: !!loadingIconContainer,
        nodeType: targetNode.type,
        children: targetNode.children.map(c => c.name)
      });
      figma.notify('无法找到 Button 子元素', { timeout: 2000, error: true });
      return;
    }
    
    console.log('准备更新 Button 样式:', { 
      type, 
      size, 
      disabled, 
      loading,
      hasIcon,
      nodeType: targetNode.type,
      isInstance: targetNode.type === 'INSTANCE'
    });
    
    // icon/spacing（按 hasIcon 控制）
    if (targetNode.layoutMode === 'HORIZONTAL') {
      targetNode.itemSpacing = hasIcon ? 8 : 0;
    }
    if (iconContainer) {
      iconContainer.visible = hasIcon;
    }
    
    // 更新样式（对于 Instance 也可以直接修改）
    await updateButtonStyles(targetNode as ComponentNode, textNode, loadingIconContainer, {
      type,
      size,
      disabled,
      loading,
    });
    
    figma.notify(`✓ 已更新 Button 样式: ${type} / ${size}${disabled ? ' / disabled' : ''}${loading ? ' / loading' : ''}${hasIcon ? ' / icon' : ''}`, { timeout: 1500 });
  } catch (error) {
    console.error('更新 Button 样式失败:', error);
    figma.notify(`✗ 更新失败: ${error}`, { timeout: 2000, error: true });
  }
}

// 创建 Input 组件
async function createInputComponent(props: {
  size: 'small' | 'middle' | 'large';
  disabled?: boolean;
  placeholder: string;
  value?: string;
  prefix?: string;
  suffix?: string;
}): Promise<ComponentNode> {
  await loadFonts();
  
  const { size, disabled, placeholder, value, prefix, suffix } = props;
  const sizeConfig = SIZES[size];
  
  // 创建组件
  const component = figma.createComponent();
  component.name = `Input / ${size}${disabled ? ' / disabled' : ''}`;
  
  // 设置自动布局
  component.layoutMode = 'HORIZONTAL';
  component.primaryAxisAlignItems = 'CENTER';
  component.counterAxisAlignItems = 'CENTER';
  component.paddingLeft = 11;
  component.paddingRight = 11;
  component.paddingTop = 4;
  component.paddingBottom = 4;
  component.itemSpacing = 4;
  component.cornerRadius = sizeConfig.borderRadius;
  component.minHeight = sizeConfig.height;
  component.minWidth = 200;
  
  // 设置背景和边框
  if (disabled) {
    component.fills = [{ type: 'SOLID', color: COLORS.disabled }];
  } else {
    component.fills = [{ type: 'SOLID', color: COLORS.inputBg }];
  }
  component.strokes = [{ type: 'SOLID', color: COLORS.inputBorder }];
  component.strokeWeight = 1;
  
  // 添加前缀（如果有）
  if (prefix) {
    const prefixNode = figma.createText();
    prefixNode.name = 'prefix';
    prefixNode.characters = prefix;
    prefixNode.fontSize = sizeConfig.fontSize;
    prefixNode.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.88 }];
    component.appendChild(prefixNode);
  }
  
  // 创建输入文字/占位符
  const textNode = figma.createText();
  textNode.name = 'value';
  textNode.layoutGrow = 1;
  textNode.fontSize = sizeConfig.fontSize;
  
  if (value) {
    textNode.characters = value;
    if (disabled) {
      textNode.fills = [{ type: 'SOLID', color: COLORS.disabledText }];
    } else {
      textNode.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.88 }];
    }
  } else {
    textNode.characters = placeholder;
    textNode.fills = [{ type: 'SOLID', color: COLORS.placeholder }];
  }
  
  component.appendChild(textNode);
  
  // 添加后缀（如果有）
  if (suffix) {
    const suffixNode = figma.createText();
    suffixNode.name = 'suffix';
    suffixNode.characters = suffix;
    suffixNode.fontSize = sizeConfig.fontSize;
    suffixNode.fills = [{ type: 'SOLID', color: COLORS.text, opacity: 0.45 }];
    component.appendChild(suffixNode);
  }
  
  // 添加组件属性（暂不绑定，因为 Input 的值显示逻辑较复杂）
  component.addComponentProperty('placeholder', 'TEXT', placeholder);
  component.addComponentProperty('value', 'TEXT', value || '');
  
  return component;
}

// 处理来自 UI 的消息
figma.ui.onmessage = async (msg) => {
  console.log('收到消息:', msg.type);

  switch (msg.type) {
    case 'create-button': {
      try {
        const component = await createButtonComponent({
          type: msg.buttonType || 'default',
          size: msg.size || 'middle',
          disabled: msg.disabled || false,
          loading: msg.loading || false,
          text: msg.text || '按钮',
          hasIcon: msg.hasIcon || false,
        });
        
        // 定位到视口中心
        const viewportCenter = figma.viewport.center;
        component.x = viewportCenter.x - component.width / 2;
        component.y = viewportCenter.y - component.height / 2;
        
        figma.currentPage.appendChild(component);
        
        // 立即创建一个 Instance，方便用户直接编辑属性
        const instance = component.createInstance();
        instance.x = viewportCenter.x - component.width / 2;
        instance.y = viewportCenter.y - component.height / 2;
        figma.currentPage.appendChild(instance);
        figma.currentPage.selection = [instance];
        figma.viewport.scrollAndZoomIntoView([instance]);
        
        figma.notify(`✓ 已创建 Button Instance（可直接编辑属性）`, { timeout: 2000 });
        
        // 自动启动定期检查
        setTimeout(() => {
          const selection = figma.currentPage.selection;
          if (selection.length > 0 && selection[0].id === instance.id) {
            console.log('🎯 自动启动定期检查');
            // 初始化属性值
            const properties = component.componentPropertyDefinitions;
            for (const [propName, propDef] of Object.entries(properties)) {
              const componentProps = instance.componentProperties || {};
              const propValue = componentProps[propName];
              const currentValue = (propValue && (propValue as any).value !== undefined) 
                ? (propValue as any).value 
                : propDef.defaultValue;
              lastPropertyValues.set(`${instance.id}-${propName}`, currentValue);
            }
            startPropertyCheck();
          }
        }, 100);
        
        figma.ui.postMessage({
          type: 'success',
          message: `已创建组件: ${component.name}`,
        });
      } catch (error) {
        console.error('创建 Button 失败:', error);
        figma.notify(`✗ 创建失败: ${error}`, { timeout: 3000, error: true });
      }
      break;
    }

    case 'create-input': {
      try {
        const component = await createInputComponent({
          size: msg.size || 'middle',
          disabled: msg.disabled || false,
          placeholder: msg.placeholder || '请输入',
          value: msg.value,
          prefix: msg.prefix,
          suffix: msg.suffix,
        });
        
        // 定位到视口中心
        const viewportCenter = figma.viewport.center;
        component.x = viewportCenter.x - component.width / 2;
        component.y = viewportCenter.y - component.height / 2;
        
        figma.currentPage.appendChild(component);
        figma.currentPage.selection = [component];
        figma.viewport.scrollAndZoomIntoView([component]);
        
        figma.notify(`✓ 已创建 Input 组件`, { timeout: 2000 });
        
        figma.ui.postMessage({
          type: 'success',
          message: `已创建组件: ${component.name}`,
        });
      } catch (error) {
        console.error('创建 Input 失败:', error);
        figma.notify(`✗ 创建失败: ${error}`, { timeout: 3000, error: true });
      }
      break;
    }

    case 'update-button': {
      // 更新选中的 Button 组件样式
      const selection = figma.currentPage.selection;
      if (selection.length === 0) {
        figma.notify('请先选中一个 Button 组件', { timeout: 2000, error: true });
        break;
      }
      
      const selected = selection[0];
      if (selected.type === 'COMPONENT' && selected.name === 'Button') {
        await refreshButtonComponent(selected as ComponentNode);
      } else if (selected.type === 'INSTANCE') {
        const instance = selected as InstanceNode;
        const mc = await instance.getMainComponentAsync();
        if (mc && mc.name === 'Button') {
          await refreshButtonComponent(instance);
        } else {
          figma.notify('选中的不是 Button 组件', { timeout: 2000, error: true });
        }
      } else {
        figma.notify('选中的不是 Button 组件', { timeout: 2000, error: true });
      }
      break;
    }

    case 'create-image': {
      // 保留图片模式作为备选
      try {
        const imageData = new Uint8Array(msg.imageData);
        const image = figma.createImage(imageData);
        
        const rect = figma.createRectangle();
        rect.name = msg.componentName || 'Component';
        
        const width = msg.width || 200;
        const height = msg.height || 100;
        rect.resize(width, height);
        
        rect.fills = [{
          type: 'IMAGE',
          imageHash: image.hash,
          scaleMode: 'FILL',
        }];
        
        const viewportCenter = figma.viewport.center;
        rect.x = viewportCenter.x - width / 2;
        rect.y = viewportCenter.y - height / 2;
        
        figma.currentPage.appendChild(rect);
        figma.currentPage.selection = [rect];
        figma.viewport.scrollAndZoomIntoView([rect]);
        
        figma.notify(`✓ 已插入: ${msg.componentName}`, { timeout: 2000 });
      } catch (error) {
        console.error('创建图片失败:', error);
        figma.notify(`✗ 创建失败: ${error}`, { timeout: 3000, error: true });
      }
      break;
    }

    case 'create-frame': {
      const frame = figma.createFrame();
      frame.name = msg.componentName || 'Component Frame';
      frame.resize(msg.width || 200, msg.height || 100);
      
      if (msg.color) {
        frame.fills = [{ type: 'SOLID', color: msg.color }];
      }
      
      const viewportCenter = figma.viewport.center;
      frame.x = viewportCenter.x - (msg.width || 200) / 2;
      frame.y = viewportCenter.y - (msg.height || 100) / 2;
      
      figma.currentPage.appendChild(frame);
      figma.currentPage.selection = [frame];
      figma.viewport.scrollAndZoomIntoView([frame]);
      
      figma.notify(`✓ 已插入: ${msg.componentName}`, { timeout: 2000 });
      break;
    }

    case 'resize': {
      figma.ui.resize(msg.width, msg.height);
      break;
    }

    case 'close': {
      figma.closePlugin();
      break;
    }

    case 'ready': {
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

// 存储上次的属性值，用于检测变化
let lastPropertyValues: Map<string, any> = new Map();
let checkInterval: number | null = null;
let checkCounter = 0; // 检查计数器

// 检查选中 Button 的属性变化并更新样式
async function checkAndUpdateButton() {
  try {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      // 静默返回，避免日志过多
      return;
    }
    
    checkCounter++;
    const selected = selection[0];
    
  // 只检查 Instance（Component 的属性是定义，不能修改）
  if (selected.type === 'INSTANCE') {
    const instance = selected as InstanceNode;
    const component = await instance.getMainComponentAsync();
    if (!component || component.name !== 'Button') return;
      
      const properties = component.componentPropertyDefinitions;
      let needsUpdate = false;
      
      for (const [propName, propDef] of Object.entries(properties)) {
        try {
          // 从 componentProperties 获取当前值
          const componentProps = instance.componentProperties || {};
          const propValue = componentProps[propName];
          const currentValue = (propValue && (propValue as any).value !== undefined) 
            ? (propValue as any).value 
            : propDef.defaultValue;
          
          const lastValue = lastPropertyValues.get(`${instance.id}-${propName}`);
          
          // 调试日志（仅在值变化时输出）
          const propNameLower = propName.toLowerCase();
          if ((propNameLower.includes('type') || propNameLower.includes('size')) && 
              JSON.stringify(currentValue) !== JSON.stringify(lastValue)) {
            console.log(`🔔 属性 ${propName} 值变化: ${lastValue} → ${currentValue}`);
          }
          
          // 如果是关键属性变化，需要更新样式
          const isKeyProperty = propName.toLowerCase().includes('type') || 
                                propName.toLowerCase().includes('size') ||
                                propName.toLowerCase().includes('disabled') ||
                                propName.toLowerCase().includes('loading') ||
                                propName.toLowerCase().includes('hasicon');
          
          if (isKeyProperty && JSON.stringify(currentValue) !== JSON.stringify(lastValue)) {
            needsUpdate = true;
            lastPropertyValues.set(`${instance.id}-${propName}`, currentValue);
          }
        } catch (e) {
          // 忽略获取属性失败的情况
          console.warn(`获取属性 ${propName} 失败:`, e);
        }
      }
      
      // 如果属性变化，自动更新样式
      if (needsUpdate) {
        console.log('✅ 检测到属性变化，开始更新样式...');
        await refreshButtonComponent(instance);
      } else {
        // 静默跳过，避免日志过多
      }
    }
  } catch (error) {
    console.error('检查 Button 属性时出错:', error);
  }
}

// 启动定期检查（每 100ms 检查一次，更快响应）
function startPropertyCheck() {
  if (checkInterval !== null) {
    console.log('⚠️ 检查已在运行，先停止之前的检查');
    clearInterval(checkInterval);
  }
  console.log('✅ 启动定期检查（每 100ms）');
  
  // 立即检查一次
  checkAndUpdateButton();
  
  // 然后定期检查
  checkInterval = setInterval(() => {
    checkAndUpdateButton();
  }, 100);
}

// 停止定期检查
function stopPropertyCheck() {
  if (checkInterval !== null) {
    console.log('⏹️ 停止定期检查');
    clearInterval(checkInterval);
    checkInterval = null;
  }
}

// 监听 selection 变化，启动/停止检查
figma.on('selectionchange', async () => {
  console.log('🔍 Selection 变化事件触发');
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    console.log('❌ 没有选中对象，停止检查');
    stopPropertyCheck();
    return;
  }
  
  const selected = selection[0];
  console.log('📌 选中对象:', { type: selected.type, name: selected.name });
  
  // 如果选中的是 Button Component，提示用户创建 Instance
  if (selected.type === 'COMPONENT' && selected.name === 'Button') {
    console.log('⚠️ 选中了 Button Component（不是 Instance）');
    console.log('💡 提示：Component 的属性是定义，Instance 的属性才是可编辑的');
    console.log('💡 请选中 Button Component，然后按 Cmd/Ctrl + D 创建 Instance，再修改 Instance 的属性');
    stopPropertyCheck();
    return;
  }
  
  // 如果选中的是 Button Instance，启动定期检查
  if (selected.type === 'INSTANCE') {
    const instance = selected as InstanceNode;
    const mc = await instance.getMainComponentAsync();
    if (!(mc && mc.name === 'Button')) {
      console.log('❌ 选中的不是 Button Instance，停止检查');
      stopPropertyCheck();
      return;
    }
    console.log('✅ 选中了 Button Instance，启动定期检查');
    
    // 初始化属性值
    const component = await instance.getMainComponentAsync();
    if (component) {
      const properties = component.componentPropertyDefinitions;
      console.log('📋 初始化属性值，共', Object.keys(properties).length, '个属性');
      for (const [propName, propDef] of Object.entries(properties)) {
        const componentProps = instance.componentProperties || {};
        const propValue = componentProps[propName];
        const currentValue = (propValue && (propValue as any).value !== undefined) 
          ? (propValue as any).value 
          : propDef.defaultValue;
        lastPropertyValues.set(`${instance.id}-${propName}`, currentValue);
        console.log(`  - ${propName}: ${currentValue}`);
      }
    }
    startPropertyCheck();
    console.log('🚀 定期检查已启动（每 100ms 检查一次）');
  } else {
    console.log('❌ 选中的不是 Button Instance，停止检查');
    stopPropertyCheck();
  }
});

// 处理插件启动和菜单命令（合并为一个处理器）
figma.on('run', async ({ command }) => {
  console.log('🚀 Plugin 启动', command ? `命令: ${command}` : '');
  
  // 处理更新样式菜单命令（不显示 UI）
  if (command === 'update-button-style') {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.notify('请先选中一个 Button Instance', { timeout: 2000, error: true });
      figma.closePlugin();
      return;
    }
    
    const selected = selection[0];
    if (selected.type === 'INSTANCE') {
      const mc = await (selected as InstanceNode).getMainComponentAsync();
      if (mc && mc.name === 'Button') {
        console.log('📋 通过菜单命令更新 Button 样式');
        await refreshButtonComponent(selected as InstanceNode);
      } else {
        figma.notify('请选中 Button Instance（不是 Component）', { timeout: 2000, error: true });
      }
    } else if (selected.type === 'COMPONENT' && selected.name === 'Button') {
      figma.notify('请选中 Button Instance（不是 Component）。按 Cmd/Ctrl + D 创建 Instance', { timeout: 3000, error: true });
    } else {
      figma.notify('请选中 Button Instance', { timeout: 2000, error: true });
    }
    figma.closePlugin();
    return;
  }
  
  // 处理打开组件库命令或正常启动：显示 UI
  if (command === 'open' || !command) {
    console.log('📦 打开组件库 UI');
  }
  figma.showUI(__html__, {
    width: 1200,
    height: 800,
    themeColors: true,
  });
  
  // 如果已选中 Button Instance，立即启动检查
  setTimeout(async () => {
    const selection = figma.currentPage.selection;
    if (selection.length > 0) {
      const selected = selection[0];
      if (selected.type === 'COMPONENT' && selected.name === 'Button') {
        console.log('🎯 启动时已选中 Button Component');
        // Component 不需要启动检查
      } else if (selected.type === 'INSTANCE') {
        const instance = selected as InstanceNode;
        const component = await instance.getMainComponentAsync();
        if (component && component.name === 'Button') {
          console.log('🎯 启动时已选中 Button Instance，立即启动检查');
          const properties = component.componentPropertyDefinitions;
          for (const [propName, propDef] of Object.entries(properties)) {
            const componentProps = instance.componentProperties || {};
            const propValue = componentProps[propName];
            const currentValue = (propValue && (propValue as any).value !== undefined) 
              ? (propValue as any).value 
              : propDef.defaultValue;
            lastPropertyValues.set(`${instance.id}-${propName}`, currentValue);
          }
          startPropertyCheck();
        }
      }
    }
  }, 500);
});

figma.on('close', () => {
  console.log('Plugin 已关闭');
  stopPropertyCheck();
});
