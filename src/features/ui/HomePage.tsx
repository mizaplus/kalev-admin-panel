// Context
import HomepageProvider from "../domain/context/homepage-context";
import EditableSections from "../useCases/home/EditableSections";

const HomePage = () => {
  return (
    <HomepageProvider>
      <div>
        <h1 className="text-lg font-semibold">Home Page</h1>
        <p className="text-sm">
          Edit the details that will appear on the homepage of{" "}
          <a href="https://kalevchild.org" className="text-blue-500 underline">
            kalev.io
          </a>
          . This includes welcome section, messages and images.
        </p>
        <EditableSections />
      </div>
    </HomepageProvider>
  );
};

export default HomePage;
