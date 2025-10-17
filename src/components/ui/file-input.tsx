import { resolveMediaUrl } from "@/lib/media";
import { generateFileName } from "@/lib/utils";
import { uploadData, remove } from "aws-amplify/storage";
import * as React from "react";

// UI Components
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

// Utils

export interface InputProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  notBg?: boolean;
  edit?: {
    setOldValue: (value: string) => void;
    oldValue: string;
  };
}

const FileInput: React.FC<InputProps> = (props) => {
  const fileInput = React.useRef<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  function uploadHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setLoading(true);
    toast.promise(
      uploadData({
        data: files[0],
        path: `public/${generateFileName(files[0].name)}`,
      }).result,
      {
        loading: "Uploading file, please wait",
        success: (data) => {
          const key = `public/${data.path}`;
          if (props.edit) {
            props.edit.setOldValue(props.value);
            props.setValue(key);
            return;
          }
          props.setValue(key);

          return "File uploaded successfully";
        },
        error: "File upload failed, please try again",
      },
    );
  }

  function removeFile() {
    if (props.value) {
      setLoading(true);
      toast.promise(
        remove({
          path: (props.value as string).replace("public/", ""),
        }),
        {
          success: () => {
            props.setValue(props.edit ? props.edit.oldValue : "");
            if (props.edit) props.edit.setOldValue("");

            return "File removed successfully";
          },
          error: "Removal failed, try again",
          loading: "Removing file, please wait",
        },
      );
    }
  }

  function handleClickAction() {
    if (loading) return;

    if (props.value) {
      if (!props.edit) {
        window.open(resolveMediaUrl(props.value), "_blank");
      } else {
        if (props.edit.oldValue) {
          window.open(resolveMediaUrl(props.edit.oldValue), "_blank");
        } else {
          fileInput.current?.click();
        }
      }
    } else {
      fileInput.current?.click();
    }
  }

  return (
    <>
      <input
        type="file"
        className="hidden"
        // Only accept anything except images
        accept="application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ref={fileInput}
        onChange={uploadHandler}
      />
      <div className="flex border border-gray-800 border-input rounded-md overflow-hidden h-12">
        <div
          className={`${
            props.value && !props.edit ? "bg-primary" : "bg-gray-700"
          } w-40 flex items-center justify-center cursor-pointer`}
          onClick={handleClickAction}
        >
          <p className="text-white text-sm">
            {(props.value && !props.edit) ||
            (props.value && props.edit?.oldValue)
              ? "Open Preview"
              : "Attach File"}
          </p>
        </div>
        <div className="w-full h-12 bg-gray-100 flex justify-between items-center px-4">
          <p className="text-gray-600 text-sm">
            {props.value
              ? props.value.replace("public/", "")
              : "No file selected"}
          </p>
          {((props.value && !props.edit) ||
            (props.value && props.edit?.oldValue)) && (
            <IoClose
              className="text-red-500 text-2xl cursor-pointer"
              onClick={removeFile}
            />
          )}
        </div>
      </div>
    </>
  );
};

FileInput.displayName = "FileInput";

export { FileInput };
