import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ product, setCurrentEditedId, setOpenCreateProductsDialog, setFormData, handleDelete }) {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg" />

                    <div className="absolute top-2 left-2 flex gap-2">
                        {product?.salePrice > 0 && (
                            <Badge className="bg-red-600 hover:bg-red-700">
                                Sale
                            </Badge>
                        )}
                        {product?.totalStock === 0 ? (
                            <Badge className="bg-red-600 hover:bg-red-700">
                                Out of stock
                            </Badge>
                        ) : product?.totalStock < 10 ? (
                            <Badge className="bg-red-600 hover:bg-red-700">
                                {`Only ${product?.totalStock} left!`}
                            </Badge>
                        ) : null}
                    </div>
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ""} text-lg font-semibold text-primary`}>₱{product?.price}</span>
                        <span className="text-lg font-bold"> {product?.salePrice > 0 ? (
                            <span className="text-lg font-bold">₱{product?.salePrice}</span>
                        ) : null}
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button onClick={() => {
                        setOpenCreateProductsDialog(true)
                        setCurrentEditedId(product?._id)
                        setFormData(product)
                    }}>Edit</Button>
                    <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default AdminProductTile;