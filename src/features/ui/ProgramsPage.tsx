import ProgramsProvider from "../domain/context/programs-context";
import EditableSections from "../useCases/programs/EditableSections";

const ProgramsPage = () => {
  return (
    <ProgramsProvider>
      <div>
        <h1 className="text-lg font-semibold">Programs</h1>
        <p className="text-sm">
          Explore our programs, initiatives, and ways to get involved at{" "}
          <a
            href="https://kalevchild.org/programs"
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-blue-500 underline"
          >
            kalevchild.org/programs
          </a>
          .
        </p>
      </div>
      <EditableSections />
    </ProgramsProvider>
  );
};

export default ProgramsPage;
