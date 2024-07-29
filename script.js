function showCrossing() {
  const parent1 = document.getElementById("parent1").value;
  const parent2 = document.getElementById("parent2").value;

  if (parent1.length !== 2 || parent2.length !== 2) {
    alert("Please enter valid genotypes (e.g., Yy)");
    return;
  }

  const alleles1 = [parent1[0], parent1[1]];
  const alleles2 = [parent2[0], parent2[1]];

  const offspring = [
    alleles1[0] + alleles2[0],
    alleles1[0] + alleles2[1],
    alleles1[1] + alleles2[0],
    alleles1[1] + alleles2[1]
  ];

  const parentGenotypesDiv = document.getElementById("parentGenotypes");
  const crossingDiv = document.getElementById("crossing");
  const offspringDiv = document.getElementById("offspring");

  parentGenotypesDiv.innerHTML = `<div class="parent">${parent1}</div><div class="parent">${parent2}</div>`;
  crossingDiv.innerHTML = "";
  offspringDiv.innerHTML = "";

  offspring.forEach(child => {
    const childDiv = document.createElement("div");
    childDiv.className = "child";
    childDiv.innerText = child;
    offspringDiv.appendChild(childDiv);
  });

  createArrows(alleles1, alleles2);
}

function createArrows(alleles1, alleles2) {
  const crossingDiv = document.getElementById("crossing");

  alleles1.forEach((allele1, index1) => {
    alleles2.forEach((allele2, index2) => {
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.style.transform = `rotate(${45 * (index1 * 2 + index2)}deg)`;
      crossingDiv.appendChild(arrow);
    });
  });
}
