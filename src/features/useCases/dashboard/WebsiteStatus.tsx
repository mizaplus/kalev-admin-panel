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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const WebsiteStatus = () => {
  const { data } = useDashboardContext();
  const record = data?.records[0];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!record) {
    return null;
  }

  const page = record.website.pages[activeIndex];

  const pageOptions = record.website.pages.map((page, index) => ({
    label: page.url.replace(/^(https?:\/\/)?(www\.)?/, ""),
    value: index.toString(),
  }));

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
        <div className="my-4">
          <Select
            value={activeIndex.toString()}
            onValueChange={(value) => setActiveIndex(parseInt(value))}
          >
            <SelectTrigger className="w-[500px] !text-sm">
              <SelectValue placeholder="Select a webpage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Website Pages</SelectLabel>
                {pageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="w-full rounded-md border h-[800px]">
          <img src={resolveMediaUrl(page.screenshot)} alt="" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WebsiteStatus;
