// Hooks
import { useCallback, useMemo, useRef, useState } from "react";

// Utils
import { uploadData } from "aws-amplify/storage";

// UI Components
// react-quill expects ReactDOM.findDOMNode which can be missing in newer React
// versions (React 19+). Provide a small runtime shim so the editor can
// initialize. This is intentionally defensive and only attempts to return
// a DOM node when obvious.

import ReactQuill from "react-quill";

// Styles
import "react-quill/dist/quill.snow.css";
import { resolveMediaUrl } from "@/lib/media";
import { toast } from "sonner";
import { Label } from "./label";
import { generateFileName } from "@/lib/utils";

interface TextEditorProps {
  label?: string;
  value: string;
  readOnly?: boolean;
  minimal?: boolean;
  noFormat?: boolean;
  setValue: (val: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
  // Editor ref
  const quill = useRef<any>(null);
  const [readOnly, setReadOnly] = useState<boolean>(false);

  const imageHandler = useCallback(async () => {
    if (props.readOnly) return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files?.length) return;
      const file = input.files[0];
      if (file) {
        setReadOnly(true);
        toast.promise(
          uploadData({
            data: file,
            path: `public/${generateFileName(file.name)}`,
          }).result,
          {
            success: (res) => {
              console.log({ res });
              const image = resolveMediaUrl(res.path);
              const editor = quill.current.getEditor();
              const range = quill.current.getEditorSelection("focus", "true");
              editor.insertEmbed(range.index, "image", image);

              return "Image attached successfully!";
            },
            error: "Failed to upload image.",
            finally: () => setReadOnly(false),
          },
        );
      }
    };
  }, [props.readOnly]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: props.noFormat
          ? [
              [{ header: [false] }],
              ["bold", "italic", "underline", "blockquote"],
              [{ color: [] }],
            ]
          : props.minimal
            ? [
                [{ header: [false] }],
                ["bold", "italic", "underline", "blockquote"],
                [{ color: [] }],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
              ]
            : [
                [{ header: [2, 3, 4, false] }],
                ["bold", "italic", "underline", "blockquote"],
                [{ color: [] }],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler, props.minimal, props.noFormat],
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    `clean`,
  ];

  return (
    <div>
      <Label>
        {props.label}{" "}
        {props.minimal && (
          <span className="text-gray-500 text-[12px]">
            (Only bold, italic, underline, blockquote, and color)
          </span>
        )}
      </Label>
      <div className="mt-4">
        <ReactQuill
          ref={(el: any) => (quill.current = el)}
          theme="snow"
          placeholder={"Start from here.."}
          value={props.value}
          onChange={(newValue: string) => props.setValue(newValue)}
          formats={formats}
          modules={modules}
          readOnly={readOnly || props.readOnly}
          className={"markdown"}
        />
      </div>
    </div>
  );
};

export default TextEditor;
