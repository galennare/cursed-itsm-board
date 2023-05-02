import React, { useState } from "react";
import defaultImage from "../default-profile.png";

interface PFP {
    searcher: string;
}

const ProfilePhoto: React.FC<PFP> = ({ searcher }) => {
    const [userPhoto, setPhoto] = useState(searcher);

    const photoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const photo = event.target.files && event.target.files[0];

        if (photo) {
            const reader = new FileReader();

            reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
                const query =
                    readerEvent.target && (readerEvent.target?.result ?? "");
                setPhoto(query as string);
            };

            reader.readAsDataURL(photo);
        }
    };

    if (!searcher) {
        return <img src={defaultImage} alt="Default PFP" />;
    } else {
        return (
            <div className="App">
                <img src={userPhoto} alt="USER_PFP" />;
                <input type="file" onChange={photoInput} accept="image/*" />
            </div>
        );
    }
};

/*
export function ProfilePhoto(): JSX.Element {
    return (
        <div className="App">
            <img src={defaultImage} alt="Default PFP" />;
            <input type="file" onChange={photoInput} accept="image/*" />
        </div>
    );
}
*/

export default ProfilePhoto;
