import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {

    const { cartItems } = useSelector(state => state.shopCart)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const cartItem = Array.isArray(cartItems.items)
        ? cartItems.items.find(item => item.productId === product?._id)
        : null;

    const quantityInCart = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        dispatch(fetchCartItems(user?.id))
    }, [dispatch])


    return (
        <Card className="w-full max-w-sm mx-auto">
            <div onClick={() => handleGetProductDetails(product?._id)} >
                <div className="relative">
                    <img src={product?.image}
                        alt={product?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    {
                        product?.totalStock === 0 ?
                            <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
                                Out of stock
                            </Badge> : product?.totalStock < 10 ?
                                <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
                                    {`Only ${product?.totalStock} left!`}
                                </Badge> :

                                product?.salePrice > 0 ?
                                    <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-700">
                                        Sale
                                    </Badge>
                                    : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
                        <span className="text-sm text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ""} text-lg font-semibold text-primary`}>₱{product?.price}</span>
                        {
                            product?.salePrice > 0 ?
                                <span className="text-lg font-semibold text-primary">₱{product?.salePrice}</span>
                                : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                <Button
                    disabled={product?.totalStock === 0 || quantityInCart >= product?.totalStock}
                    onClick={() => handleAddtoCart(product?._id)}
                    className="w-full">
                    {product?.totalStock === 0
                        ? "Out of stock"
                        : (Array.isArray(cartItems.items) && cartItems?.items.find(item => item.productId === product?._id)?.quantity >= product?.totalStock)
                            ? "All stock added to cart"
                            : "Add to cart"}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ShoppingProductTile;