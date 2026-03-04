const hariList = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
const tbody = document.querySelector("#jadwalTable tbody");

// ambil data JSON
fetch("jadwal.json")
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => {
        console.error(error);
        alert("Gagal memuat jadwal.json");
    });

function renderTable(data) {
    tbody.innerHTML = "";

    Object.keys(data).forEach(jam => {
        const tr = document.createElement("tr");

        // kolom jam
        const tdJam = document.createElement("td");
        tdJam.textContent = jam;
        tr.appendChild(tdJam);

        // kolom hari
        hariList.forEach(hari => {
            const td = document.createElement("td");
            td.textContent = data[jam][hari] || "";
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}