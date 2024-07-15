import { Badge, Container, Dropdown, FormControl, Nav, Navbar, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { CartState } from "../context_home/Context Com";
import { AiFillDelete } from "react-icons/ai";

const HeaderCom = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch
  } = CartState();

  const history = useHistory();

  const handleGoToCart = () => {
    // console.log('Navigating to /carts'); // Debugging log
    history.push('/Comcarts');
  };

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <span to="/">Mua sắm</span>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown >
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 5 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
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

export default HeaderCom;