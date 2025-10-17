// Hooks
import React, { useRef } from "react";

// Utils

// UI Components
import { Label } from "./label";
import {
  IoCameraOutline,
  IoCloudUpload,
  IoTrashBinOutline,
} from "react-icons/io5";
import { remove, uploadData } from "aws-amplify/storage";
import { generateFileName } from "@/lib/utils";
import { toast } from "sonner";
import { resolveMediaUrl } from "@/lib/media";
import { Progress } from "./progress";
import { Spinner } from "./spinner";

interface ImageUploaderProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  notBg?: boolean;
  edit?:
    | false
    | {
        setOldValue: (value: string) => void;
        oldValue: string;
      };
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const uploadEl = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = React.useState<number>(0);
  const [uploading, setUploading] = React.useState<boolean>(false);

  function uploadHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    toast.promise(
      uploadData({
        path: `public/${generateFileName(files[0].name)}`,
        data: files[0],
        options: {
          onProgress(event) {
            setUploading(true);
            const { transferredBytes, totalBytes } = event;
            if (totalBytes) {
              setProgress(Math.round((transferredBytes / totalBytes) * 100));
            }
          },
        },
      }).result,
      {
        success: (data) => {
          const key = data.path;
          if (props.edit) {
            props.edit.setOldValue(props.value);
            props.setValue(key);
          }
          return "File uploaded successfully";
        },
        error: "Upload failed, try again",
        loading: "Uploading file, please wait",
        finally: () => {
          e.target.value = "";
          setUploading(false);
          setProgress(0);
        },
      },
    );
  }

  function removeFile() {
    toast.promise(
      remove({
        path: props.value.replace("public/", ""),
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

  const actionHandler = () => {
    if (props.disabled) return;

    if (!props.value || (props.value && props.edit && !props.edit.oldValue)) {
      uploadEl.current?.click();
      return;
    }

    removeFile();
  };

  return (
    <div className={`h-full flex flex-col`}>
      <Label>{props.label}</Label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={uploadHandler.bind(this)}
        ref={uploadEl}
      />
      <div
        className={`mt-4 border border-dashed w-full sm:flex-1 relative duration-300 max-sm:h-44 flex items-center justify-center sm:min-h-[300px] ${
          !props.value
            ? "bg-gray-200 bg-opacity-60"
            : props.notBg && "bg-primary"
        }`}
      >
        {uploading ? (
          <div className="h-full w-full absolute flex flex-col items-center justify-center gap-4 bg-muted px-4">
            {progress ? (
              <>
                <Progress value={progress} />
                <p className="text-gray-700">Uploading... {progress}%</p>
              </>
            ) : (
              <>
                <Spinner className="size-10" />
              </>
            )}
          </div>
        ) : (
          <>
            {props.value ? (
              <>
                <div
                  className="absolute z-10 h-10 w-10 bg-white rounded-full right-2 top-2 cursor-pointer flex items-center justify-center group"
                  onClick={actionHandler}
                >
                  {props.edit && !props.edit.oldValue && (
                    <IoCloudUpload className="duration-300 text-gray-900 group-hover:text-primary" />
                  )}
                  {((props.edit && props.edit.oldValue) || !props.edit) && (
                    <IoTrashBinOutline className="duration-300 text-gray-900 text-[22px] group-hover:text-red-500" />
                  )}
                </div>
                <img
                  src={resolveMediaUrl(props.value)}
                  alt=""
                  className={`${
                    props.notBg
                      ? "h-[130px] object-scale-down brightness-0 invert"
                      : "object-cover"
                  } object-center w-full h-full absolute`}
                />
              </>
            ) : (
              <div
                className="cursor-pointer flex flex-col gap-2 group items-center justify-center"
                onClick={actionHandler}
              >
                <IoCameraOutline className="text-gray-600 text-4xl" />
                <p className="text-sm text-gray-500">Click to attach photo.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
