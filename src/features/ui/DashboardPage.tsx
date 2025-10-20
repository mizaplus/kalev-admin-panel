import DashboardProvider from "../domain/context/dashboard";
import AnalyticsCards from "../useCases/dashboard/AnalyticsCards";
import WebsiteStatus from "../useCases/dashboard/WebsiteStatus";

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <AnalyticsCards />
      <WebsiteStatus />
    </DashboardProvider>
  );
}
