import PropTypes from 'prop-types'

const ProductCard = ({ product }) => {
  const {
    productName,
    productImage,
    description,
    price,
    category,
    ratings,
    creationDate
  } = product;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border">
      <img className="w-full h-48 object-cover" src={productImage} alt={productName} />
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">{productName}</h2>
        <p className="text-gray-700 text-base mb-4">{description}</p>
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold text-green-500">${price}</span>
          <span className="ml-2 text-gray-600 text-sm"><span className='font-medium'>Category: </span>{category}</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500">{'★'.repeat(Math.floor(ratings))}</span>
          <span className="text-gray-600 text-sm ml-2">({ratings})</span>
        </div>
        <div className="text-gray-600 text-sm">
          <p><span className='font-medium'>Created At: </span>{new Date(creationDate).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
    product: PropTypes.object
}

export default ProductCard;
