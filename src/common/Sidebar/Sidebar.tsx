import { sidebarData } from "./sidebarData";
import { SidebarItem } from "./SidebarItem";

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#E8FEF3] border-r border-gray-200 px-4 py-6 text-gray-800">
      {sidebarData.map((section, index) => (
        <div key={index} className="mb-6">
          <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide uppercase">
            {section.section}
          </p>
          <nav className="space-y-1">
            {section.items.map((item) => (
              <SidebarItem
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                collapsed={false}
              />
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
};