// StatCard.jsx
export default function StatCard({ title, value, icon, trend, trendValue }) {
    return (
        <div className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                <div className="rounded-[5px] bg-blue-50 p-2 text-blue-600">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">{value}</span>
                {trend && (
                    <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {trend === 'up' ? '↑' : '↓'} {trendValue}
                    </span>
                )}
            </div>
        </div>
    );
}