import { useState } from "react";
import AddRoomForm from "../../../components/form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/Utility";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Ensure you import useNavigate

const Addroom = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState();
    const [imagetext, setImageText] = useState("Upload Image");
    const { user } = useAuth();
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: null,
        key: 'selection',
    });

    const handleDates = (range) => {
        setDates(range.selection);
    };

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (roomData) => {
            await axiosSecure.post("/rooms", roomData);
        },
        onSuccess: () => {
            toast.success("Saved successfully");
            navigate("/dashboard/my-listings"); // Navigate after success
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = dates.endDate;
        const from = dates.startDate;
        const price = form.price.value;
        const total_guest = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const host = {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
        };

        try {
            const image_URL = await imageUpload(image);
            const roomData = {
                location,
                category,
                title,
                to,
                from,
                price,
                total_guest,
                bedrooms,
                bathrooms,
                description,
                image: image_URL,
                host,
            };

            await mutateAsync(roomData); // Execute mutation here
        } catch (error) {
            console.log(error);
            toast.error("Failed to save the room");
        }
    };

    const handleImage = (image) => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name);
    };

    return (
        <div>
            <p>This is add room</p>

            {/* form */}
            <AddRoomForm
                dates={dates}
                handleDates={handleDates}
                handleSubmit={handleSubmit}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
                handleImage={handleImage}
                imagetext={imagetext}
                isLoading={isLoading} // Pass loading state
            />
        </div>
    );
};

export default Addroom;
