import { useState } from "react";
import AddRoomForm from "../../../components/form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/Utility";


const Addroom = () => {
    const [imagePreview,setImagePreview] = useState();
    const [imagetext,setImageText] = useState("Upload Image");
    const { user } = useAuth();
    const [dates, setDates] = useState(
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    );

    const handleDates = range => {
        console.log(range);
        setDates(range.selection)
    }

    console.log(imagetext);
    console.log(imagetext.split("."));
    console.log(imagetext.split(".")[0].slice(0,10));
    console.log(imagetext.split(".")[0].slice(0,10)+"..."+imagetext.split(".")[1]);
    

    const handleSubmit = async e => {
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
            email: user?.email
        }

        try {
            const image_URL = await imageUpload(image);
            console.log(image_URL);
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
                image:image_URL,
            }
            console.log(roomData);
            
        } catch (error) {
            console.log(error);
        }

    }

    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image));
        setImageText(image.name)
    }

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
            ></AddRoomForm>
        </div>
    );
};

export default Addroom;