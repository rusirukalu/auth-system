import { Navbar } from '@/components/ui/Navbar';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 border-t-4 border-primary-dark rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-xl font-medium">Loading...</p>
        </div>
      </main>
    </div>
  );
}
