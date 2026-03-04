let jamList = [
    "08:00-09:00",
    "09:00-10:00"
];

const hariList = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
const tbody = document.querySelector("#jadwalTable tbody");

// render tabel
function renderTable() {
    tbody.innerHTML = "";

    jamList.forEach(jam => {
        const tr = document.createElement("tr");

        // kolom jam + delete
        const tdJam = document.createElement("td");
        tdJam.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span>${jam}</span>
                <button class="delete-btn" onclick="removeJam('${jam}')">✕</button>
            </div>
        `;
        tr.appendChild(tdJam);

        // kolom hari
        hariList.forEach(() => {
            const td = document.createElement("td");
            td.contentEditable = "true";
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

// tambah jam
function addJam() {
    const input = document.getElementById("jamInput");
    const jam = input.value.trim();

    if (!jam) {
        alert("Jam tidak boleh kosong");
        return;
    }

    if (jamList.includes(jam)) {
        alert("Jam sudah ada");
        return;
    }

    jamList.push(jam);
    input.value = "";
    renderTable();
}

// hapus jam
function removeJam(jam) {
    if (!confirm(`Hapus jam ${jam}?`)) return;
    jamList = jamList.filter(j => j !== jam);
    renderTable();
}

// export JSON
function exportJSON() {
    const data = {};

    [...tbody.rows].forEach(row => {
        const jam = row.cells[0].innerText.replace("✕", "").trim();
        data[jam] = {};

        hariList.forEach((hari, i) => {
            data[jam][hari] = row.cells[i + 1].textContent.trim();
        });
    });

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "jadwal.json";
    a.click();
}

// render awal
renderTable();