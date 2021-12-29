import React, { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Action from './Action';
import useGetMinutes from '../../hooks/useGetMinutes';

interface EditorProps {
  subjectId: number;
  minuetsId: number;
}

const Editor: React.VFC<EditorProps> = (props) => {
  const { subjectId, minuetsId } = props;

  const [content, setContent] = useState<string>('');

  const editorRef = useRef<TuiEditor>(null);

  const minute = useGetMinutes(subjectId).minutes.filter(
    (m) => m.minutesId === minuetsId,
  )[0];

  useEffect(() => {
    if (minute) {
      editorRef?.current?.getInstance().setMarkdown(minute.content);
    }
  }, [minute]);

  const handleOnChange = () => {
    if (editorRef.current !== null) {
      const content = editorRef.current.getInstance().getMarkdown();
      setContent(content);
    }
  };

  return (
    <>
      <TuiEditor height="500px" onChange={handleOnChange} ref={editorRef} />
      <Action minute={{ ...minute, content }} />
    </>
  );
};

export default Editor;
