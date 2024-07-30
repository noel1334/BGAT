
setInterval(() => {
  try {
    let url = "https://bgat-server.onrender.com/get-scores";
    console.log('SENDING REQ')
    fetch(url, {})
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  } catch (error) {
    console.error('Error in try block:', error);
  }
}, 60000); // 60000 milliseconds = 1 minutes


document.addEventListener("DOMContentLoaded", function () {
  const fetchScores = (gender = null, sortOrder = "none") => {
    //let url = "http://localhost:3306/get-scores";
    let url = "https://bgat-server.onrender.com/get-scores";
    if (gender) {
      url += `?gender=${gender}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (sortOrder === "highest") {
          data.sort((a, b) => b.score - a.score);
        } else if (sortOrder === "lowest") {
          data.sort((a, b) => a.score - b.score);
        }

        const scoresContainer = document.getElementById("scores");
        scoresContainer.innerHTML = ""; // Clear previous scores
        if (data.length > 0) {
          const table = document.createElement("table");
          const headerRow = document.createElement("tr");
          const headerNumber = document.createElement("th");
          headerNumber.textContent = "S/N";
          const headerGender = document.createElement("th");
          headerGender.textContent = "Gender";
          const headerScore = document.createElement("th");
          headerScore.textContent = "Score";
          headerRow.appendChild(headerNumber);
          headerRow.appendChild(headerGender);
          headerRow.appendChild(headerScore);
          table.appendChild(headerRow);

          data.forEach((score, index) => {
            const row = document.createElement("tr");
            const cellNumber = document.createElement("td");
            cellNumber.textContent = index + 1;
            const cellGender = document.createElement("td");
            cellGender.textContent = score.gender;
            const cellScore = document.createElement("td");
            cellScore.textContent = score.score;
            row.appendChild(cellNumber);
            row.appendChild(cellGender);
            row.appendChild(cellScore);
            table.appendChild(row);
          });

          scoresContainer.appendChild(table);
        } else {
          scoresContainer.textContent = "No scores found.";
        }
      })
      .catch(error => console.error("Error fetching scores:", error));
  };

  document.querySelectorAll("input[name='gender-filter']").forEach(radio => {
    radio.addEventListener("change", () => {
      const selectedGender = document.querySelector(
        "input[name='gender-filter']:checked"
      ).value;
      const sortOrder = document.getElementById("sort-scores").value;
      fetchScores(selectedGender, sortOrder);
    });
  });

  document.getElementById("sort-scores").addEventListener("change", () => {
    const selectedGender = document.querySelector(
      "input[name='gender-filter']:checked"
    ).value;
    const sortOrder = document.getElementById("sort-scores").value;
    fetchScores(selectedGender, sortOrder);
  });

  // Initial fetch without sorting
  fetchScores();

  // Add print functionality
  document.getElementById("print-button").addEventListener("click", () => {
    const printContents = document.querySelector(".score").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload(); // To reload the original page content
  });
});
