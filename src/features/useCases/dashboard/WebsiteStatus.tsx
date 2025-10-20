import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import "@aws-amplify/ui-react/styles.css";
import { useDashboardContext } from "@/features/domain/context/dashboard";
import { resolveMediaUrl } from "@/lib/media";

const WebsiteStatus = () => {
  const { data } = useDashboardContext();
  const record = data?.records[0];

  if (!record) {
    return null;
  }

  const page = record.website.pages[0];

  return (
    <Card className="rounded-sm mt-5">
      <CardHeader>
        <CardTitle className="text-lg">Website Status</CardTitle>
        <CardDescription>
          Displays the current status of the website including uptime and
          performance metrics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full rounded-md border h-[500px]">
          <img src={resolveMediaUrl(page.screenshot)} alt="" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WebsiteStatus;
