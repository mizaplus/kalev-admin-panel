// UI Components
import InvolvementSections from "../useCases/involvement/EditableSections";
import { InvolvementProvider } from "../domain/context/involvement-context";

// Utils
// (none needed)

// Types
// (none needed)

const GetInvolvedPage = () => {
  return (
    <InvolvementProvider>
      <div>
        <h1 className="text-lg font-semibold">Get Involved</h1>
        <p className="text-sm">
          Make a difference by donating, volunteering, or partnering with Kalev
          Child Care Foundation.
        </p>
        <InvolvementSections />
      </div>
    </InvolvementProvider>
  );
};

export default GetInvolvedPage;
