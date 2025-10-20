import DashboardProvider from "../domain/context/dashboard";
import AnalyticsCards from "../useCases/dashboard/AnalyticsCards";

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <AnalyticsCards />
    </DashboardProvider>
  );
}
