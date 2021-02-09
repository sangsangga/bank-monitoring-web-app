import React from "react";
import { useDispatch } from "react-redux";
import { postData } from "../store/actions";

function AddData() {
  const [file, setFile] = React.useState("");
  const handleInput = (e) => {
    setFile(e.target.files[0]);
    console.log("handle input");
  };
  const dispatch = useDispatch();

  const submitFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("record", file);
    dispatch(postData(formData));
    setFile("");
    e.target.resume.value = null;
  };
  return (
    <div className="columns is-justify-content-space-between is-flex-wrap-wrap">
      <div className="column">
        <h1 className="title has-text-centered is-family-primary is-size-3">
          Add Data
        </h1>
        <form onSubmit={submitFile}>
          <div class="file is-centered is-success has-name">
            <label class="file-label">
              <input
                class="file-input"
                onChange={handleInput}
                type="file"
                name="resume"
                required
              />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">Upload File....</span>
              </span>
              <span class="file-name">{file.name}</span>
            </label>
          </div>
          <div className="has-text-centered mt-3">
            <button
              type="submit"
              className="button is-centered has-text-center is-link p-5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddData;
