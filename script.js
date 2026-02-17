const sheetURL = "PASTE_YOUR_CSV_LINK_HERE";

async function loadScores() {
  const response = await fetch(sheetURL);
  const data = await response.text();

  const rows = data.trim().split("\n").slice(1);

  let players = rows.map(row => {
    const [player, score] = row.split(",");
    return {
      player: player,
      score: parseInt(score)
    };
  });

  // Sort by highest score
  players.sort((a, b) => b.score - a.score);

  const tbody = document.querySelector("#scoreboard tbody");
  tbody.innerHTML = "";

  players.forEach((p, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.player}</td>
      <td>${p.score}</td>
    `;

    tbody.appendChild(tr);
  });
}

loadScores();

// Auto refresh every 15 seconds

// setInterval(loadScores, 15000);
