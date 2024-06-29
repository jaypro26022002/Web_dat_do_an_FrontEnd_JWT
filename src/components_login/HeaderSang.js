import { Badge, Container, Dropdown, FormControl, Nav, Navbar, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { CartState } from "../context_home/Context Sang";
import { AiFillDelete } from "react-icons/ai";
import './style.scss';

const HeaderSang = () => {
  const {
    state: { cart },
    dispatch
  } = CartState();

  const history = useHistory();

  const handleGoToCart = () => {
    console.log('Navigating to /carts'); // Debugging log
    history.push('/Sangcarts');
  };

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <span>Mua sắm</span>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
          />
        </Navbar.Text>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 5 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map(prod => (
                    <span className="cartitem" key={prod.id_product}>
                      <img
                        src={`http://localhost:8081/image/` + prod.thumbnail}
                        className="cartItemImg"
                        alt={prod.nameProduct}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.nameProduct}</span>
                        <span>{prod.price}₫</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Button
                    onClick={handleGoToCart}
                    style={{ width: "95%", margin: "0 10px" }}
                  >
                    Đi đến giỏ hàng
                  </Button>
                </>
              ) : (
                <span style={{ padding: 10 }}>Giỏ hàng trống!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HeaderSang;