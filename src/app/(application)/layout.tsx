import SidebarLayout from '@/src/components/layout/sidebar-layout';

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default ApplicationLayout;
