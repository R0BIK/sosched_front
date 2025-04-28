import SignFormPanel from "./SignFormPanel/SignFormPanel.jsx";
import {SignFormData} from "../../../data.js";

export default function NewSignIn() {
    return (
        <div className="content">
            <SignFormPanel formFields={SignFormData.Main.SignIn.fields} type={"SignIn"} />
        </div>
    )
}