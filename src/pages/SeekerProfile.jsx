import { CiCircleRemove } from "react-icons/ci";
import { useState } from "react";
import { useEffect } from "react";
import { getProfile, updateProfile } from "../services/profileService";

export const SeekerProfile = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState("");
  const [seekerDetails, setSeekerDetails] = useState({
    fName: "",
    email: "",
    phoneNo: "",
    location: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSeekerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      await updateProfile({
        fullName: seekerDetails.fName,
        email: seekerDetails.email,
        phoneNo: seekerDetails.phoneNo,
        location: seekerDetails.location,
        skills: seekerDetails.skills,
        experience: seekerDetails.experience,
        education: seekerDetails.education,
      });

      setMessage("Profile Saved Successfully");
    } catch (error) {
      console.error(error);
      setMessage("Failed to Save profile");
    } finally {
      setIsSaving(false);
    }

    console.log("Form Submitted successfully");
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setResumeError("Only PDF files are allowed");
      setResumeFile(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setResumeError("File Size must be less than 2MB");
      setResumeFile(null);
    }

    setResumeError("");
    setResumeFile(file);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        if (data) {
          setSeekerDetails({
            fName: data.fullName || "",
            email: data.email || "",
            phoneNo: data.phoneNo || "",
            location: data.location || "",
            skills: data.skills || "",
            experience: data.experience || "",
            education: data.education || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <form
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Job Seeker Profile
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your personal and professional information
          </p>
        </div>

        {/* Personal Information */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="fName"
              value={seekerDetails.fName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="email"
              value={seekerDetails.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="phoneNo"
              value={seekerDetails.phoneNo}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Location (City, Country)"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="location"
              value={seekerDetails.location}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Professional Information */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Professional Information
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Skills (e.g. React, Node, MongoDB)"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="skills"
              value={seekerDetails.skills}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Experience (e.g. 2 years)"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="experience"
              value={seekerDetails.experience}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Education (e.g. B.Tech Computer Science)"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="education"
              value={seekerDetails.education}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Resume Upload */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Resume</h2>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf"
              className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
              onChange={handleResumeChange}
            />

            {resumeError && (
              <p className="text-red-500 text-sm mt-2">{resumeError}</p>
            )}

            {resumeFile && (
              <div className="mt-3 flex items-center justify-between bg-slate-50 border rounded-lg px-4 py-2">
                <p className="text-sm text-slate-700">{resumeFile.name}</p>
                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  className="text-red-500 text-sm hover:underline"
                >
                  <CiCircleRemove />
                </button>
              </div>
            )}
          </div>
        </section>

        {message && (
          <p className="mb-4 text-sm font-medium text-green-600">{message}</p>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className={`px-6 py-2 rounded-lg font-medium transition
    ${
      isSaving
        ? "bg-slate-400 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }
  `}
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes "}
          </button>
        </div>
      </form>
    </div>
  );
};
