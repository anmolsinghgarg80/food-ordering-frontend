import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
  const {updateRestaurant, isLoading: isUpdateLoading} = useUpdateRestaurant();
  const {restaurant} = useGetMyRestaurant();

  const isEditing = !!restaurant;

  return (
    <div>
      <ManageRestaurantForm
        restaurant = {restaurant}
        onSave={isEditing ? updateRestaurant: createRestaurant}
        isLoading={isCreateLoading || isUpdateLoading}/>
    </div>
  )
}
 