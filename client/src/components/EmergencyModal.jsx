function EmergencyModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white p-6 rounded-2xl w-[400px] border border-slate-700">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Emergency Contacts
          </h2>

          <button
            onClick={onClose}
            className="text-red-400 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <div className="bg-slate-800 p-3 rounded-xl">
            🚑 Ambulance — 108
          </div>

          <div className="bg-slate-800 p-3 rounded-xl">
            🚓 Police — 100
          </div>

          <div className="bg-slate-800 p-3 rounded-xl">
            🚒 Fire Force — 101
          </div>

          <div className="bg-slate-800 p-3 rounded-xl">
            🌊 Disaster Management — 1077
          </div>

        </div>
      </div>
    </div>
  );
}

export default EmergencyModal;