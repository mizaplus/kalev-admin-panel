import AboutProvider, {
  useAboutContext,
} from "@/features/domain/context/about-context";

function AboutContent() {
  const { data, loading } = useAboutContext();
  if (loading || !data) {
    return (
      <div className="py-20 text-center text-muted-foreground">Loading...</div>
    );
  }
  const { hero, story, info, team } = data;
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-4 py-8">
        <img
          src={hero.image}
          alt={hero.title}
          className="rounded-xl w-full max-w-2xl object-cover h-64"
        />
        <h1 className="text-3xl font-bold text-primary mt-4">{hero.title}</h1>
        <p className="text-lg text-muted-foreground">{hero.tagline}</p>
      </section>

      {/* Story Section */}
      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          {story.title}
        </h2>
        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: story.content.replace(/\n/g, "<br/>"),
          }}
        />
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-bold text-foreground">Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-primary">Vision</h3>
            <p className="text-muted-foreground">
              {info.mission_vision.vision}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">Mission</h3>
            <p className="text-muted-foreground">
              {info.mission_vision.mission}
            </p>
          </div>
        </div>
        <div
          className="prose prose-neutral dark:prose-invert max-w-none mt-4"
          dangerouslySetInnerHTML={{
            __html: info.objectives.content.replace(/\n/g, "<br/>"),
          }}
        />
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-xl font-bold text-foreground">Our Team</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Director */}
          <div className="flex flex-col items-center md:w-1/3">
            <img
              src={team.director.image}
              alt={team.director.name}
              className="rounded-full w-32 h-32 object-cover border-2 border-primary"
            />
            <h3 className="mt-3 text-lg font-semibold text-primary">
              {team.director.name}
            </h3>
            <div
              className="prose prose-neutral dark:prose-invert text-sm mt-2"
              dangerouslySetInnerHTML={{
                __html: team.director.content.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
          {/* Members */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {team.members.map((member) => (
              <div
                key={member.key.SK}
                className="flex items-center gap-4 bg-muted/50 rounded-lg p-4"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-16 h-16 object-cover border"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {member.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <AboutProvider>
      <AboutContent />
    </AboutProvider>
  );
}
