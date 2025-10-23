import '../globals.css'; // This imports our empty CSS file
import Sidebar from '../../components/Sidebar';

export default function DashboardLayout({
  children, // 'children' will be our dashboard/page.tsx
}: {
  children: React.ReactNode;
}) {
  return (
    // We add a <head> tag here to load the styles FOR THIS PAGE
    <>
      <head>
        {/* This is the CDN fix, applied to the dashboard */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      
      {/* This is our dark layout */}
      <div className="h-screen w-full bg-gray-950 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
}