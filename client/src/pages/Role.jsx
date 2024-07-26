import { useState } from "react";

function Role() {
    const [profileName, setProfileName] = useState("");
    const [profilePin, setProfilePin] = useState("");

    const handleProfileSignUp = (e) => {
        e.preventDefault();
        console.log(`Profile Name: ${profileName}, Profile Pin: ${profilePin}`);

        // resets the fields after submission
        setProfileName("");
        setProfilePin("");
    };

    return (
        <div className="ProfileSignUpForm">
            <h2>Profile Sign Up Form</h2>
            <form onSubmit={handleProfileSignUp}>
                <div className="form-group row">
                    <label htmlFor="profile_name" className="col-sm-4 col-form-label">
                        Profile Name:
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="profile_name"
                            placeholder="Enter Profile Name"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="profile_pin" className="col-sm-4 col-form-label">
                        Profile Pin:
                    </label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            className="form-control"
                            id="profile_pin"
                            placeholder="Enter Profile Pin"
                            value={profilePin}
                            onChange={(e) => setProfilePin(e.target.value)}
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Role;