import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from "@aws-amplify/ui-react-storage/browser";

const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

const Browser = () => {
  return (
    <>
      <StorageBrowser />
    </>
  );
};

export default Browser;
