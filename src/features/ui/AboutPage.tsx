// Context
import AboutProvider from "../domain/context/about-context";
import AboutSections from "../useCases/about/EditableSections";

const AboutPage = () => {
  return (
    <AboutProvider>
      <div>
        <h1 className="text-lg font-semibold">About Page</h1>
        <p className="text-sm">
          Learn more about our story, mission, vision, objectives, and team at
          Kalev Child Care Foundation.
        </p>
        <AboutSections />
      </div>
    </AboutProvider>
  );
};

export default AboutPage;
