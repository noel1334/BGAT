setInterval(() => {
  try {
    let url = "https://bgat-server.onrender.com/get-scores";
    console.log("SENDING REQ");
    fetch(url, {})
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  } catch (error) {
    console.error("Error in try block:", error);
  }
}, 60000); // 60000 milliseconds = 1 minutes

document.addEventListener("DOMContentLoaded", function() {
  const fetchScores = (gender = null, sortOrder = "none") => {
    // let url = "http://localhost:3306/get-scores";
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

        displayScores(data);
        calculateStatistics(data);
      })
      .catch(error => console.error("Error fetching scores:", error));
  };

  const displayScores = data => {
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
  };

  const calculateStatistics = data => {
    const intervals = [
      { min: 1, max: 3, midpoint: 2, frequency: 0 },
      { min: 4, max: 6, midpoint: 5, frequency: 0 },
      { min: 7, max: 9, midpoint: 8, frequency: 0 },
      { min: 10, max: 12, midpoint: 11, frequency: 0 },
      { min: 13, max: 15, midpoint: 14, frequency: 0 },
      { min: 16, max: 18, midpoint: 17, frequency: 0 },
      { min: 19, max: 21, midpoint: 20, frequency: 0 },
      { min: 22, max: 24, midpoint: 23, frequency: 0 },
      { min: 25, max: 25, midpoint: 25, frequency: 0 }
    ];

    // Count frequencies
    data.forEach(score => {
      intervals.forEach(interval => {
        if (score.score >= interval.min && score.score <= interval.max) {
          interval.frequency++;
        }
      });
    });

    const totalFrequency = intervals.reduce(
      (sum, interval) => sum + interval.frequency,
      0
    );
    const mean =
      intervals.reduce(
        (sum, interval) => sum + interval.midpoint * interval.frequency,
        0
      ) / totalFrequency;
    const variance =
      intervals.reduce(
        (sum, interval) =>
          sum + Math.pow(interval.midpoint - mean, 2) * interval.frequency,
        0
      ) / totalFrequency;
    const standardDeviation = Math.sqrt(variance);

    displayStatistics(
      mean,
      variance,
      standardDeviation,
      intervals,
      totalFrequency
    );
  };

  const displayStatistics = (
    mean,
    variance,
    standardDeviation,
    intervals,
    totalFrequency
  ) => {
    const statsContainer = document.getElementById("statistics");
    statsContainer.innerHTML = `
      <h2>Statistics</h2>
      <table>
        <tr>
          <th>Interval</th>
          <th>Midpoint (x)</th>
          <th>Frequency (f)</th>
          <th>f * x</th>
          <th>(x - Mean)^2</th>
          <th>f * (x - Mean)^2</th>
        </tr>
        ${intervals
          .map(
            interval => `
          <tr>
            <td>${interval.min} - ${interval.max}</td>
            <td>${interval.midpoint}</td>
            <td>${interval.frequency}</td>
            <td>${(interval.midpoint * interval.frequency).toFixed(2)}</td>
            <td>${Math.pow(interval.midpoint - mean, 2).toFixed(2)}</td>
            <td>${(interval.frequency *
              Math.pow(interval.midpoint - mean, 2)).toFixed(2)}</td>
          </tr>
        `
          )
          .join("")}
        <tr>
          <td colspan="2">Total</td>
          <td>${totalFrequency}</td>
          <td>${(mean * totalFrequency).toFixed(2)}</td>
          <td></td>
          <td>${(variance * totalFrequency).toFixed(2)}</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>Statistic</th>
          <th>Formula</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Mean</td>
          <td>&Sigma;(f * x) / &Sigma;f</td>
          <td>${mean.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Variance</td>
          <td>&Sigma;(f * (x - Mean)^2) / &Sigma;f</td>
          <td>${variance.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Standard Deviation</td>
          <td>&radic;Variance</td>
          <td>${standardDeviation.toFixed(2)}</td>
        </tr>
      </table>
    `;
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
    const printContents = document.querySelector(".score-container").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload(); // To reload the original page content
  });
});
