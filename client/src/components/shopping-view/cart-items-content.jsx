import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, fetchCartItems, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function UserCartItemsContent({ cartItems }) {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { toast } = useToast()

    function handleUpdateQuantity(getCartItem, typeOfAction) {

        dispatch(updateCartQuantity({
            userId: user?.id, productId: getCartItem?.productId, quantity:
                typeOfAction === 'plus'?
                    getCartItem?.quantity + 1 : getCartItem?.quantity - 1
        })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: 'Cart item is updated sucessfully'
                })
            }
        })
    }

    function handleCartItemDelete(getCartItem) {
        dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId }))
            .then(data => {
                if (data?.payload?.success) {
                    toast({
                        title: 'Cart item is deleted sucessfully'
                    })
                    dispatch(fetchCartItems(user?.id))
                }
            })
    }

    console.log(cartItems, 'cartItems')

    return (
        <div className="flex items-center space-x-4">
            <img src={cartItems?.image}
                alt={cartItems?.title}
                className="w-20 h-20 rounded object-cover" />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItems?.title}</h3>
                <div className="flex items-center mt-1 gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" disabled = {cartItems?.quantity === 1} onClick={() => handleUpdateQuantity(cartItems, 'minus')}>
                        <Minus className="w-4 h-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className="font-semibold">{cartItems?.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" disabled = {cartItems?.totalStock === 1 || cartItems?.quantity === cartItems?.totalStock} onClick={() => handleUpdateQuantity(cartItems, 'plus')}>
                        <Plus className="w-4 h-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ₱{((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}
                </p>
                <Trash onClick={() => handleCartItemDelete(cartItems)} className="cursor-pointer mt-1" size={20} />
            </div>
        </div>
    );
}

export default UserCartItemsContent;