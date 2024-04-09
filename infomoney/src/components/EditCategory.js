import React from "react";

import { BiX } from "react-icons/bi";

class EditCategory extends React.Component {
    render() {
        return (<div className="app-modal edit-category modal-fullscreen d-none">
            <div>
                <header className="d-flex justify-content-between mb-4">
                    <h5>Edit Category</h5>
                    <BiX className="bix" onClick={() => {
                        let categoryName = document.querySelector(".edit-category main input");
                        categoryName.value = "";
                        categoryName.placeholder = "Category Name";
                        categoryName.classList.remove("red-placeholder");
                        document.querySelector(".edit-category").classList.add("d-none");
                    }}/>
                </header>
                <main className="d-flex flex-column justify-content-center">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Category Name" maxLength="32"/>
                    </div>
                </main>
                <footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => {
                        let categoryName = document.querySelector(".edit-category main input");

                        if (categoryName.value !== "") {
                            
                            this.props.editCategory(categoryName.value);

                            categoryName.placeholder = "Category Name";
                            categoryName.classList.remove("red-placeholder");
                            document.querySelector(".edit-category").classList.add("d-none");
                        }
                        else {
                            categoryName.placeholder = "Enter a Category name, please";
                            categoryName.classList.add("red-placeholder");
                        }

                        categoryName.value = "";
                    
                    }}>Edit</button>
                </footer>
            </div>
        </div>)
    }
}

export default EditCategory;