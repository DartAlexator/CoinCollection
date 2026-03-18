Как добавить новый альбом (Для примера с именем A101-01-GD-BK):
1) Создать файл CoinCollection\Info\Hardcoded_album_links\A101-01-GD-BK.html (взяв за основу существующий)
   Заменить в нём строки с <h1> и <h2> на новые
        <h1>Альбом<br><small id="albumId">A001-01-GD-BK</small></h1>
        <h2><span class="emoji">🇪🇺</span> Юбилейные 2 евро<br><small>(часть 1)</small></h2>

2) В CoinCollection\Info\Additional_information.xlsx в листе albums_ID добавить новую заполненную строку с альбомом
   Выгрузить лист albums_ID, заменив CoinCollection\Info\Hardcoded_album_links\albums_ID.csv (Тип файла: CSV UTF-8 (разделитель - запятая))
   
3) В CoinCollection\Info\Additional_information.xlsx в листе album_buttons добавить новую заполненную строку
   Выгрузить лист album_buttons, заменив CoinCollection\Info\Hardcoded_album_links\album_buttons.csv (Тип файла: CSV UTF-8 (разделитель - запятая))

4) Распечатать A101-01-GD-BK QR-кодом с прописанным ранее для A101-01-GD-BK полем "Album hardcoded link" листа "albums_ID" ексельки "CoinCollection\Info\Additional_information.xlsx"

5) Запушить коммит. Страницы обновятся секунд через 40