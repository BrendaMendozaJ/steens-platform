@echo off
echo ========================================
echo    🚀 INICIANDO STEENS MVP 🚀
echo ========================================
echo.
echo Instalando dependencias...
call npm install
echo.
echo Iniciando servidor de desarrollo...
echo.
echo 🌐 La aplicación estará disponible en:
echo    http://localhost:3000
echo.
echo ⚠️  Para detener el servidor, presiona Ctrl+C
echo.
call npm run dev
pause