import { SidebarItem } from "./SidebarItem";

export const SidebarSection = ({
  title,
  items,
  collapsed,
}: {
  title: string;
  items: { path: string; label: string; icon: React.ReactNode }[];
  collapsed: boolean;
}) => (
  <div className="mb-4">
    {!collapsed && (
      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 mt-4 px-3">
        {title}
      </h3>
    )}
    {items.map((item) => (
      <SidebarItem
        key={item.path}
        to={item.path}
        icon={item.icon}
        label={item.label}
        collapsed={collapsed}
      />
    ))}
  </div>
);