import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "./DeleteAccount.css";

export default function DeleteAccount() {
  const { currentUser } = useAuth();

  async function handleAccountDelete() {
    try {
      let confirmation = prompt(
        "This will permanently delete your data. Enter your email to confirm."
      );
      if (confirmation === currentUser.email) {
        await currentUser.delete();
      } else if (confirmation === null) {
        return
      } else if (confirmation === '') {
        toast.warn('You must enter your email')
      } else {
        toast.warn("Please enter your email correctly");        
      }
    } catch (e) {
      console.error(e.message);
      toast.error("Could not delete account");
    }
  }

  return (
    <div className="delete-account">
      <button className="delete-account__delete" onClick={handleAccountDelete}>
        delete account
      </button>
    </div>
  );
}
