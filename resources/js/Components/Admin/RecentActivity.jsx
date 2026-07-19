// RecentActivity.jsx
export default function RecentActivity({ activities }) {
    return (
        <div className="overflow-hidden rounded-[5px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h3 className="font-semibold text-slate-800">Aktivitas Terkini</h3>
            </div>
            <div className="divide-y divide-slate-100">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-slate-50">
                        <div className={`mt-1 h-2 w-2 rounded-full ${activity.type === 'create' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                        <div>
                            <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                            <p className="mt-1 text-xs text-slate-500">
                                <span className="font-medium">{activity.user}</span> • {activity.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}