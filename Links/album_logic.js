const csvUrl = 'album_buttons.csv'; 
const idMapUrl = 'albums_ID.csv';

async function loadAlbumButtons() {
    try {
         // 1. Определяем сокращенный ID из имени HTML-файла
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        const shortID = fileName.replace('.html', '').trim();
        
         // 1.1 --- Поиск полного ID ---
        const idResp = await fetch(idMapUrl + '?t=' + Date.now());
        const idText = (await idResp.text()).replace(/^\uFEFF/, "");
        const idRows = idText.replace(/\r/g, "").split('\n');
        
        let currentID = shortID; // По умолчанию, если не найдем, используем короткий

        for (const row of idRows) {
            const cols = row.split(';');
            // Если в первом столбце наш короткий ID (#000), берем значение из второго (A000-...)
            if (cols[0] && cols[0].trim() === shortID) {
                currentID = cols[1] ? cols[1].trim() : shortID;
                break; 
            }
        }
        
        // 2. Прописываем найденный ПОЛНЫЙ ID в заголовок страницы
        const albumIdElement = document.getElementById('albumId');
        if (albumIdElement) albumIdElement.innerText = currentID;

        // 3. Загружаем общий CSV файл
        const resp = await fetch(csvUrl + '?t=' + Date.now());
        const text = await resp.text();
        
        const rows = text.replace(/\r/g, "").split('\n').filter(row => row.trim() !== '');
        const container = document.getElementById('buttonsContainer');
        container.innerHTML = '';

        rows.forEach((row, index) => {
            if (index === 0) return; // Пропуск заголовка
            const cols = row.split(';');
            
            // 4. Ищем строки, где ID в CSV совпадает с ID файла
            if (cols[0] && cols[0].trim() === currentID) {
                const iconData  = cols[1] ? cols[1].trim() : "";
                const name      = cols[2] ? cols[2].trim() : "Без названия";
                const excelLink = cols[3] ? cols[3].trim() : "";
                const folderLink = cols[4] ? cols[4].trim() : "";

                // Обработка иконки (флаг или эмодзи)
                let iconHtml = '';
                if (iconData !== "") {
                    if (iconData.startsWith('http')) {
                        iconHtml = `<img src="${iconData}" width="24" style="margin-right:12px; border: 1px solid #eee; vertical-align: middle;">`;
                    } else {
                        iconHtml = `<span class="emoji" style="margin-right:8px;">${iconData}</span>`;
                    }
                }

                // НОВАЯ ЛОГИКА: Если обе ссылки пусты — создаем заголовок h2
                if (excelLink === "" && folderLink === "") {
                    const header = document.createElement('h2');
                    // Стили для отступов, чтобы заголовок смотрелся красиво между кнопками
                    header.style.marginTop = "25px";
                    header.style.marginBottom = "10px";
                    header.innerHTML = `${iconHtml}${name}`;
                    container.appendChild(header);
                    return; // Прекращаем выполнение для этой строки и переходим к следующей
                }

                // Если ссылки есть (хотя бы одна из них, по твоей старой логике)
                if (excelLink !== "") {
                    const rowDiv = document.createElement('div');
                    rowDiv.className = 'btn-row';
                    rowDiv.innerHTML = `
                        <a href="${excelLink}" class="btn">
                            ${iconHtml}<span>${name}</span>
                        </a>
                        <a href="${folderLink}" class="btn-folder" title="Открыть папку">📂</a>
                    `;
                    container.appendChild(rowDiv);
                }
            }
        });
    } catch (err) {
        console.error("Ошибка загрузки кнопок:", err);
    }
}

loadAlbumButtons();