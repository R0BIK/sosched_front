import SignFormPanel from "./SignFormPanel/SignFormPanel.jsx";
import {SignFormData} from "../../../data.js";

export default function NewSignUp() {
    return (
        <div className="content">
            <SignFormPanel formFields={SignFormData.Main.SignUp.fields} type={"SignUp"} />
        </div>
    )
}