import React from 'react';
import { Gift, Check, Clock } from 'lucide-react';

export function MyEntries({ currentUser, userEntries, giveaways }) {
  const entriesWithDetails = userEntries.map(entry => {
    const giveaway = giveaways.find(g => g.id === entry.giveawayId);
    return { ...entry, giveaway };
  });

  const getDrawStatus = (drawDate) => {
    const now = new Date();
    const draw = new Date(drawDate);
    return draw > now ? 'upcoming' : 'completed';
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-2xl font-bold">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{currentUser.fullName}</h1>
            <p className="text-white/60">{currentUser.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-white/10">
          <div className="text-white/60 text-sm mb-2">Total Entries</div>
          <div className="text-4xl font-bold text-white">{userEntries.length}</div>
        </div>
        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-white/10">
          <div className="text-white/60 text-sm mb-2">KYC Status</div>
          <div className={`text-2xl font-bold ${currentUser.kycVerified ? 'text-green-400' : 'text-yellow-400'}`}>
            {currentUser.kycVerified ? 'Verified' : 'Pending'}
          </div>
        </div>
        <div className="bg-[#0a0a0a] rounded-xl p-6 border border-white/10">
          <div className="text-white/60 text-sm mb-2">Total Winnings</div>
          <div className="text-2xl font-bold text-green-400">${currentUser.totalWinnings || 0}</div>
        </div>
      </div>

      {/* My Entries */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Giveaway Entries</h2>
        {entriesWithDetails.length === 0 ? (
          <div className="bg-[#0a0a0a] rounded-2xl p-12 border border-white/10 text-center">
            <Gift size={48} className="text-white/30 mx-auto mb-4" />
            <p className="text-white/60">You haven't entered any giveaways yet</p>
            <p className="text-white/40 text-sm mt-2">Browse active giveaways to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entriesWithDetails.map((entry) => {
              const status = getDrawStatus(entry.giveaway.drawDate);
              return (
                <div
                  key={entry.id}
                  className="bg-[#0a0a0a] rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{entry.giveaway.name}</h3>
                      <p className="text-sm text-white/60">${entry.giveaway.value} Prize</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      status === 'upcoming'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {status === 'upcoming' ? (
                        <>
                          <Clock size={14} />
                          Upcoming
                        </>
                      ) : (
                        <>
                          <Check size={14} />
                          Completed
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pb-4 border-b border-white/10 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Entry Date</span>
                      <span className="font-medium">
                        {new Date(entry.entryDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Draw Date</span>
                      <span className="font-medium">
                        {new Date(entry.giveaway.drawDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Participants</span>
                      <span className="font-medium">
                        {entry.giveaway.totalParticipants.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-white/60">Odds</span>
                    <span className="text-green-400 font-medium">
                      1 in {entry.giveaway.totalParticipants}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
