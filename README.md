# b2b.polis.online

### Инструкция

# 1. Клонируй репозиторий
`git clone https://github.com/FermonMontego/b2b.polis.online.git`

# 2. Перейди в папку проекта
`cd b2b.polis.online`

# 3. Запусти docker compose
`docker compose up -d --build`

P.S Может долго собираться, backend дольше фронта собирается и будет отдавать 502, поставил heathchecker для проверки, фронт не запустится без бэка

После этого .env файл создатся, подключение к базе должно быть автоматически, ничего менять не нужно
