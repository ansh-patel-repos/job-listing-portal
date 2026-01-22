import { useEffect } from "react";
import { useState } from "react";
import { getProfile, updateProfile } from "../services/profileService";

export const EmployerProfile = () => {

    const [employerDetails, setEmployerDetails] = useState({
        companyName: "",
        industry: "",
        size: 0,
        email: "",
        phoneNo: "",
        website: "",
        desc: "",
    })
    const [companyLogo, setCompanyLogo] = useState(null);
    const [logoError, setLogoError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setEmployerDetails((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setLogoError("Only PNG or JPG images are allowed");
      setCompanyLogo(null);
      return;
    }

    // Validate file size (1MB max)
    if (file.size > 1 * 1024 * 1024) {
      setLogoError("Logo size must be under 1MB");
      setCompanyLogo(null);
      return;
    }

    // Valid logo
    setLogoError("");
    setCompanyLogo(file);
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      
      setIsSaving(true);
      setMessage("");

      try {
        await updateProfile({
          companyName: employerDetails.companyName,
          industry: employerDetails.industry,
          size: employerDetails.size,
          website: employerDetails.website,
          description: employerDetails.desc,
          // logoUrl: employerDetails,
          companyEmail: employerDetails.email,
          phoneNo: employerDetails.phoneNo,
        });

        setMessage("Profile Saved Successfully");
      } catch (error) {
        console.error(error);
        setMessage("Failed to Save Profile");
      }
      finally {
        setIsSaving(false);
      }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        if(data) {
          setEmployerDetails({
            companyName: data.companyName,
            industry: data.industry,
            size: data.size,
            email: data.companyEmail,
            phoneNo: data.phoneNo,
            website: data.website,
            desc: data.description,
          })
        }
      } catch (error) {
        console.error("Error loading profile:", error.message);
      }
      finally {
        setIsLoading(false)
      }
    }
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
      <form className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8" onSubmit={handleSubmit}>

        {/* Header */}
        <div className="mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Employer Profile
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your company information
          </p>
        </div>

        {/* Company Logo */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Company Logo
          </h2>

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleLogoChange}
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          />

          {/* Error */}
          {logoError && (
            <p className="text-red-500 text-sm mt-2">{logoError}</p>
          )}

          {/* Selected Logo */}
          {companyLogo && (
            <div className="mt-3 flex items-center justify-between bg-slate-50 border rounded-lg px-4 py-2">
              <p className="text-sm text-slate-700">
                🖼️ {companyLogo.name}
              </p>
              <button
                type="button"
                onClick={() => setCompanyLogo(null)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </section>

        {/* Company Information */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              value={employerDetails.companyName}
              onChange={handleInputChange}
              name="companyName"
              autoComplete="off"
              required
            />
            <input
              type="text"
              placeholder="Industry (e.g. IT, Finance)"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="industry"
              value={employerDetails.industry}
              onChange={handleInputChange}
              autoComplete="off"
              required
            />
            <input
              type="text"
              placeholder="Company Size (e.g. 50-100)"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="size"
              value={employerDetails.size}
              onChange={handleInputChange}
              autoComplete="off"
              required
            />
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="email"
              value={employerDetails.email}
              onChange={handleInputChange}
              autoComplete="off"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              name="phoneNo"
              value={employerDetails.phoneNo}
              onChange={handleInputChange}
              autoComplete="off"
              required
            />
            <input
              type="text"
              placeholder="Website (https://example.com)"
              className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 md:col-span-2"
              name="website"
              value={employerDetails.website}
              onChange={handleInputChange}
              autoComplete="off"
              required
            />
          </div>
        </section>

        {/* Company Description */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Company Description
          </h2>

          <textarea
            rows="4"
            placeholder="Tell us about your company..."
            className="w-full border border-slate-300 rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-500"
            name="desc"
            value={employerDetails.desc}
            onChange={handleInputChange}
            autoComplete="off"
            required
          ></textarea>
        </section>

        {message && (
          <p className="mb-4 text-sm font-medium text-green-600">{message}</p>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className={`px-6 py-2 rounded-lg font-medium transition
              ${isSaving
        ? "bg-slate-400 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700"}`}
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};