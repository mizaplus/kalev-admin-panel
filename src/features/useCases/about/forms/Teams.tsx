import * as React from "react";

// UI Components
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Director from "./_partails/Director";
import Members from "./_partails/Members";

const Team: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="!font-medium mt-3 !text-sm"
        >
          Edit Team
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-screen w-screen overflow-y-auto pb-5"
      >
        <div className="max-w-7xl w-full mx-auto">
          <SheetHeader>
            <SheetTitle>Edit Team</SheetTitle>
            <SheetDescription>
              Modify your team&apos;s information and details here.
            </SheetDescription>
          </SheetHeader>
          <Tabs defaultValue="director" className="px-4">
            <TabsList>
              <TabsTrigger value="director">Director</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
            <TabsContent value="director">
              <Director />
            </TabsContent>
            <TabsContent value="members">
              <Members />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Team;
