
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
  return (
    <div className="card cart-item" style={{ padding: 10 }}>
      <div style={{ display: "flex", gap: 10 }}>
        <div className="thumb">
          {item.image ? (
            <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{width:"100%",height:"100%",background:"#081420"}}/>
          )}
        </div>
        <div className="meta">
          <h5>{item.title}</h5>
          <p>${Number(item.price).toFixed(2)}</p>
          <div className="qty-row">
            <button>-</button>
            <div style={{padding:"6px 10px", borderRadius:8, background:"rgba(255,255,255,0.02)"}}> {item.quantity ?? 1} </div>
            <button>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};

export default CartItem;
