import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Calendar, BookOpen, 
  MessageSquare, Settings, ExternalLink, LogOut, 
  Menu, X, Music 
} from 'lucide-react';
import { TeacherSettings, ContactInquiry } from '../../types';

export type AdminTab = 'dashboard' | 'students' | 'calendar' | 'pedagogy' | 'inquiries' | 'settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onExitAdmin: () => void;
  onLogout: () => void;
  settings: TeacherSettings;
  inquiries: ContactInquiry[];
  studentsCount: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  onExitAdmin,
  onLogout,
  settings,
  inquiries,
  studentsCount,
  children
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'students' as AdminTab, label: 'Élèves', icon: Users, badge: studentsCount },
    { id: 'calendar' as AdminTab, label: 'Emploi du temps', icon: Calendar },
    { id: 'pedagogy' as AdminTab, label: 'Suivi pédagogique', icon: BookOpen },
    { id: 'inquiries' as AdminTab, label: 'Demandes reçues', icon: MessageSquare, badge: pendingInquiriesCount > 0 ? pendingInquiriesCount : undefined, badgeAlert: pendingInquiriesCount > 0 },
    { id: 'settings' as AdminTab, label: 'Paramètres & Tarifs', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E8E2D8] sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <span className="font-serif-display font-medium text-lg text-[#1E1B18]">
            Atelier Piano
          </span>
          <span className="text-[10px] px-2 py-0.5 bg-[#FAF3EA] text-[#B0824B] rounded-full border border-[#E8DFC8] font-medium">
            Admin
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#5A544D] hover:text-[#1E1B18]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`w-full md:w-64 bg-white border-r border-[#E8E2D8] flex flex-col justify-between shrink-0 z-20 ${
          mobileMenuOpen ? 'block' : 'hidden md:flex'
        }`}
      >
        <div>
          {/* Logo / Brand Header */}
          <div className="p-6 border-b border-[#E8E2D8]">
            <span className="font-serif-display text-xl font-medium text-[#1E1B18] block">
              Atelier Piano
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-[#7A7369]">
                Espace Enseignant
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#1E1B18] text-white shadow-xs'
                      : 'text-[#5A544D] hover:text-[#1E1B18] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#DFC79D]' : 'text-[#8A8275]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      item.badgeAlert
                        ? 'bg-amber-500 text-white'
                        : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#FAF8F5] text-[#7A7369] border border-[#E8E2D8]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-[#E8E2D8] space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#3A3530] bg-[#FAF8F5] border border-[#D8D1C7] hover:bg-[#F2ECE3] rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#B0824B]" />
            <span>Voir le site public</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-[#7A7369] hover:text-red-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Desktop Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-[#E8E2D8]">
          <div className="text-xs text-[#7A7369]">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1E1B18] bg-[#FAF8F5] border border-[#D8D1C7] rounded-lg hover:bg-[#F2ECE3] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#B0824B]" />
              <span>Voir le site public</span>
            </button>

            <button
              onClick={onLogout}
              className="p-1.5 text-[#7A7369] hover:text-red-600 transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};
