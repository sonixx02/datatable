import React, { useState } from "react";
import "./App.css";

const DataTable = () => {
  const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    if (formData.name && formData.gender && formData.age) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
      };
      setData([...data, newItem]);
      setFormData({ name: "", gender: "", age: "" });
    }
  };

  const handleDelete = (id) => {
    const updatedList = data.filter((item) => item.id !== id);
    setData(updatedList);
  };

  const handleEditChange = (id, key, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [key]: value } : item
    );
    setData(updatedData);
  };

  const handleEditSave = () => {
    setEditId(null);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
        <button className="add" onClick={handleAddClick}>
          ADD
        </button>
      </div>
      <div className="search-table-container">
        <input
          type="text"
          placeholder="Search By Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
          autoComplete="off"
        />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td
                  contentEditable={editId === item.id}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleEditChange(item.id, "name", e.target.innerText)
                  }
                >
                  {item.name}
                </td>
                <td
                  contentEditable={editId === item.id}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleEditChange(item.id, "gender", e.target.innerText)
                  }
                >
                  {item.gender}
                </td>
                <td
                  contentEditable={editId === item.id}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleEditChange(item.id, "age", e.target.innerText)
                  }
                >
                  {item.age}
                </td>
                <td className="actions">
                  {editId === item.id ? (
                    <button onClick={handleEditSave}>Save</button>
                  ) : (
                    <button onClick={() => setEditId(item.id)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
