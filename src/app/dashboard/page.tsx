import "@/App.css";
import { LoremIpsum } from "react-lorem-ipsum";

/**
 * DashboardPage component displays the main dashboard content.
 */
export function DashboardPage() {
  return (
    <div className="space-y-4">
      <LoremIpsum p={10} />
    </div>
  );
}

// Default export for lazy loading
export default DashboardPage;
