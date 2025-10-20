// Hooks
// import { useDashboardContext } from "@/features/domain/context/dashboard";

// UI Components
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardContext } from "@/features/domain/context/dashboard";
import { cn } from "@/lib/utils";
import { BsDatabase, BsGlobe } from "react-icons/bs";
import { FaServer } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDangerous } from "react-icons/md";
import { BsTools } from "react-icons/bs";

const AnalyticsCards = () => {
  const { data } = useDashboardContext();
  const record = data?.records[0];

  if (!record) {
    return null;
  }

  const stats = [
    {
      title: "Database",
      icon: BsDatabase,
      value: (
        <p className="text-2xl">
          {(record.db.tableSizeBytes / (1024 * 1024)).toFixed(2)}{" "}
          <span className="text-sm">mb / 500 mb</span>
        </p>
      ),
      footer: (
        <div className="flex items-center justify-between py-2 border-t px-6">
          <div className="flex items-center gap-2">
            {record.db.active ? (
              <FaCircleCheck className="text-green-500" />
            ) : (
              <MdDangerous className="text-red-500" />
            )}
            <span className="text-xs font-medium text-muted-foreground">
              {record.db.active ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      ),
      color: "bg-orange-500",
    },
    {
      title: "Media Store",
      icon: FaServer,
      value: (
        <p className="text-2xl">
          {(record.s3.totalSizeBytes / (1024 * 1024)).toFixed(2)}{" "}
          <span className="text-sm">mb / 500 mb</span>
        </p>
      ),
      footer: (
        <div className="flex items-center justify-between py-2 border-t px-6">
          <div className="flex items-center gap-2">
            <FaCircleCheck className="text-green-500" />
            <span className="text-xs font-medium text-muted-foreground">
              Connected
            </span>
          </div>
        </div>
      ),
      color: "bg-blue-500",
    },
    {
      title: "Wesite Status",
      icon: BsGlobe,
      value: (
        <p className="text-2xl">
          {record.website.speed ? "Online" : "Offline"}
        </p>
      ),
      footer: (
        <div className="flex items-center justify-between py-2 border-t px-6">
          <div className="flex items-center gap-2">
            {record.website.speed ? (
              <FaCircleCheck className="text-green-500" />
            ) : (
              <MdDangerous className="text-red-500" />
            )}
            <span className="text-xs font-medium text-muted-foreground">
              {record.website.speed ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      ),
      color: "bg-teal-500",
    },
    {
      title: "Programs",
      icon: BsTools,
      value: (
        <p className="text-2xl">
          {record.db.programsCount} <span className="text-sm">active</span>
        </p>
      ),
      footer: (
        <div className="flex items-center justify-between py-2 border-t px-6">
          <div className="flex items-center gap-2">
            {record.website.speed ? (
              <FaCircleCheck className="text-green-500" />
            ) : (
              <MdDangerous className="text-red-500" />
            )}
            <span className="text-xs font-medium text-muted-foreground">
              {record.website.speed ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      ),
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card className="py-0 gap-0 rounded-sm">
          <CardContent className="flex items-center gap-2 justify-between py-3">
            <div
              className={cn(
                "size-16 flex items-center justify-center rounded-full",
                stat.color,
              )}
            >
              <stat.icon className="size-6 text-white" />
            </div>
            <div className="flex flex-col items-end">
              <h4 className="text-sm font-semibold">{stat.title}</h4>
              {stat.value}
            </div>
          </CardContent>
          {stat.footer}
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsCards;
