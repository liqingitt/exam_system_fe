import Quill from 'quill';
import React, { useEffect, useId, useRef } from 'react';
import 'quill/dist/quill.snow.css';  // 添加这行来导入 snow 主题样式
import 'quill/dist/quill.core.css';  
import styles from './index.less';
import clsx from 'clsx';

export interface QuillEditorInputProps {
  value?: string;
  onChange?: (value?: string) => void;
}

export const QuillEditorInput:React.FC<QuillEditorInputProps> = (props) => {
  const {value, onChange} = props;

  const editorId = useId().replace(/:/g, '_');

  const editorRef = useRef<Quill>();

  const editInputRef = useRef<HTMLDivElement>(null);

  const editorToolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = new Quill(`#${editorId}`, {
      theme: 'snow',
      modules: {
        toolbar: `#${editorId}_toolbar`
      }
    });

    editorRef.current = editor;

    
    editor.on('selection-change', (range) => {
      editorToolbarRef.current?.style.setProperty('display', range ? 'block' : 'none')
      editInputRef.current?.classList.toggle('editing', !!range)
    });

  }, [editorId]);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && 
            (e.target.tagName === 'SELECT' || 
             e.target.closest('select'))) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const  editorToolbar = editorToolbarRef.current;
    editorToolbar?.addEventListener('click', clickHandler);

    return () => {
      editorToolbar?.removeEventListener('click', clickHandler);
    };
  }, []);

  return <div className={styles.quillEditorInputWrapper}>
    <button type="button" onClick={() => {
      // 创建一个临时div来解析HTML
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = '<h1>123</h1>';
      editorRef.current?.setContents(editorRef.current.clipboard?.convert({
        html: tempContainer.innerHTML
      }));
    }}>
        设置内容
    </button>
    <button type="button" onClick={() => {
      console.log(editorRef.current?.getSemanticHTML());
    }}>
        获取内容
    </button>
    <select onMouseDown={(e) => {
      console.log('2');
        
      e.preventDefault();
    }}>
      <option value="#b2b2b2">灰色</option>
      <option value="#000000">黑色</option>
      <option value="#ffffff">白色</option>
    </select>
    <div id={`${editorId}_toolbar`} ref={editorToolbarRef} className={styles.quillEditorToolbar}>
     
      <span className="ql-formats">
        {/* 文字颜色和背景色选择器 */}
        <select className="ql-color" onFocus={(e) => {
          console.log('23');
            
          e.preventDefault();
        }} defaultValue={'#b2b2b2'}>
          <option value="#b2b2b2">灰色</option>
          <option value="#000000">黑色</option>
          <option value="#ffffff">白色</option>
        </select>
        <select className="ql-background" defaultValue={'#ffffff'}>
          <option value="#ffffff">白色</option>
          <option value="#000000">黑色</option>
        </select>
      </span>
      <span className="ql-formats">
        {/* 上标和下标按钮 */}
        <button className="ql-script" value="sub" type="button"></button>
        <button className="ql-script" value="super" type="button"></button>
      </span>
  
 
      <span className="ql-formats">
        {/* 文字方向和对齐方式按钮 */}
        <button className="ql-direction" value="rtl" type="button"></button>
        <select className="ql-align"></select>
      </span>
 
      <span className="ql-formats">
        {/* 清除格式按钮 */}
        <button className="ql-clean" type="button"></button>
      </span>
    </div>

    <div id={editorId} className={clsx(styles.quillEditorInput)} ref={editInputRef} />


  </div>;
}
