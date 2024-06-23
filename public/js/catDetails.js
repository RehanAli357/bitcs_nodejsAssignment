let originalCatDetails = {};

const getId = () => {
  const pathname = window.location.pathname;
  const pathParts = pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  return id;
};

const getCatDetail = async () => {
  let id = getId();
  const res = await fetch(`http://localhost:5000/cats/${id}`);
  const data = await res.json();

  originalCatDetails = {
    name: data.data[0].name,
    age: data.data[0].age,
    breed: data.data[0].breed,
  };

  const catName = document.querySelector("#cat-name");
  if (catName) {
    catName.textContent = `Cat: ${data.data[0].name}`;
  } else {
    console.error("#cat-name element not found");
  }

  const age = document.querySelector("#age");
  if (age) {
    age.textContent = `Age: ${data.data[0].age}`;
  } else {
    console.error("#age element not found");
  }

  const breed = document.querySelector("#breed");

  if (breed) {
    breed.textContent = `Breed: ${data.data[0].breed}`;
  } else {
    console.error("#breed element not found");
  }
};

getCatDetail();

const deleteCat = async () => {
  try {
    const id = getId();
    const res = await fetch(`http://localhost:5000/cat/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token":"xVjmpt22rwToaenVm",
      },
    });
    if (res.ok) {
      alert("Cat deleted successfully!");
      window.location.href = "http://localhost:5000/";
    } else {
      alert("Failed to delete cat.");
    }
  } catch (error) {
    console.error("Error deleting cat:", error);
  }
};

const editCat = () => {
  const catName = document.querySelector("#cat-name");
  const age = document.querySelector("#age");
  const breed = document.querySelector("#breed");
  const deleteBtn = document.querySelector("#delete-btn");
  const editBtn = document.querySelector("#edit-btn");

  if (editBtn) {
    editBtn.style.display = "none";
  } else {
    console.error("#edit-btn element not found");
  }
  if (deleteBtn) {
    deleteBtn.style.display = "none";
  } else {
    console.error("#delete-btn element not found");
  }
  const cancelBtn = document.querySelector("#cancel-btn");
  if (cancelBtn) {
    cancelBtn.style.display = "inline";
  } else {
    console.error("#cancel-btn element not found");
  }
  const catNameInput = document.createElement("input");
  catNameInput.type = "text";
  catNameInput.value = catName.textContent.replace("Cat: ", "");
  catName.innerHTML = "";
  catName.appendChild(catNameInput);

  const ageInput = document.createElement("input");
  ageInput.type = "number";
  ageInput.value = age.textContent.replace("Age: ", "");
  age.innerHTML = "";
  age.appendChild(ageInput);

  const breedInput = document.createElement("input");
  breedInput.type = "text";
  breedInput.value = breed.textContent.replace("Breed: ", "");
  breed.innerHTML = "";
  breed.appendChild(breedInput);

  document.querySelector("#save-btn").style.display = "inline-block";
};

const cancelEdit = () => {
  const catName = document.querySelector("#cat-name");
  const age = document.querySelector("#age");
  const breed = document.querySelector("#breed");

  catName.textContent = `Cat: ${originalCatDetails.name}`;
  age.textContent = `Age: ${originalCatDetails.age}`;
  breed.textContent = `Breed: ${originalCatDetails.breed}`;

  document.querySelector("#delete-btn").style.display = "inline-block";
  document.querySelector("#edit-btn").style.display = "inline-block";
  document.querySelector("#save-btn").style.display = "none";
  document.querySelector("#cancel-btn").style.display = "none";
};

const saveCat = async () => {
  const id = getId();
  const catName = document.querySelector("#cat-name input").value;
  const age = document.querySelector("#age input").value;
  const breed = document.querySelector("#breed input").value;

  try {
    if (catName.length > 0 && age >= 0 && breed.length > 0) {
      const res = await fetch(`http://localhost:5000/cat/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "token":"xVjmpt22rwToaenVm",
        },
        body: JSON.stringify({ name: catName, age, breed }),
      });

      if (res.ok) {
        alert("Cat details updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update cat details.");
      }
    } else {
      alert("Enter proper Details");
    }
  } catch (error) {
    console.error("Error updating cat details:", error);
  }
};
