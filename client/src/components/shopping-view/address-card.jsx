import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, currentSelectedAddress  }) {

    const isSelected = currentSelectedAddress && currentSelectedAddress?._id === addressInfo?._id;

    return (
        <Card onClick = {
            setCurrentSelectedAddress 
            ? () => setCurrentSelectedAddress(addressInfo) 
            : null
            }
            className={`border ${isSelected ? 'border-green-500' : 'border-gray-300'}`}
            >
            <CardContent className="grid gap-4 p-4">
                <Label>Address: {addressInfo?.address}</Label>
                <Label>City: {addressInfo?.city}</Label>
                <Label>Pincode: {addressInfo?.pincode}</Label>
                <Label>Phone: {addressInfo?.phone}</Label>
                <Label>Notes: {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="flex justify-between p-3 gap-2">
                <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
                <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
            </CardFooter>
        </Card>
    );
}

export default AddressCard;