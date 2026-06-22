import { Link } from "react-router-dom"

export default function ProductCard(props) {
  const product = props.product;
  const hasDiscount = product.lastPrice < product.price;

  return (
    <Link
      to={`/productInfo/${product.productId}`}
      className="group relative w-[280px] m-5 rounded-2xl overflow-hidden bg-white card-shadow hover:-translate-y-2 transition-all duration-400 flex flex-col"
    >
      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          SALE
        </div>
      )}

      {/* Image */}
      <div className="relative h-[240px] overflow-hidden bg-gray-50">
        <img
          src={product.images[0]}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          alt={product.productName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h1 className="font-playfair text-lg font-bold text-dark group-hover:text-accent transition-colors duration-200 leading-tight">
          {product.productName}
        </h1>
        <p className="text-xs text-secondary/60 uppercase tracking-widest">{product.productId}</p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-auto pt-2 border-t border-gray-100">
          <span className="text-xl font-bold text-accent">
            LKR {product.lastPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              LKR {product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Hover CTA overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-10 overflow-hidden bg-accent-gradient transition-all duration-300 flex items-center justify-center">
        <span className="text-white text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
          View Product →
        </span>
      </div>
    </Link>
  );
}