import PropTypes from 'prop-types'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border shadow-lg rounded-lg p-4 cursor-pointer">
      <img src={product?.productImage} alt={product?.name} className="w-full h-48 object-cover rounded-lg" />
      <h2 className="text-lg font-semibold mt-2">{product?.name}</h2>
      <p className="text-gray-600">{product?.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-green-600">${product?.price}</span>
        <span className="text-sm text-gray-500">{new Date(product?.creationDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
    product: PropTypes.object
}

export default ProductCard;
