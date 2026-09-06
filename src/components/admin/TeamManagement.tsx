import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_USERS } from '../../data/mockData';
import { User, UserRole } from '../../types';
import { 
  Users, 
  Shield, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  UserCheck, 
  Lock, 
  Key, 
  Smartphone, 
  X,
  Sparkles
} from 'lucide-react';

export const TeamManagement: React.FC = () => {
  const { currentUser, switchUserRole, t, language } = useApp();

  const [usersList, setUsersList] = useState<User[]>(Object.values(DEMO_USERS));
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // New user state
  const [newName, setNewName] = useState('');
  const [newAmharicName, setNewAmharicName] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('COLLECTION_WORKER');
  const [newZone, setNewZone] = useState('Bomb Tera Banana Shed');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const initials = newName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const newUser: User = {
      id: `usr_${Date.now().toString().slice(-4)}`,
      name: newName.trim(),
      amharicName: newAmharicName.trim() || newName.trim(),
      role: newRole,
      avatarInitials: initials,
      assignedZone: newZone,
      phone: '+251 91 234 5678',
      activeStatus: true,
      lastActive: 'Just now'
    };

    setUsersList([...usersList, newUser]);
    setShowAddUserModal(false);
    setNewName('');
    setNewAmharicName('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#DDD8CD]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1A3D2F]">
              {t('User Administration & Role Permissions', 'የተጠቃሚዎች አስተዳደርና የፈቃድ ቁጥጥር')}
            </h1>
            <span className="px-2 py-0.5 rounded bg-stone-900 text-white text-[10px] font-bold">
              Administrator Only
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {t(
              'Enforce strict role-based access control across collection workers, compost operators, and managers.',
              'የስራ ሚናዎች ቁጥጥር፣ አዳዲስ ሰራተኞች ምዝገባ እና የስራ ዞን ምደባ ማዕከል።'
            )}
          </p>
        </div>

        <button
          onClick={() => setShowAddUserModal(true)}
          className="px-3.5 py-2 rounded-xl bg-[#1A3D2F] text-white text-xs font-bold shadow-xs hover:bg-[#12281F] flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 text-[#D4A017]" />
          <span>{t('Add Operational User', 'አዲስ ሰራተኛ ጨምር')}</span>
        </button>
      </div>

      {/* Role Definitions & Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">
            Collection Worker (Mobile PWA)
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Optimized for gloves and glare in market stalls. Fast QR scanning, scale readings, and offline-first local queue. Restricted from financial reports.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-xs font-bold text-[#1A3D2F] uppercase tracking-wider">
            Compost Facility Operator
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Intake sorting, pile building, temperature probe checks, moisture logs, turning events, and laboratory compliance certification.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#DDD8CD] shadow-2xs">
          <div className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">
            Sales & Operations Leadership
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Inventory allocation, farmer union accounts, Telebirr invoicing, methane mitigation validation, and municipal compliance audits.
          </p>
        </div>
      </div>

      {/* Users Directory */}
      <div className="bg-white rounded-2xl border border-[#DDD8CD] p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#DDD8CD]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            {t('Authenticated System Personnel', 'የተፈቀደላቸው የሲስተም ሰራተኞች')}
          </h3>
          <span className="text-xs text-stone-400">{usersList.length} accounts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {usersList.map(u => {
            const isSelf = currentUser.id === u.id;
            return (
              <div key={u.id} className="p-4 rounded-xl border border-[#DDD8CD] bg-[#F8F6F0] flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1A3D2F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {u.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">
                        {language === 'am' ? u.amharicName : u.name}
                      </h4>
                      {isSelf && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {t('Current Session', 'አሁን ላይ')}
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-stone-600 mt-0.5">
                      {u.role.replace('_', ' ')}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C85A32]" />
                      <span>{u.assignedZone}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={() => switchUserRole(u.role)}
                    className="px-2.5 py-1 rounded-lg border border-[#DDD8CD] bg-white text-[11px] font-bold text-[#1A3D2F] hover:bg-[#1A3D2F] hover:text-white transition shadow-2xs"
                  >
                    {t('Switch Persona', 'በዚህ ሚና ተመልከት')}
                  </button>
                  <div className="text-[10px] text-stone-400 mt-1">
                    {u.lastActive}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ADD USER MODAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl border border-[#DDD8CD]">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CD]">
              <h3 className="text-sm font-bold text-[#1A3D2F]">
                {t('Add Operational User Account', 'አዲስ የሰራተኛ አካውንት ፍጠር')}
              </h3>
              <button onClick={() => setShowAddUserModal(false)} className="p-1 rounded hover:bg-stone-100">
                <X className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Full Name (English):', 'ሙሉ ስም (በእንግሊዝኛ)፡')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Martha Haile"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Full Name (Amharic):', 'ሙሉ ስም (በአማርኛ)፡')}
                </label>
                <input
                  type="text"
                  placeholder="ምሳሌ፡ ማርታ ኃይሌ"
                  value={newAmharicName}
                  onChange={(e) => setNewAmharicName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Assigned Operational Role:', 'የስራ ሚና፡')}
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD] font-semibold"
                >
                  <option value="COLLECTION_WORKER">Collection Worker (Mobile PWA)</option>
                  <option value="COMPOST_OPERATOR">Compost Facility Operator</option>
                  <option value="SALES_OFFICER">Sales & Distribution Officer</option>
                  <option value="OPERATIONS_MANAGER">Operations Manager</option>
                  <option value="ADMINISTRATOR">Administrator / Authority</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {t('Assigned Market Zone / Yard:', 'የተመደበበት ዞን / ስፍራ፡')}
                </label>
                <input
                  type="text"
                  value={newZone}
                  onChange={(e) => setNewZone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#DDD8CD]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-2 rounded-lg border border-[#DDD8CD] font-semibold text-stone-600"
                >
                  {t('Cancel', 'ሰርዝ')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#1A3D2F] text-white font-bold hover:bg-[#12281F]"
                >
                  {t('Create Account', 'አካውንት ፍጠር')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
