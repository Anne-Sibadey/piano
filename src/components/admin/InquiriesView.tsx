import React from 'react';
import { 
  MessageSquare, UserPlus, Mail, Phone, Clock, 
  Check, Archive, CheckCircle2 
} from 'lucide-react';
import { ContactInquiry, Student } from '../../types';

interface InquiriesViewProps {
  inquiries: ContactInquiry[];
  onUpdateStatus: (inquiryId: string, status: ContactInquiry['status']) => void;
  onConvertToStudent: (inquiry: ContactInquiry) => void;
}

export const InquiriesView: React.FC<InquiriesViewProps> = ({
  inquiries,
  onUpdateStatus,
  onConvertToStudent
}) => {
  const sortedInquiries = [...inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div>
        <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1E1B18] font-medium">
          Demandes de Contact & Inscription
        </h2>
        <p className="text-xs sm:text-sm text-[#7A7369] mt-0.5">
          Messages reçus via le formulaire public du site internet
        </p>
      </div>

      {/* Inquiries Cards */}
      {sortedInquiries.length > 0 ? (
        <div className="space-y-4">
          {sortedInquiries.map((inq) => (
            <div
              key={inq.id}
              className={`p-6 bg-white rounded-2xl border transition-all space-y-4 ${
                inq.status === 'new'
                  ? 'border-[#B0824B] shadow-sm ring-1 ring-[#B0824B]/20'
                  : 'border-[#E8E2D8]'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F2ECE3] gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center font-serif-display font-semibold text-lg">
                    {inq.firstName[0]}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">
                      {inq.firstName} {inq.lastName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A7369] mt-0.5">
                      <span>{inq.profile}</span>
                      <span>·</span>
                      <span>{inq.age}</span>
                      <span>·</span>
                      <span className="font-medium text-[#B0824B]">{inq.formula}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    inq.status === 'new'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : inq.status === 'contacted'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : inq.status === 'registered'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    {inq.status === 'new' ? 'Nouveau' : inq.status === 'contacted' ? 'Contacté' : inq.status === 'registered' ? 'Inscrit' : 'Archivé'}
                  </span>
                  <span className="text-xs text-[#8A8275]">
                    Reçu le {inq.createdAt}
                  </span>
                </div>
              </div>

              {/* Contacts & Level */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#FAF8F5] rounded-xl text-xs text-[#5A544D]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#B0824B] shrink-0" />
                  <a href={`tel:${inq.phone}`} className="font-medium hover:underline text-[#1E1B18]">
                    {inq.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#B0824B] shrink-0" />
                  <a href={`mailto:${inq.email}`} className="hover:underline">
                    {inq.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#8A8275]">Niveau : </span>
                  <span className="font-medium text-[#1E1B18]">{inq.level}</span>
                </div>
              </div>

              {/* Message Body */}
              {inq.message && (
                <div className="text-xs sm:text-sm text-[#4A443E] leading-relaxed p-3 bg-white border border-[#E8E2D8] rounded-xl">
                  « {inq.message} »
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {inq.status === 'new' && (
                    <button
                      onClick={() => onUpdateStatus(inq.id, 'contacted')}
                      className="px-3 py-1.5 text-xs font-medium text-[#1E1B18] bg-[#FAF8F5] border border-[#D8D1C7] rounded-lg hover:bg-[#F2ECE3] transition-colors"
                    >
                      Marquer comme contacté
                    </button>
                  )}

                  {inq.status !== 'archived' && (
                    <button
                      onClick={() => onUpdateStatus(inq.id, 'archived')}
                      className="px-3 py-1.5 text-xs text-[#7A7369] hover:text-[#1E1B18] rounded-lg hover:bg-[#FAF8F5]"
                    >
                      Archiver
                    </button>
                  )}
                </div>

                <button
                  onClick={() => onConvertToStudent(inq)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] rounded-xl shadow-sm transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#DFC79D]" />
                  <span>Convertir en élève</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-[#D8D1C7] space-y-3">
          <MessageSquare className="w-8 h-8 text-[#8A8275] mx-auto" />
          <h3 className="font-serif-display text-lg text-[#1E1B18]">
            Aucune demande de contact reçue
          </h3>
          <p className="text-xs text-[#7A7369]">
            Les messages soumis depuis la page de contact apparaîtront ici.
          </p>
        </div>
      )}

    </div>
  );
};
