import React, { useState, useEffect } from 'react';
import { 
  getStoredStudents, saveStudents,
  getStoredLogs, saveLogs,
  getStoredSchedule, saveSchedule,
  getStoredInquiries, saveInquiries,
  getStoredSettings, saveSettings,
  checkIsAdminAuthenticated, setAdminAuthenticated
} from './utils/storage';
import { 
  Student, PedagogicalLog, ScheduleEvent, 
  ContactInquiry, TeacherSettings 
} from './types';

// Public Components
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { MethodSection } from './components/public/MethodSection';
import { CoursesSection } from './components/public/CoursesSection';
import { PricingSection } from './components/public/PricingSection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { AboutSection } from './components/public/AboutSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { LegalModal } from './components/public/LegalModal';

// Admin Components
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { DashboardView } from './components/admin/DashboardView';
import { StudentsView } from './components/admin/StudentsView';
import { StudentDetailModal } from './components/admin/StudentDetailModal';
import { StudentFormModal } from './components/admin/StudentFormModal';
import { CalendarView } from './components/admin/CalendarView';
import { ScheduleEventModal } from './components/admin/ScheduleEventModal';
import { PedagogicalTrackerView } from './components/admin/PedagogicalTrackerView';
import { PedagogicalLogModal } from './components/admin/PedagogicalLogModal';
import { InquiriesView } from './components/admin/InquiriesView';
import { SettingsView } from './components/admin/SettingsView';

export default function App() {
  // Persistence state
  const [students, setStudents] = useState<Student[]>(getStoredStudents);
  const [logs, setLogs] = useState<PedagogicalLog[]>(getStoredLogs);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>(getStoredSchedule);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(getStoredInquiries);
  const [settings, setSettings] = useState<TeacherSettings>(getStoredSettings);

  // Authentication & View Mode
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(checkIsAdminAuthenticated);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Modals state
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);
  const [studentFormModalOpen, setStudentFormModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

  const [pedagogicalLogModalOpen, setPedagogicalLogModalOpen] = useState(false);
  const [preselectedStudentIdForLog, setPreselectedStudentIdForLog] = useState<string | undefined>(undefined);

  const [scheduleEventModalOpen, setScheduleEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<ScheduleEvent | null>(null);
  const [preselectedDateForEvent, setPreselectedDateForEvent] = useState<string | undefined>(undefined);

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'cgu' | 'mentions' | 'privacy'>('cgu');

  // Public interaction states
  const [preselectedFormula, setPreselectedFormula] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('accueil');

  // Sync state to local storage
  useEffect(() => {
    saveStudents(students);
  }, [students]);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  useEffect(() => {
    saveSchedule(scheduleEvents);
  }, [scheduleEvents]);

  useEffect(() => {
    saveInquiries(inquiries);
  }, [inquiries]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Handle intersection observer for public nav
  useEffect(() => {
    if (isAdminView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [isAdminView]);

  // Auth handlers
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAdminAuthenticated(true);
    setAdminLoginModalOpen(false);
    setIsAdminView(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminAuthenticated(false);
    setIsAdminView(false);
  };

  // Student operations
  const handleSaveStudent = (savedStudent: Student) => {
    setStudents((prev) => {
      const exists = prev.some(s => s.id === savedStudent.id);
      if (exists) {
        return prev.map(s => s.id === savedStudent.id ? savedStudent : s);
      }
      return [savedStudent, ...prev];
    });

    // Also update selected student if open in detail modal
    if (selectedStudentForDetail && selectedStudentForDetail.id === savedStudent.id) {
      setSelectedStudentForDetail(savedStudent);
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    if (selectedStudentForDetail?.id === studentId) {
      setSelectedStudentForDetail(null);
    }
  };

  // Log operations
  const handleSaveLog = (savedLog: PedagogicalLog) => {
    setLogs(prev => [savedLog, ...prev]);
  };

  // Schedule event operations
  const handleSaveScheduleEvent = (savedEvent: ScheduleEvent) => {
    setScheduleEvents((prev) => {
      const exists = prev.some(e => e.id === savedEvent.id);
      if (exists) {
        return prev.map(e => e.id === savedEvent.id ? savedEvent : e);
      }
      return [savedEvent, ...prev];
    });
  };

  const handleDeleteScheduleEvent = (eventId: string) => {
    setScheduleEvents(prev => prev.filter(e => e.id !== eventId));
  };

  // Inquiry operations
  const handleNewPublicInquiry = (inq: ContactInquiry) => {
    setInquiries(prev => [inq, ...prev]);
  };

  const handleUpdateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const handleConvertInquiryToStudent = (inquiry: ContactInquiry) => {
    // Open student form modal pre-filled with inquiry details
    const formulaKey = inquiry.formula.includes('30') ? '30min' : inquiry.formula.includes('60') || inquiry.formula.includes('heure') ? '60min' : '45min';

    setStudentToEdit({
      id: `eleve-${Date.now()}`,
      firstName: inquiry.firstName,
      lastName: inquiry.lastName,
      birthDate: '2000-01-01',
      phone: inquiry.phone,
      email: inquiry.email,
      address: '',
      isMinor: inquiry.profile.toLowerCase().includes('enfant'),
      parentContact: inquiry.profile.toLowerCase().includes('parent') ? {
        name: `${inquiry.firstName} ${inquiry.lastName}`,
        relationship: 'Parent',
        phone: inquiry.phone,
        email: inquiry.email
      } : undefined,
      level: inquiry.level,
      startDate: new Date().toISOString().split('T')[0],
      formula: formulaKey as any,
      pricePerYear: '[À RENSEIGNER]',
      paymentStatus: 'up_to_date',
      paymentNotes: 'Inscrit suite à demande en ligne',
      habitualSlot: 'À convenir',
      goals: [],
      currentPieces: [],
      pastPieces: [],
      pedagogicalNotes: `Demande d'origine : ${inquiry.message}`,
      observations: `Âge indiqué : ${inquiry.age}`,
      absencesCount: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    });

    setStudentFormModalOpen(true);
    handleUpdateInquiryStatus(inquiry.id, 'registered');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] font-sans">
      
      {/* Conditionally render Admin Panel or Public Showcase */}
      {isAdminView && isAdminLoggedIn ? (
        <AdminLayout
          currentTab={adminTab}
          onTabChange={setAdminTab}
          onExitAdmin={() => setIsAdminView(false)}
          onLogout={handleAdminLogout}
          settings={settings}
          inquiries={inquiries}
          studentsCount={students.length}
        >
          {adminTab === 'dashboard' && (
            <DashboardView
              students={students}
              logs={logs}
              scheduleEvents={scheduleEvents}
              inquiries={inquiries}
              onOpenNewStudent={() => {
                setStudentToEdit(null);
                setStudentFormModalOpen(true);
              }}
              onOpenNewLog={(studentId) => {
                setPreselectedStudentIdForLog(studentId);
                setPedagogicalLogModalOpen(true);
              }}
              onOpenNewScheduleEvent={() => {
                setEventToEdit(null);
                setPreselectedDateForEvent(undefined);
                setScheduleEventModalOpen(true);
              }}
              onSelectStudent={(st) => setSelectedStudentForDetail(st)}
              onGoToTab={setAdminTab}
            />
          )}

          {adminTab === 'students' && (
            <StudentsView
              students={students}
              onOpenNewStudent={() => {
                setStudentToEdit(null);
                setStudentFormModalOpen(true);
              }}
              onSelectStudent={(st) => setSelectedStudentForDetail(st)}
              onEditStudent={(st) => {
                setStudentToEdit(st);
                setStudentFormModalOpen(true);
              }}
              onAddLogForStudent={(studentId) => {
                setPreselectedStudentIdForLog(studentId);
                setPedagogicalLogModalOpen(true);
              }}
            />
          )}

          {adminTab === 'calendar' && (
            <CalendarView
              events={scheduleEvents}
              students={students}
              onOpenNewEvent={(date) => {
                setEventToEdit(null);
                setPreselectedDateForEvent(date);
                setScheduleEventModalOpen(true);
              }}
              onEditEvent={(evt) => {
                setEventToEdit(evt);
                setScheduleEventModalOpen(true);
              }}
              onSelectStudent={(st) => setSelectedStudentForDetail(st)}
            />
          )}

          {adminTab === 'pedagogy' && (
            <PedagogicalTrackerView
              logs={logs}
              students={students}
              onOpenNewLog={(studentId) => {
                setPreselectedStudentIdForLog(studentId);
                setPedagogicalLogModalOpen(true);
              }}
              onSelectStudent={(st) => setSelectedStudentForDetail(st)}
            />
          )}

          {adminTab === 'inquiries' && (
            <InquiriesView
              inquiries={inquiries}
              onUpdateStatus={handleUpdateInquiryStatus}
              onConvertToStudent={handleConvertInquiryToStudent}
            />
          )}

          {adminTab === 'settings' && (
            <SettingsView
              settings={settings}
              onSaveSettings={setSettings}
            />
          )}
        </AdminLayout>
      ) : (
        /* PUBLIC SHOWCASE WEBSITE */
        <div className="flex flex-col min-h-screen">
          <Navbar
            onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onGoToAdmin={() => setIsAdminView(true)}
            activeSection={activeSection}
          />

          <main className="flex-1">
            <HeroSection
              settings={settings}
              onExploreCourses={() => {
                const el = document.getElementById('cours');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onContactClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <MethodSection />

            <CoursesSection />

            <PricingSection
              settings={settings}
              onSelectFormula={(formulaName) => {
                setPreselectedFormula(formulaName);
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <TestimonialsSection />

            <AboutSection
              settings={settings}
              onContactClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <ContactSection
              settings={settings}
              preselectedFormula={preselectedFormula}
              onNewInquiry={handleNewPublicInquiry}
            />
          </main>

          <Footer
            settings={settings}
            onOpenLegal={(tab) => {
              setLegalModalTab(tab);
              setLegalModalOpen(true);
            }}
            onOpenAdminLogin={() => setAdminLoginModalOpen(true)}
            isAdminLoggedIn={isAdminLoggedIn}
            onGoToAdmin={() => setIsAdminView(true)}
          />
        </div>
      )}

      {/* MODALS */}
      {/* 1. Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* 2. Student Full Detail Modal (Fiche Individuelle) */}
      <StudentDetailModal
        student={selectedStudentForDetail}
        logs={logs}
        onClose={() => setSelectedStudentForDetail(null)}
        onEditStudent={(st) => {
          setStudentToEdit(st);
          setStudentFormModalOpen(true);
        }}
        onDeleteStudent={handleDeleteStudent}
        onAddLogForStudent={(studentId) => {
          setPreselectedStudentIdForLog(studentId);
          setPedagogicalLogModalOpen(true);
        }}
      />

      {/* 3. Student Form Modal (Add / Edit) */}
      <StudentFormModal
        isOpen={studentFormModalOpen}
        studentToEdit={studentToEdit}
        onClose={() => {
          setStudentFormModalOpen(false);
          setStudentToEdit(null);
        }}
        onSave={handleSaveStudent}
      />

      {/* 4. Pedagogical Log Modal (New Lesson Note) */}
      <PedagogicalLogModal
        isOpen={pedagogicalLogModalOpen}
        students={students}
        preselectedStudentId={preselectedStudentIdForLog}
        onClose={() => {
          setPedagogicalLogModalOpen(false);
          setPreselectedStudentIdForLog(undefined);
        }}
        onSaveLog={handleSaveLog}
      />

      {/* 5. Schedule Event Modal (Calendar) */}
      <ScheduleEventModal
        isOpen={scheduleEventModalOpen}
        eventToEdit={eventToEdit}
        students={students}
        preselectedDate={preselectedDateForEvent}
        onClose={() => {
          setScheduleEventModalOpen(false);
          setEventToEdit(null);
          setPreselectedDateForEvent(undefined);
        }}
        onSave={handleSaveScheduleEvent}
        onDelete={handleDeleteScheduleEvent}
      />

      {/* 6. Legal Notices Modal (CGU, Mentions, Privacy) */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        defaultTab={legalModalTab}
      />

    </div>
  );
}
