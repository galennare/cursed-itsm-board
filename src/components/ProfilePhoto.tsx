import React, { useState } from "react";
import defaultImage from "../default-profile.png";
import "./ProfilePhoto.css";
import { Ticket } from "../Interface/TicketInterface";

interface PFPProps {
    url?: string;
}

const gravBaseURL = "https://www.gravatar.com/avatar/";
const gravURLSuffix = "?s=64&d=identicon&r=PG";

export function ProfilePhoto(props: PFPProps): JSX.Element {
    const [userPhoto, setPhoto] = useState(props.url);

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

    const emptyImageHandler = () => {
        setPhoto(defaultImage);
    };
    return (
        <div className="pfp-wrapper">
            <div className="pfp-container">
                <img
                    src={userPhoto}
                    onError={emptyImageHandler}
                    alt=""
                    className="pfp"
                />
                <input
                    type="file"
                    onChange={photoInput}
                    accept="image/*"
                    className="pfp-change"
                />
            </div>
        </div>
    );
}
