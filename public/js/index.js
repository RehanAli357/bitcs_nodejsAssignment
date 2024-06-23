const getAllCats = async (page = 1) => {
  try {
    const res = await fetch(`http://localhost:5000/cats/?page=${page}&limit=5`);
    const data = await res.json();

    const p = document.querySelector("#total-count");
    if (p) {
      p.textContent = `Total Data is ${data.data.totalCount}`;
    } else {
      console.error("#total-count element not found");
    }

    const catsData = document.querySelector("#cats-data");
    if (catsData) {
      catsData.innerHTML = "";
      const allData = data.data.data;
      allData.forEach((doc) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const a = document.createElement("a");
        a.href = `/cat/${doc.id}`;
        a.textContent = doc.name;
        td.appendChild(a);
        tr.appendChild(td);
        catsData.appendChild(tr);
      });
    } else {
      console.error("#cats-data element not found");
    }

    const btnDiv = document.querySelector("#btn-div");
    if (btnDiv) {
      btnDiv.innerHTML = "";
      const totalPages = Math.ceil(data.data.totalCount / 5);
      for (let index = 0; index < totalPages; index++) {
        const button = document.createElement("button");
        button.textContent = index + 1;
        button.addEventListener("click", () => getAllCats(index + 1));
        button.classList.add("page-btn");
        btnDiv.appendChild(button);
      }
    } else {
      console.error("#btn-div element not found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("cat-modal");
  const btn = document.getElementById("add-cat-btn");
  const span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  document.getElementById("cat-form").onsubmit = async function (event) {
    event.preventDefault();
    const name = document.getElementById("cat-name").value;
    const age = document.getElementById("cat-age").value;
    const breed = document.getElementById("cat-breed").value;

    try {
      const res = await fetch("http://localhost:5000/add-cat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: "xVjmpt22rwToaenVm",
        },
        body: JSON.stringify({ name, age, breed }),
      });

      if (res.ok) {
        alert("Cat added successfully!");
        modal.style.display = "none";
        getAllCats();
      } else {
        alert("Failed to add cat.");
      }
    } catch (error) {
      console.error("Error adding cat:", error);
      alert("Error adding cat.");
    }
  };

  document.getElementById("cat-search").onsubmit = async function (event) {
    event.preventDefault();
    const fromAge = document.getElementById("from-age").value;
    const toAge = document.getElementById("to-age").value;

    try {
      if (parseInt(fromAge) <= parseInt(toAge)) {
        const res = await fetch(
          `http://localhost:5000/cat/search?rangeFrom=${fromAge}&rangeTo=${toAge}`
        );
        const data = await res.json();

        const catsData = document.querySelector("#cats-data");
        if (catsData) {
          catsData.innerHTML = "";
          data.forEach((cat) => {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            const a = document.createElement("a");
            a.href = `/cat/${cat.id}`;
            a.textContent = cat.name;
            td.appendChild(a);
            tr.appendChild(td);
            catsData.appendChild(tr);
          });

          // Hide pagination buttons
          const pageButtons = document.querySelectorAll(".page-btn");
          pageButtons.forEach((button) => {
            button.style.display = "none";
          });
        } else {
          console.error("#cats-data element not found");
        }
      } else {
        alert("From Age must be smaller than To age");
      }
    } catch (error) {
      console.error("Error searching cats:", error);
      alert("Error searching cats.");
    }
  };
});

getAllCats();
