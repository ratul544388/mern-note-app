import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {

  console.log(value)
  return (
    <ReactQuill
      placeholder="Write a note"
      className="mt-5"
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default RichTextEditor;
