import { useAboutContext } from "@/features/domain/context/about-context";
import { resolveMediaUrl } from "@/lib/media";
import { cleanupHtmlString } from "@/lib/utils";

const Preview = () => {
  const { data } = useAboutContext();

  return (
    <div className="p-8 border border-gray-200 rounded-md">
      <h4 className="text-4xl font-bold text-center">
        <span className="text-primary">Our</span> Team
      </h4>
      <div className="h-0.5 w-20 bg-primary mx-auto mb-10 mt-2" />
      <div className="flex flex-col justify-center">
        <div className="size-72 aspect-square rounded-md relative overflow-hidden mx-auto">
          <img
            src={resolveMediaUrl(data?.team.director.image)}
            className="object-cover object-center"
            alt=""
          />
        </div>
        <h3 className="text-xl font-semibold mt-4 text-center">
          <span className="text-primary">CEO/Director:</span>{" "}
          {data?.team.director.name}
        </h3>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{
            __html: cleanupHtmlString(data?.team.director.content || ""),
          }}
        />
      </div>
      <div className="grid lg:grid-cols-4 gap-10 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
        {data?.team.members.map((member, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-md overflow-hidden relative"
          >
            <div className="h-64 bg-gray-100/50 relative">
              <img
                src={resolveMediaUrl(member.image)}
                className="object-cover object-center w-full h-full"
                alt=""
              />
            </div>
            <div className="p-5">
              <h5 className="font-semibold">{member.name}</h5>
              <p className="text-sm text-primary font-semibold">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
