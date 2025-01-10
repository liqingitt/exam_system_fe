import Quill, { Delta } from 'quill';
import React, {  useEffect, useId, useRef } from 'react';
import 'quill/dist/quill.snow.css';  // 添加这行来导入 snow 主题样式
import 'quill/dist/quill.core.css';  
import styles from './index.less';
import clsx from 'clsx';

export interface QuillEditorInputProps {
  value?: string;
  onChange?: (value: string) => void;
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
    
  }, [editorId]);

  useEffect(() => {
    editorRef.current?.on('text-change', (_,__,source) => {
      if(source === 'api'){
        return;
      }
      const content = editorRef.current?.getContents();
      if(content){
        
        onChange?.(JSON.stringify(content));
      }
      
    });

    return () => {
      editorRef.current?.off('text-change');
    }
  },[editorRef,onChange])

  useEffect(() => {
    if(value&&editorRef.current){
      const content = editorRef.current?.getContents();
      
      const valueDelta = new Delta(JSON.parse(value));
      const diff = content?.diff(valueDelta);
      if(diff.ops.length > 0){
        editorRef.current?.setContents(valueDelta,'api');
      }
    }
  }, [value]);

  return <div className={styles.quillEditorInputWrapper}>
    <div id={`${editorId}_toolbar`}onMouseDown={(e) => {  // 阻止工具栏上的鼠标事件导致编辑器失去焦点
      e.preventDefault();
    }} ref={editorToolbarRef} className={styles.quillEditorToolbar}>
     
      <select className="ql-font"></select>  {/* 字体选择器 */}
      <select className="ql-size"></select>  {/* 字号选择器 */}
      <button className="ql-bold" type="button"></button>  {/* 加粗 */}
      <button className="ql-italic" type="button"></button>  {/* 斜体 */}
      <button className="ql-underline" type="button"></button>  {/* 下划线 */}
      <button className="ql-strike" type="button"></button>  {/* 删除线 */}
      <select className="ql-color"></select>  {/* 文字颜色 */}
      <select className="ql-background"></select>  {/* 背景颜色 */}
      <button className="ql-script" value="sub" type="button"></button>  {/* 下标 */}
      <button className="ql-script" value="super" type="button"></button>  {/* 上标 */}
      <button className="ql-header" value="1" type="button"></button>  {/* 一级标题 */}
      <button className="ql-header" value="2" type="button"></button>  {/* 二级标题 */}
      <button className="ql-list" value="ordered" type="button"></button>  {/* 有序列表 */}
      <button className="ql-list" value="bullet" type="button"></button>  {/* 无序列表 */}
      <button className="ql-direction" type="button" value="rtl"></button>  {/* 文字方向 */}
      <select className="ql-align"></select>  {/* 对齐方式 */}
      <button className="ql-link" type="button"></button>  {/* 插入链接 */}
      <button className="ql-clean" type="button"></button>  {/* 清除格式 */}
    </div>

    <div id={editorId}
      onFocus={()=>{
        editorToolbarRef.current?.style.setProperty('display', 'block')
        editInputRef.current?.classList.toggle('editing', true)
      }} 
      onBlur={()=>{
        editorToolbarRef.current?.style.setProperty('display', 'none')
        editInputRef.current?.classList.toggle('editing', false)
      }}
      className={clsx(styles.quillEditorInput)} ref={editInputRef} />


  </div>;
}
