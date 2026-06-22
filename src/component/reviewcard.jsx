export default function ReviewCard(props) {
  const pp = props.review;

  const stars = Array.from({ length: 5 }, (_, i) => i < pp.rating);

  return (
    <div className="w-full max-w-[340px] bg-white rounded-2xl card-shadow p-6 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-1">
        {stars.map((filled, i) => (
          <span key={i} className={`text-lg ${filled ? "text-amber-400" : "text-gray-200"}`}>★</span>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-secondary text-sm leading-relaxed line-clamp-4 italic">
        "{pp.description}"
      </p>

      {/* Divider */}
      <div className="h-[1px] bg-accent/15 mt-1" />

      {/* Reviewer Info */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {pp.email?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-sm font-semibold text-dark">{pp.email}</p>
          {pp.productId && (
            <p className="text-xs text-secondary/60">{pp.productId}</p>
          )}
        </div>
      </div>
    </div>
  );
}