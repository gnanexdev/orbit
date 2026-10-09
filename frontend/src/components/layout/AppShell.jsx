import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

export const AppShell = () => {
  return (
    <div className="app-shell flex h-screen w-full overflow-hidden bg-canvas text-primary">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileNav />

      {/* Main App Container */}
      <div className="app-main flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Persistent Topbar */}
        <Topbar />

        {/* Dynamic Route Content */}
        <main className="app-content flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          <div className="app-content-inner max-w-7xl mx-auto w-full">
            <Outlet />
            <footer className="app-footer">
              <span>ORBIT Workspace</span>
              <span className="app-footer__status"><span /> All systems operational</span>
              <span className="app-footer__version">Private workspace</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};
