// RecentActivity.jsx
import { Link } from '@inertiajs/react';

export default function RecentActivity({ activities }) {
    return (
        <div className="overflow-hidden rounded-[5px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Aktivitas Terkini</h3>
            </div>
            <div className="divide-y divide-slate-100">
                {activities && activities.length > 0 ? activities.map((activity, index) => {
                    const Content = (
                        <div className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-slate-50 group">
                            <div className={`mt-1 h-2 w-2 rounded-full ${activity.type === 'create' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-800 group-hover:text-emerald-700 transition-colors">{activity.title}</p>
                                <p className="mt-1 text-xs text-slate-500">
                                    <span className="font-medium">{activity.user}</span> • {activity.time}
                                </p>
                            </div>
                            {activity.url && (
                                <div className="text-slate-400 group-hover:text-emerald-600">
                                    <i className="fa-solid fa-chevron-right text-xs"></i>
                                </div>
                            )}
                        </div>
                    );

                    return activity.url ? (
                        <Link key={index} href={activity.url} className="block">
                            {Content}
                        </Link>
                    ) : (
                        <div key={index}>
                            {Content}
                        </div>
                    );
                }) : (
                    <div className="px-6 py-8 text-center text-sm text-slate-500">
                        Belum ada aktivitas.
                    </div>
                )}
            </div>
        </div>
    );
}