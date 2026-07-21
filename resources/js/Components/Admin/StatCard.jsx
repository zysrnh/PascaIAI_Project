export default function StatCard({ title, value, icon, trend, trendValue, href }) {
    const Wrapper = href ? 'a' : 'div';
    const wrapperProps = href ? { href } : {};

    return (
        <Wrapper
            {...wrapperProps}
            className={`rounded-[5px] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md ${href ? 'cursor-pointer hover:border-emerald-200' : ''}`}
        >
            <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                <div className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-emerald-50 text-emerald-700">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">{value}</span>
                {trend && (
                    <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {trendValue}
                    </span>
                )}
            </div>
        </Wrapper>
    );
}
