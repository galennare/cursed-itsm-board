import React from "react";
import defaultImage from "../default-profile.png";

export function ProfilePhoto(): JSX.Element {
    return <img src={defaultImage} alt="Default PFP" />;
}

export default ProfilePhoto;
