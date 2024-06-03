import { Outlet } from "react-router-dom";

function SettingsPageLayout() {
  return (
    <div className="max-w-6xl mx-auto px-8">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export { SettingsPageLayout };
