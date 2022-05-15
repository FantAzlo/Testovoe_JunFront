Приложение выполнено в одном файле, что бы упростить передачу данных между компонентами.

Для запуска сервера следует выполнить комманду:
```shell
npm run server
```
или команду:
```shell
json-server --watch db.json --port 3001
```

Для запуска приложения следует выполнить комманду: 
```shell
npm start 
```

Для сборки и запуска приложения для IE11 следует выполнить следующие команды:
1. Сборка:
```shell
npm run build
```
2. Запуск:
```shell
serve -s build
```

Был использован Google JavaScript Style Guide: https://google.github.io/styleguide/javascriptguide.xml

В правилах прописал:

``
"rules": {
"require-jsdoc" : 0
}
``
