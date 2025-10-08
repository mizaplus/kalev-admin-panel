import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import { Label } from "./label";
import { Input } from "./input";

const ImageUploader: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => {
  return (
    <>
      <Label htmlFor="hero-image" className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id="hero-image"
        value={value}
        className="w-full"
      />
      <FileUploader
        acceptedFileTypes={["image/*"]}
        path="public/"
        maxFileCount={1}
        onUploadSuccess={(file) => {
          console.log("File uploaded:", file);
          onChange(file.key || "");
        }}
        isResumable
      />
    </>
  );
};

export default ImageUploader;
