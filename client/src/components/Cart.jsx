import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Cart = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout");
  };

  // keep bootstrap markup for compatibility but render a custom drawer overlay
  const hasItems = data?.[0]?.products?.length > 0;
  const total = data?.[0]?.total ?? 0;

  return (
    <>
      {/* Backdrop + Drawer (used by our new styles) */}
      <div
        id="vibe-cart-drawer"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        {/* This element is intentionally hidden by default. If your app still uses
            bootstrap to toggle the modal via id="#exampleModal" it will show. */}
      </div>

      {/* Bootstrap-compatible modal kept, but styles are overridden by CSS in index.css */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-end">
          <div className="modal-content vb-drawer" role="document">
            <div className="modal-header" style={{ padding: 8 }}>
              <h3 className="modal-title" id="exampleModalLabel">
                Your Cart
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ background: "transparent", border: "none", color: "var(--muted)", fontSize:18 }}
              >
                ✕
              </button>
            </div>

            <div className="items">
              {hasItems ? (
                data[0].products.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))
              ) : (
                <div style={{ padding: 12 }}>
                  <p style={{ color: "var(--muted)" }}>No items in the cart.</p>
                </div>
              )}
            </div>

            <div className="drawer-footer" style={{ paddingTop: 8 }}>
              <div>
                {hasItems ? (
                  <>
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>
                      Total
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>
                      ${Number(total).toFixed(2)}
                    </div>
                  </>
                ) : null}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="vb-btn ghost"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="vb-btn"
                  onClick={handleClick}
                  disabled={!hasItems}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Cart.propTypes = {
  // accept either the legacy array shape ([cart]) or a single cart object
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        products: PropTypes.array,
        total: PropTypes.number,
      })
    ),
    PropTypes.shape({
      products: PropTypes.array,
      total: PropTypes.number,
    }),
  ]),
};

Cart.defaultProps = {
  data: [],
};

export default Cart;
