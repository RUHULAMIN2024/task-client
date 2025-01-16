import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const UserForm = () => {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialHandle", socialHandle);

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Files uploaded successfully!");
      console.log(res);
    } catch (error) {
      console.error("Error uploading files", error);
      toast.error("File upload failed");
    }
  };

  return (
    <div>
      <div className="container bg-gray-100 p-6 mx-auto ">
        <div className="card bg-base-100 w-full shadow-xl  shrink-0">
          <form onSubmit={handleSubmit} className="card-body">
            <h2 className=" text-3xl font-semibold">User Submission Form</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Social Media Handle:</span>
              </label>
              <input
                type="text"
                placeholder="Social Media Handle"
                value={socialHandle}
                onChange={(e) => setSocialHandle(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text"> Upload Images:</span>
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                required
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
