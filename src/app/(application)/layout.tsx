// PROVIDERS
import { CommandProvider } from '@/src/components/provider/command-menu-provider';
// LAYOUTS
import SidebarLayout from '@/src/components/layout/sidebar-layout';
// COMPONENTS
import { SearchBar } from '@/src/components/molecules/search-bar';

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommandProvider>
      <SidebarLayout>
        <SearchBar />
        {children}
      </SidebarLayout>
    </CommandProvider>
  );
};

export default ApplicationLayout;
