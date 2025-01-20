import Quill, { Delta, Op, QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface EditorProps {
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  quillRef: MutableRefObject<Quill | null>;
}

const Editor = ({
  placeholder = "Write something...",
  defaultValue = [],
  disabled = false,
  quillRef,
}: EditorProps) => {
  const [text, setText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef(placeholder);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
    };
    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white ",
          disabled && "opacity-50"
        )}
      >
        <div ref={containerRef} className="w-full ql-custom h-[250px]" />
      </div>

      <div
        className={cn(
          "p-2 text-[10px] text-muted-foreground flex justify-end opacity-0 transition",
          !isEmpty && "opacity-100"
        )}
      ></div>
    </div>
  );
};
export default Editor;
